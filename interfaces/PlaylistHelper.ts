import { UserPlaylist, PlaylistSongs } from "@/types/playlists";

export interface PlaylistHelper {
  getPlaylist(
    limit: number,
    offset: number
  ): Promise<{ playlists: UserPlaylist[]; total: number }>;

  getSongs(playlistId: string): Promise<PlaylistSongs[]>;
  addSongsOntoPlaylist(
    songsIds: string[],
    playlist: UserPlaylist
  ): Promise<boolean>;
  getSongsId(songs: PlaylistSongs[]): Promise<string[]>;
}
