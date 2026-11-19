import { Hono } from "hono";
import type { Env } from "../middleware/db.ts";
import { users } from "../db/schema.ts";
import { eq } from "drizzle-orm";

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
			possessive: users.possessivePronoun
		}
	}).from(users);

	return c.json(allUsers);
});

userRoute.get('/:id', async (c) => {
	const id = c.req.param('id');

	const user = await c.get('db').select({
		id: users.id,
		name: users.name,
		avatar: users.avatar,
		about: users.about,
		created: users.created,
		pronouns: {
			personal: users.personalPronoun,
			possessive: users.possessivePronoun
		}
	}).from(users).where(eq(users.id, id)).limit(1);

	if (user.length == 0) {
		return c.json({ error: 'user not found' }, 404);
	}

	return c.json(user[0]);
});

export default userRoute;
