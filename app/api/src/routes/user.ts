import { Hono } from "hono";
import type { Env } from "../middleware/db.ts";

const userRoute = new Hono<Env>();

userRoute.get('/', async (c) => {
	const db = c.get('db');
	const rows = await db.query.users.findMany({ limit: 50 });
	return c.json(rows);
});

export default userRoute;
