import { useCredentialsPersistantStore } from "@/stores/credentialsStore";
import axios from "axios";

export default class SpotifyApiHelper {
  private spotifyApi = axios.create();

  public constructor() {
    this.initializeApi();
  }

  isAuthorised() {
    return useCredentialsPersistantStore.getState().spotifyAccessToken !== null;
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
          return Promise.reject(error);
        }
      }
    );
  }

  async getPlaylistList(limit: number, offset: number) {
    console.log(useCredentialsPersistantStore.getState().spotifyAccessToken);
    this.spotifyApi
      .get("https://api.spotify.com/v1/me/playlists", {
        params: { limit, offset },
      })
      .then((response) => {
        console.log(response);
      });
  }

  async getPlaylistSongs(limit: number, offset: number) {
    console.log(useCredentialsPersistantStore.getState().spotifyAccessToken);
    this.spotifyApi
      .get(
        "https://api.spotify.com/v1/playlists/0Jzg8OGJafF8xj2SlZUMcU/tracks",
        {
          params: { limit, offset },
        }
      )
      .then((response) => {
        console.log(response);
      });
  }

  async retrieveLink() {
    console.log(useCredentialsPersistantStore.getState().spotifyAccessToken);
    this.spotifyApi
      .get("https://api.spotify.com/v1/me/playlists", {
        params: { limit: 20, offset: 0 },
      })
      .then((response) => {
        console.log(response);
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
