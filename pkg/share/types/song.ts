import { Album } from "./album";
import { Artist } from "./artist";

export interface Song {
	id: string;
	name: string;
	artist: Artist;
	album: Album | null;
	created: string;
	duration: number | null;
	index: number | null;
}
