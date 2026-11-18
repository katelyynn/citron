import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
	id: serial().primaryKey(),
	name: text('username').notNull().unique(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	created: timestamp('created').notNull().defaultNow()
});

export const artists = pgTable('artists', {
	id: serial().primaryKey(),
	name: text('name').notNull(),
	created: timestamp('created').notNull().defaultNow()
});

export const albums = pgTable('albums', {
	id: serial().primaryKey(),
	name: text('name').notNull(),
	artist: text('artist').notNull().references(() => artists.id),
	created: timestamp('created').notNull().defaultNow(),
	released: timestamp('released').notNull()
});

export const songs = pgTable('songs', {
	id: serial().primaryKey(),
	name: text('name').notNull(),
	artist: text('artist').notNull().references(() => artists.id),
	album: text('album').references(() => albums.id),
	created: timestamp('created').notNull().defaultNow(),
	duration: integer('duration'),
	index: integer('index'),
});

// TODO: these need to support having multiple artists
// ...somehow

export const artistRelations = relations(artists, ({ many }) => ({
	albums: many(albums),
	songs: many(songs)
}));

export const albumRelations = relations(albums, ({ one, many }) => ({
	artist: one(artists, { fields: [albums.artist], references: [artists.id] }),
	songs: many(songs)
}));

export const songRelations = relations(songs, ({ one }) => ({
	artist: one(artists, { fields: [songs.artist], references: [artists.id] }),
	album: one(albums, { fields: [songs.album], references: [albums.id] })
}));
