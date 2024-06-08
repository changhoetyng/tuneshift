import { PlaylistHelper } from "@/interfaces/PlaylistHelper";
import { useUIStateStore } from "@/stores/UIStateStore";
import { useCredentialsStore } from "@/stores/credentialsStore";
import { PlaylistSongs, UserPlaylist } from "@/types/playlists";
import axios from "axios";

export default class AppleMusicApiHelper implements PlaylistHelper {
  private get musicKitInstance() {
    return useCredentialsStore.getState().musicKitInstance;
  }

  getPlaylist(
    limit: number,
    offset: number
  ): Promise<{ playlists: UserPlaylist[]; total: number }> {
    return new Promise<{ playlists: UserPlaylist[]; total: number }>(
      (resolve, reject) => {
        // Your implementation here
      }
    );
  }

  getSongs(playlistId: string): Promise<PlaylistSongs[]> {
    return new Promise<PlaylistSongs[]>((resolve, reject) => {
      // Your implementation here
    });
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

    try {
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${this.musicKitInstance.developerToken}`,
          "Music-User-Token": this.musicKitInstance.musicUserToken,
          "Content-Type": "application/json",
        },
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}
