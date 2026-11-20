import 'dotenv/config';
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { dbMiddleware } from './middleware/db.ts'
import userRoute from './routes/user.ts';
import { cors } from 'hono/cors';
import authRoute from './routes/auth.ts';

const app = new Hono()
	.use('*', dbMiddleware, cors({
		origin: ['http://localhost:5173'],
		credentials: true
	}))
	.route('/api/user', userRoute)
	.route('/api/auth', authRoute);

app.get('/', (c) => {
	return c.text('Hello Hono!')
})

serve({
	fetch: app.fetch,
	port: 3000
}, (info) => {
	console.log(`Server is running on http://localhost:${info.port}`)
})
