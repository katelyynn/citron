import { Context, Hono } from "hono";
import type { Env } from "../middleware/db.ts";
import { eq } from "drizzle-orm";
import { albums, artists, listens, songs } from "../db/schema.ts";
import { getCookie } from "hono/cookie";
import { jwtVerify } from "jose";
import { createWallEntry } from "./wall.ts";

export const listenRoute = new Hono<Env>();

async function findOrCreateArtist(name: string, c: Context) {
	const artist = await c.get('db').select().from(artists).where(eq(artists.name, name)).limit(1);
	if (artist.length > 0) return artist[0];

	const newArtist = await c.get('db').insert(artists).values({ name }).returning();
	return newArtist[0];
}

async function findOrCreateAlbum(name: string, artist: string, c: Context) {
	const album = await c.get('db').select().from(albums).where(eq(albums.name, name)).limit(1);
	if (album.length > 0) return album[0];

	const newAlbum = await c.get('db').insert(albums).values({ name, artist }).returning();
	return newAlbum[0];
}

async function findOrCreateSong(name: string, artist: string, c: Context) {
	const song = await c.get('db').select().from(songs).where(eq(songs.name, name)).limit(1);
	if (song.length > 0) return song[0];

	const newSong = await c.get('db').insert(songs).values({ name, artist }).returning();
	return newSong[0];
}

listenRoute.post('/', async (c) => {
	try {
		const token = getCookie(c, 'citron');
		if (!token) return c.json({ error: 'unauthorised' }, 401);

		const secret = new TextEncoder().encode(process.env.JWT_SECRET);
		const { payload } = await jwtVerify(token, secret);

		const id = payload.id as string;
		if (!id) {
			return c.json({ error: 'invalid token' }, 401);
		}

		const {
			name: songName,
			artist: artistName,
			album: albumName,
			albumArtist: albumArtistName,
			duration,
			timestamp,
			submitter,
			spotifyId,
			appleMusicId,
			mbid,
			isrc
		} = await c.req.json();

		if (!songName || !artistName) {
			return c.json({ error: 'missing required fields: name, artist' }, 400);
		}

		const finalAlbumArtistName = albumArtistName || artistName;

		const artist = await findOrCreateArtist(artistName, c);

		let album = null;
		if (albumName) {
			const albumArtist = await findOrCreateArtist(finalAlbumArtistName, c);
			album = await findOrCreateAlbum(albumName, albumArtist.id, c);
		}

		const song = await findOrCreateSong(songName, artist.id, c);

		const played = timestamp ? new Date(timestamp) : new Date();

		const result = await c.get('db').transaction(async (t) => {
			const [listen] = await c.get('db').insert(listens).values({
				user: id,
				song: song.id,
				created: played,
				duration,
				submitter,
				spotifyId,
				appleMusicId,
				mbid,
				isrc,
				rawName: songName,
				rawArtist: artistName,
				rawAlbum: albumName,
				rawAlbumArtist: albumArtistName
			});

			const wall = await createWallEntry(t, id, {
				type: 'song',
				action: 'listen',
				songs: [song]
			});

			return { listen, wall };
		});

		return c.json(result, 201);
	} catch (e) {
		return c.json({ error: (e as Error).message }, 500);
	}
});
