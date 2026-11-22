import { Hono } from "hono";
import type { Env } from "../middleware/db.ts";
import { albums, artists, listens, songs, users } from "../db/schema.ts";
import { desc, eq } from "drizzle-orm";

export const wallRoute = new Hono<Env>();
