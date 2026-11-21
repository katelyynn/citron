import { AlbumRegular, DiscRegular } from '@mingcute/react/core-regular';
import { Icon } from '../icon/icon';
import styles from './album.module.css';
import { DefaultLink } from '../link/link';
import type { ReactNode } from 'react';

interface AlbumProps {
	art?: string;
	id: string;
	name: string;
	artistId: string;
	artist: string;
	showArtist?: boolean;
}

export function Album({
	art,
	id,
	name,
	artistId,
	artist,
	showArtist = true
}: AlbumProps) {
	return (
		<div className={styles.album}>
			<div className={styles.art}>
				{art ? (
					<img className={styles.image} src={art} alt={name} />
				) : (
					<div className={styles.placeholder}>
						<Icon name={AlbumRegular} />
					</div>
				)}
			</div>
			<div className={styles.content}>
				<DefaultLink className={styles.name} to={`/album/${id}`}>
					{name}
				</DefaultLink>
				{showArtist && (
					<DefaultLink className={styles.artist} to={`/album/${artistId}`}>
						{artist}
					</DefaultLink>
				)}
			</div>
		</div>
	)
}

interface AlbumListProps {
	children: ReactNode;
}

export function AlbumList({
	children
}: AlbumListProps) {
	return (
		<div className={styles.list}>
			{children}
		</div>
	)
}
