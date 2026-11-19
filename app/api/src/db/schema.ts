import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid, type AnyPgColumn } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('username').notNull().unique(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	created: timestamp('created').notNull().defaultNow(),

	about: text('about'),
	avatar: text('avatar'),

	personalPronoun: text('personalPronoun').default('they'),
	possessivePronoun: text('possessivePronoun').default('them')
});

export const artists = pgTable('artists', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	created: timestamp('created').notNull().defaultNow()
});

export const albums = pgTable('albums', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	artist: uuid('artist').notNull().references(() => artists.id),
	created: timestamp('created').notNull().defaultNow(),
	released: timestamp('released').notNull()
});

export const songs = pgTable('songs', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	artist: uuid('artist').notNull().references(() => artists.id),
	album: uuid('album').references(() => albums.id),
	created: timestamp('created').notNull().defaultNow(),
	duration: integer('duration'),
	index: integer('index'),
});

export const listens = pgTable('listens', {
	id: uuid('id').primaryKey().defaultRandom(),
	user: uuid('user').references(() => users.id),
	song: uuid('song').references(() => songs.id),
	created: timestamp('created').notNull().defaultNow(),

	// i think listens shld be able to store their own duration
	// that can be used in the future for other things maybe
	duration: integer('duration'),

	// used for matching?
	rawName: text('rawName'),
	rawArtist: text('rawArtist'),
	rawAlbum: text('rawAlbum'),
	rawAlbumArtist: text('rawAlbumArtist'),
	submitter: text('submitter'), // service e.g. spotify, random app name
	spotifyId: text('spotifyId'),
	appleMusicId: text('appleMusicId'),
	mbid: text('mbid'),
	isrc: text('isrc')
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

//

export const comments = pgTable('comments', {
	id: uuid('id').primaryKey().defaultRandom(),
	user: uuid('user').notNull().references(() => users.id),
	parent: uuid('parent').references((): AnyPgColumn => comments.id),
	content: text('content').notNull(),

	// targetType makes this js easier
	targetType: text('targetType').notNull(),
	targetId: uuid('targetId').notNull(),

	created: timestamp('created').notNull().defaultNow()
});

// TODO: look over this again soon
export const wall = pgTable('wall', {
	id: uuid('id').primaryKey().defaultRandom(),
	user: uuid('user').notNull().references(() => users.id),

	targetType: text('targetType').notNull(),
	targetId: uuid('targetId').notNull(),

	metadata: text('metadata'),
	created: timestamp('created').notNull().defaultNow(),
	count: integer('count').notNull().default(1),
	artists: uuid('artists').array().notNull().default([])
});
