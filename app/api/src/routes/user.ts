import { Hono } from "hono";
import type { Env } from "../middleware/db.ts";

const app = new Hono<Env>();

app.get('/', async (c) => {
	const db = c.get('db');
	const rows = await db.query.users.findMany({ limit: 50 });
	return c.json(rows);
});

export default app;
