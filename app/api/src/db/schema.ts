import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
	id: serial().primaryKey(),
	name: text('username').notNull().unique(),
	created: timestamp('created').notNull().defaultNow()
});
