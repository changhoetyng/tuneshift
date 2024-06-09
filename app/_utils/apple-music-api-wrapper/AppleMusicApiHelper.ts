import { PlaylistHelper } from "@/interfaces/PlaylistHelper";
import { useUIStateStore } from "@/stores/UIStateStore";
import { useCredentialsStore } from "@/stores/credentialsStore";
import { PlaylistSongs, UserPlaylist } from "@/types/playlists";
import axios from "axios";

export default class AppleMusicApiHelper implements PlaylistHelper {
  private get musicKitInstance() {
    return useCredentialsStore.getState().musicKitInstance;
  }

  async getPlaylist(
    limit: number,
    offset: number
  ): Promise<{ playlists: UserPlaylist[]; total: number }> {
    let res = await this.musicKitInstance.api.music(
      "/v1/me/library/playlists",
      { limit: limit, offset: offset }
    );

    let playlists = [];

    for (const playlist of res.data.data) {
      playlists.push({
        id: playlist.id,
        name: playlist.attributes.name,
        image: playlist.attributes.artwork.url,
      });
    }
    return {
      playlists: playlists,
      total: res.data.meta.total,
    };
  }

  async getSongs(playlistId: string): Promise<PlaylistSongs[]> {
    let songs: PlaylistSongs[] = [];
    let nextUrl:
      | string
      | null = `v1/me/library/playlists/${playlistId}/tracks?offset=0&limit=10`;

    while (nextUrl) {
      let res: any = await this.musicKitInstance.api.music(nextUrl);

      const items = res.data.data;
      items.forEach((item: any) => {
        songs.push({
          name: item.attributes.name,
          artist: item.attributes.artistName,
        });
      });

      nextUrl = res.data.next;
    }

    return songs;
  }

  async getSongsId(songs: PlaylistSongs[]): Promise<string[]> {
    // Set initial songs migration status
    useUIStateStore.getState().updateSongsToMigrate(songs.length);
    useUIStateStore.getState().updateSongsMigrated(0);

    let musics = [];

    for (const song of songs) {
      const queryParameters = {
        term: song.name + " " + song.artist,
        types: ["songs"],
      };
      let music = await this.musicKitInstance.api.music(
        "/v1/catalog/{{storefrontId}}/search",
        queryParameters
      );

      // Update songs migration progress
      useUIStateStore
        .getState()
        .updateSongsMigrated(
          useUIStateStore.getState().songsInfomationLoaded + 1
        );

      if (!music?.data?.results?.songs?.data?.length) {
        continue;
      }
      musics.push(music.data.results.songs.data[0].id);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return musics;
  }

  async addSongsOntoPlaylist(
    songsIds: string[],
    playlist: UserPlaylist
  ): Promise<boolean> {
    let payload = {
      attributes: {
        name: playlist.name,
      },
      relationships: {
        tracks: {
          data: songsIds.map((songId) => ({
            id: songId,
            type: "songs",
          })),
        },
      },
    };
    const url = "https://api.music.apple.com/v1/me/library/playlists";

    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${this.musicKitInstance.developerToken}`,
        "Music-User-Token": this.musicKitInstance.musicUserToken,
        "Content-Type": "application/json",
      },
    });

    return true;
  }
}
