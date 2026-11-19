import { Hono } from "hono";
import type { Env } from "../middleware/db.ts";
import { users } from "../db/schema.ts";

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

export default userRoute;
