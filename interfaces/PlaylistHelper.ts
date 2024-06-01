import { UserPlaylist } from "@/types/playlists";

export interface PlaylistHelper {
  getPlaylist(
    limit: number,
    offset: number
  ): Promise<{ playlists: UserPlaylist[]; total: number }>;
}
