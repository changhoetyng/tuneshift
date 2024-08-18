import { useCredentialsPersistantStore } from "@/stores/credentialsStore";
import { useUIStateStore } from "@/stores/UIStateStore";
import { PlaylistHelper } from "@/interfaces/PlaylistHelper";
import axios, { AxiosResponse } from "axios";
import { UserPlaylist, PlaylistSongs } from "@/types/playlists";

export default class SpotifyApiHelper implements PlaylistHelper {
  private spotifyApi = axios.create();

  public constructor() {
    this.initializeApi();
  }

  isAuthorised() {
    return useCredentialsPersistantStore.getState().spotifyAccessToken !== null;
  }

  async getSongsId(songs: PlaylistSongs[]): Promise<string[]> {
    useUIStateStore.getState().updateSongsToMigrate(songs.length);
    useUIStateStore.getState().updateSongsMigrated(0);

    let musics: string[] = [];
    for (let i = 0; i < songs.length; i++) {
      let song = songs[i];
      let result = await this.spotifyApi.get(
        "https://api.spotify.com/v1/search",
        {
          params: {
            q: `${song.name} ${song.artist}`,
            type: "track",
            limit: 1,
          },
        }
      );

      useUIStateStore
        .getState()
        .updateSongsMigrated(
          useUIStateStore.getState().songsInfomationLoaded + 1
        );

      if (result?.data?.tracks?.items?.length > 0) {
        musics.push(result.data.tracks.items[0].id as string);
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    return musics;
  }

  async addSongsOntoPlaylist(
    songsIds: string[],
    playlist: UserPlaylist
  ): Promise<boolean> {
    let userProfile = await this.spotifyApi.get(
      "https://api.spotify.com/v1/me"
    );
    let userId = userProfile.data.id;

    let playlistRes = await this.spotifyApi.post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        name: playlist.name,
        public: false,
      }
    );
    for (let i = 0; i < songsIds.length; i += 150) {
      let url = `https://api.spotify.com/v1/playlists/${playlistRes.data.id}/tracks`;
      let body = {
        uris: songsIds.slice(i, i + 150).map((x) => "spotify:track:" + x),
        position: 0,
      };

      await this.spotifyApi.post(url, body);
    }

    return Promise.resolve(true);
  }

  initializeApi() {
    this.spotifyApi.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${
        useCredentialsPersistantStore.getState().spotifyAccessToken
      }`;
      return config;
    });

    this.spotifyApi.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (
          error.response &&
          error.response.status === 401 &&
          !error.config.__isRetryRequest
        ) {
          await this.getRefreshToken();
          error.config.__isRetryRequest = true;
          return this.spotifyApi.request(error.config);
        } else {
          useCredentialsPersistantStore
            .getState()
            .updateSpotifyAccessToken(null);
          useCredentialsPersistantStore
            .getState()
            .updateSpotifyRefreshToken(null);
          return Promise.reject(error);
        }
      }
    );
  }

  async getProfile() {
    return this.spotifyApi.get("https://api.spotify.com/v1/me");
  }

  async getSongs(playlistId: string) {
    let songs: PlaylistSongs[] = [];
    let nextUrl:
      | string
      | null = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=0&limit=100`;

    try {
      while (nextUrl) {
        const response: AxiosResponse<any> = await this.spotifyApi.get(nextUrl);
        const items = response.data.items;

        items.forEach((item: any) => {
          songs.push({
            name: item.track.name,
            artist: item.track.artists
              .map((artist: any) => artist.name)
              .join(", "),
          });
        });

        nextUrl = response.data.next;
      }

      return songs;
    } catch (error) {
      throw error;
    }
  }

  async getPlaylist(limit: number, offset: number) {
    return this.spotifyApi
      .get("https://api.spotify.com/v1/me/playlists", {
        params: { limit, offset },
      })
      .then((response) => {
        const playlists: UserPlaylist[] = response.data.items.map(
          (playlist: any) => {
            console.log(playlist);
            return {
              id: playlist.id,
              name: playlist.name,
              image:
                playlist.images && playlist.images.length > 0
                  ? playlist.images[0].url
                  : "/placeholder-image-dark.webp",
              originalLink: playlist.external_urls.spotify,
            };
          }
        );
        return Promise.resolve({ playlists, total: response.data.total });
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async getRefreshToken() {
    const refreshToken =
      useCredentialsPersistantStore.getState().spotifyRefreshToken;
    const url = "https://accounts.spotify.com/api/token";
    if (
      refreshToken &&
      useCredentialsPersistantStore.getState().spotifyAPIKey
    ) {
      const payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: useCredentialsPersistantStore.getState().spotifyAPIKey,
        }),
      };

      const body = await fetch(url, payload);
      const response = await body.json();

      useCredentialsPersistantStore
        .getState()
        .updateSpotifyAccessToken(response.access_token);
      useCredentialsPersistantStore
        .getState()
        .updateSpotifyRefreshToken(response.refresh_token);
    } else {
      throw new Error("Refresh token not found");
    }
  }
}
