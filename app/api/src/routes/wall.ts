import { Hono } from "hono";
import type { Env } from "../middleware/db.ts";
import { albums, artists, listens, songs, users, wall, wallAlbums, wallArtists, wallComments, wallSongs, wallUsers } from "../db/schema.ts";
import { desc, eq } from "drizzle-orm";
import { getCookie } from "hono/cookie";
import { jwtVerify } from "jose";

export const wallRoute = new Hono<Env>();

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

		const wallId = crypto.randomUUID();

		await c.get('db').transaction(async (t) => {
			await t.insert(wall).values({
				id: wallId,
				user: id,
				type,
				action
			});

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
