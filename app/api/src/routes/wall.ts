import { Hono } from "hono";
import type { Env } from "../middleware/db.ts";
import { albums, artists, listens, songs, users, wall, wallAlbums, wallArtists, wallComments, wallSongs, wallUsers } from "../db/schema.ts";
import { desc, eq } from "drizzle-orm";
import { getCookie } from "hono/cookie";
import { jwtVerify } from "jose";
import type { PgTransaction } from "drizzle-orm/pg-core";

export const wallRoute = new Hono<Env>();

wallRoute.get('/:name', async (c) => {
	const name = c.req.param('name');

	const user = await c.get('db').query.users.findFirst({
		where: eq(users.name, name)
	});

	if (!user) {
		return c.json({ error: 'user not found' }, 404);
	}

	const entries = await c.get('db').query.wall.findMany({
		where: eq(wall.user, user.id),

		with: {
			artists: {
				with: {
					artist: true
				}
			},
			albums: {
				with: {
					album: true
				}
			},
			songs: {
				with: {
					song: true
				}
			},
			users: {
				with: {
					user: true
				}
			},
			comments: {
				with: {
					comment: true
				}
			}
		},

		orderBy: [desc(wall.created)],
		limit: 20
	});

	return c.json(entries);
});

interface WallEntry {
	type: string;
	action: string;
	artists?: string[];
	albums?: string[];
	songs?: string[];
	users?: string[];
	comments?: string[];
}

export function createWallEntry(t: any, id: string, body: WallEntry) {

}

wallRoute.post('/', async (c) => {
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
			songs,
			artists,
			albums,
			users,
			comments,
			type,
			action,
		} = await c.req.json();

		let wallId = '';

		await c.get('db').transaction(async (t) => {
			const [entry] = await t
				.insert(wall)
				.values({
					user: id,
					type,
					action
				}).returning({
					id: wall.id
				});

			wallId = entry.id;

			if (artists.length > 0) {
				await t.insert(wallArtists).values(
					(artists as string[]).map((artist, i) => ({
						wall: wallId,
						artist,
						index: i
					}))
				);
			}

			if (albums.length > 0) {
				await t.insert(wallAlbums).values(
					(albums as string[]).map((album, i) => ({
						wall: wallId,
						album,
						index: i
					}))
				);
			}

			if (songs.length > 0) {
				await t.insert(wallSongs).values(
					(songs as string[]).map((song, i) => ({
						wall: wallId,
						song,
						index: i
					}))
				);
			}

			if (users.length > 0) {
				await t.insert(wallUsers).values(
					(users as string[]).map((user, i) => ({
						wall: wallId,
						user,
						index: i
					}))
				);
			}

			if (comments.length > 0) {
				await t.insert(wallComments).values(
					(comments as string[]).map((comment, i) => ({
						wall: wallId,
						comment,
						index: i
					}))
				);
			}
		});

		return c.json({
			id: wallId,
			success: true
		}, 201);
	} catch (e) {
		console.error(e);
		return c.json({ message: 'sorry, something went wrong' }, 500);
	}
});
