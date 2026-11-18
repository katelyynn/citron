import { createMiddleware } from "hono/factory";
import { db } from "../db/index.ts";

export type Env = { Variables: { db: typeof db } }

export const dbMiddleware = createMiddleware<Env>(async (c, next) => {
	c.set('db', db);
	await next();
});
