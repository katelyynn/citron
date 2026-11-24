import { Hono } from "hono";
import { type Env } from "../middleware/db.ts";
import { users } from "../db/schema.ts";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";
import { getCookie, setCookie } from "hono/cookie";

const authRoute = new Hono<Env>();

authRoute.post('/register', async (c) => {
	try {
		const { name, email, password, key } = await c.req.json();

		if (!key || key != process.env.ACCOUNT_KEY) {
			return c.json({ error: 'registration is restricted, sorry ;-;' }, 400);
		}

		if (!name || !email || !password) {
			return c.json({ error: 'missing required fields: name, email, password' }, 400);
		}

		const existingName = await c.get('db')
			.select()
			.from(users)
			.where(eq(users.name, name.trim()))
			.limit(1);

		if (existingName.length > 0) {
			return c.json({ error: 'name is already in use' }, 400);
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
			return c.json({ error: 'email is already in use' }, 400);
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
		console.error(e);
		return c.json({ message: 'sorry, something went wrong' }, 500);
	}
});

authRoute.post('/login', async (c) => {
	try {
		const { email, password } = await c.req.json();

		if (!email || !password) {
			return c.json({ error: 'missing required fields: email, password' }, 400);
		}

		// by keeping this as a const it eliminates the possibility
		// of someone getting extra info out of logging in errors
		const credentialError = c.json({ error: 'invalid credentials' }, 401);

		const user = await c.get('db')
			.select()
			.from(users)
			.where(eq(users.email, email))
			.limit(1);

		if (user.length == 0) {
			return credentialError;
		}

		const valid = await bcrypt.compare(password, user[0].password);
		if (!valid) {
			return credentialError;
		}

		const secret = new TextEncoder().encode(process.env.JWT_SECRET);
		const token = await new SignJWT({
			id: user[0].id,
			name: user[0].name,
			email: user[0].email
		})
			.setProtectedHeader({ alg: 'HS256' })
			.setExpirationTime('7d')
			.sign(secret);

		setCookie(c, 'citron', token, {
			path: '/',
			httpOnly: true,
			secure: false,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7
		});

		return c.json({
			message: 'logged in!',
			user: {
				id: user[0].id,
				name: user[0].name
			}
		});
	} catch (e) {
		console.error(e);
		return c.json({ message: 'sorry, something went wrong' }, 500);
	}
});

authRoute.get('/me', async (c) => {
	try {
		const id = await getAuthUser(c);
		if (!id) return c.json({ user: null }, 200);

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
		}).from(users).where(eq(users.id, id)).limit(1);

		if (user.length == 0) {
			return c.json({ user: null }, 200);
		}

		return c.json({ user: user[0] });
	} catch (error) {
		return c.json({ user: null }, 200);
	}
});

export async function getAuthUser(c: any): Promise<string | null> {
	const token = getCookie(c, 'citron');
	if (!token) return null;

	try {
		const secret = new TextEncoder().encode(process.env.JWT_SECRET);
		const { payload } = await jwtVerify(token, secret);

		const userId = payload.id as string;
		if (!userId) return null;

		return userId;
	} catch {
		return null;
	}
}

export default authRoute;
