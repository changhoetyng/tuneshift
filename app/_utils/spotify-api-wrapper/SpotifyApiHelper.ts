import { useCredentialsPersistantStore } from "@/stores/credentialsStore";
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

  getSongsId(songs: PlaylistSongs[]): Promise<string[]> {
    return Promise.resolve([]);
  }

  addSongsOntoPlaylist(
    songsIds: string[],
    playlist: UserPlaylist
  ): Promise<boolean> {
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
            return {
              id: playlist.id,
              name: playlist.name,
              image: playlist.images[0].url,
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
    if (refreshToken && process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID) {
      const payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        }),
      };

      const body = await fetch(url, payload);
      const response = await body.json();

      useCredentialsPersistantStore
        .getState()
        .updateSpotifyAccessToken(response.accessToken);
      useCredentialsPersistantStore
        .getState()
        .updateSpotifyRefreshToken(response.refreshToken);
    } else {
      throw new Error("Refresh token not found");
    }
  }
}
