import { PlaylistHelper } from "@/interfaces/PlaylistHelper";
import { useUIStateStore } from "@/stores/UIStateStore";
import { useCredentialsStore } from "@/stores/credentialsStore";
import { PlaylistSongs, UserPlaylist } from "@/types/playlists";

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
      console.log(music.data.results, queryParameters);
      if (!music?.data?.results?.songs?.data?.length) {
        continue;
      }
      musics.push(music.data.results.songs.data[0].id);

      // Update songs migration progress
      useUIStateStore
        .getState()
        .updateSongsMigrated(
          useUIStateStore.getState().songsInfomationLoaded + 1
        );
    }

    return musics;
  }

  addSongsOntoPlaylist(songs: PlaylistSongs[]): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      // Your implementation here
    });
  }
}
