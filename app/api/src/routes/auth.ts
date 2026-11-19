import { Hono } from "hono";
import { type Env } from "../middleware/db.ts";
import { users } from "../db/schema.ts";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

const authRoute = new Hono<Env>();

authRoute.post('/register', async (c) => {
	try {
		const { name, email, password } = await c.req.json();

		if (!name || !email || !password) {
			return c.json({ error: 'missing required fields: name, email, password' }, 400);
		}

		const existingName = await c.get('db')
			.select()
			.from(users)
			.where(eq(users.name, name.trim()))
			.limit(1);

		if (existingName.length > 0) {
			return c.json({ error: 'name is already in use' });
		}

		if (password.length < 6) {
			return c.json({ error: 'password must be at least 6 characters' }, 400);
		}

		const existingEmail = await c.get('db')
			.select()
			.from(users)
			.where(eq(users.email, email))
			.limit(1);

		if (existingEmail.length > 0) {
			return c.json({ error: 'email is already in use' });
		}

		const passwordHash = await bcrypt.hash(password, 10);

		await c.get('db')
			.insert(users)
			.values({
				name: name.trim(),
				email,
				password: passwordHash
			});

		return c.json({ message: 'created user' }, 201);
	} catch (e) {
		return c.json({ error: e.message }, 500);
	}
});
