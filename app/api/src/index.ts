import 'dotenv/config';
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { dbMiddleware } from './middleware/db.ts'
import userRoute from './routes/user.ts';

const app = new Hono()
	.use('*', dbMiddleware)
	.route('/user', userRoute);

app.get('/', (c) => {
	return c.text('Hello Hono!')
})

serve({
	fetch: app.fetch,
	port: 3000
}, (info) => {
	console.log(`Server is running on http://localhost:${info.port}`)
})
