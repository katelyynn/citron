import { Song } from "./song";

export interface Listen {
	id: string;
	user: string;
	song: Song;
	created: string;
	duration: number | null;
	rawName: string;
	rawArtist: string;
	rawAlbum: string;
	rawAlbumArtist: string;
	submitter: string | null;
	spotifyId: string | null;
	appleMusicId: string | null;
	mbid: string | null;
	isrc: string | null;
}
