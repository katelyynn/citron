import type { ReactNode } from 'react';
import styles from './song.module.css';
import { Icon } from '../icon/icon';
import { DiscAlbumFilled } from '@mingcute/react/core-filled';
import { DateTime } from 'luxon';

interface SongRowProps {
	index?: number;
	art?: string | boolean;
	id: string;
	name: string;
	artistId: string;
	artist: string;
	albumId?: string;
	album?: string;
	albumArtistId?: string;
	albumArtist?: string;
	duration?: number;
	active?: boolean;
	created: string;
}

export function SongRow({
	index,
	art,
	id,
	name,
	artistId,
	artist,
	albumId,
	album,
	albumArtistId,
	albumArtist,
	duration,
	active,
	created
}: SongRowProps) {
	return (
		<tr className={[
			styles.song,
			active && styles.active,
			art && styles.withArt
		].join(' ')}>
			{index && (
				<td className={styles.index}>
					{index}
				</td>
			)}
			{art && (
				<td className={styles.art}>
					<div className={styles.image}>
						{art === true ? (
							<div className={styles.placeholder}>
								<Icon name={DiscAlbumFilled} />
							</div>
						) : (
							<img className={styles.imageInner} src={art} />
						)}
					</div>
				</td>
			)}
			<td className={styles.content}>
				<a href={`/song/${id}`} className={[styles.name, 'link-underline'].join(' ')}>
					{name}
				</a>
				<span className={styles.artists}>
					<a href={`/artist/${artistId}`} className={[styles.artist, 'link-underline'].join(' ')}>
						{artist}
					</a>
				</span>
				{(album && albumId) && (
					<a href={`/album/${albumId}`} className={[styles.album, 'link-underline'].join(' ')}>
						{album}
					</a>
				)}
			</td>
			{duration && (
				<td className={styles.duration}>
					{duration}
				</td>
			)}
			{!index && (
				<td className={styles.time}>
					{DateTime.fromISO(created).toRelative()}
				</td>
			)}
		</tr>
	)
}

interface SongListProps {
	children: ReactNode;
}

export function SongList({
	children
}: SongListProps) {
	return (
		<table className={styles.list}>
			<tbody className={styles.body}>
				{children}
			</tbody>
		</table>
	)
}
