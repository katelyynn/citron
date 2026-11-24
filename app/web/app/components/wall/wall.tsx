import type { Artist } from '@citron/share/artist';
import styles from './wall.module.css';
import type { Album } from '@citron/share/album';
import type { Song } from '@citron/share/song';
import type { User } from '@citron/share/user';

interface WallEntryProps {
	type: string;
	action: string;
	created: string;
	artists: Artist[];
	albums: Album[];
	songs: Song[];
	users: User[];
	//comments:
}

export function WallEntry({
	type,
	action,
	created,
	artists,
	albums,
	songs,
	users,
	//comments
}: WallEntryProps) {
	return <p>test</p>
}
