import { Hono } from "hono";
import type { Env } from "../middleware/db.ts";
import { albums, artists, listens, songs, users } from "../db/schema.ts";
import { desc, eq } from "drizzle-orm";

const userRoute = new Hono<Env>();

userRoute.get('/', async (c) => {
	const allUsers = await c.get('db').select({
		id: users.id,
		name: users.name,
		avatar: users.avatar,
		about: users.about,
		created: users.created,
		pronouns: {
			personal: users.personalPronoun,
			possessive: users.possessivePronoun,
			determiner: users.possessiveDeterminer
		}
	}).from(users);

	return c.json(allUsers);
});

userRoute.get('/:name', async (c) => {
	const name = c.req.param('name');

	try {
		const user = await c.get('db').select({
			id: users.id,
			name: users.name,
			avatar: users.avatar,
			about: users.about,
			created: users.created,
			pronouns: {
				personal: users.personalPronoun,
				possessive: users.possessivePronoun,
				determiner: users.possessiveDeterminer
			}
		}).from(users).where(eq(users.name, name)).limit(1);

		if (user.length == 0) {
			return c.json({ error: 'user not found' }, 404);
		}

		return c.json(user[0]);
	} catch {
		return c.json({ error: 'user not found' }, 404);
	}
});

userRoute.get('/:id/recent', async (c) => {
	const id = c.req.param('id');

	const user = await c.get('db').query.users.findFirst({
		where: eq(users.id, id),
		columns: {
			id: true
		},
		with: {
			listens: {
				orderBy: desc(listens.created),
				limit: 10,
				with: {
					song: {
						with: {
							artist: true,
							album: true
						}
					}
				}
			}
		}
	});

	if (!user) {
		return c.json({ error: 'user not found' }, 404);
	}

	return c.json(user.listens);
});

export default userRoute;
