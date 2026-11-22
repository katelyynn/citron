CREATE TABLE "wallAlbums" (
	"wall" uuid NOT NULL,
	"album" uuid NOT NULL,
	"index" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "wallAlbums_wall_album_pk" PRIMARY KEY("wall","album")
);
--> statement-breakpoint
CREATE TABLE "wallArtists" (
	"wall" uuid NOT NULL,
	"artist" uuid NOT NULL,
	"index" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "wallArtists_wall_artist_pk" PRIMARY KEY("wall","artist")
);
--> statement-breakpoint
CREATE TABLE "wallComments" (
	"wall" uuid NOT NULL,
	"comment" uuid NOT NULL,
	"index" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "wallComments_wall_comment_pk" PRIMARY KEY("wall","comment")
);
--> statement-breakpoint
CREATE TABLE "wallSongs" (
	"wall" uuid NOT NULL,
	"song" uuid NOT NULL,
	"index" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "wallSongs_wall_song_pk" PRIMARY KEY("wall","song")
);
--> statement-breakpoint
CREATE TABLE "wallUsers" (
	"wall" uuid NOT NULL,
	"user" uuid NOT NULL,
	"index" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "wallUsers_wall_user_pk" PRIMARY KEY("wall","user")
);
--> statement-breakpoint
ALTER TABLE "wall" RENAME COLUMN "targetType" TO "type";--> statement-breakpoint
ALTER TABLE "wall" ADD COLUMN "action" text NOT NULL;--> statement-breakpoint
ALTER TABLE "wallAlbums" ADD CONSTRAINT "wallAlbums_wall_wall_id_fk" FOREIGN KEY ("wall") REFERENCES "public"."wall"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallAlbums" ADD CONSTRAINT "wallAlbums_album_albums_id_fk" FOREIGN KEY ("album") REFERENCES "public"."albums"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallArtists" ADD CONSTRAINT "wallArtists_wall_wall_id_fk" FOREIGN KEY ("wall") REFERENCES "public"."wall"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallArtists" ADD CONSTRAINT "wallArtists_artist_artists_id_fk" FOREIGN KEY ("artist") REFERENCES "public"."artists"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallComments" ADD CONSTRAINT "wallComments_wall_wall_id_fk" FOREIGN KEY ("wall") REFERENCES "public"."wall"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallComments" ADD CONSTRAINT "wallComments_comment_comments_id_fk" FOREIGN KEY ("comment") REFERENCES "public"."comments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallSongs" ADD CONSTRAINT "wallSongs_wall_wall_id_fk" FOREIGN KEY ("wall") REFERENCES "public"."wall"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallSongs" ADD CONSTRAINT "wallSongs_song_songs_id_fk" FOREIGN KEY ("song") REFERENCES "public"."songs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallUsers" ADD CONSTRAINT "wallUsers_wall_wall_id_fk" FOREIGN KEY ("wall") REFERENCES "public"."wall"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallUsers" ADD CONSTRAINT "wallUsers_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wall" DROP COLUMN "targetId";--> statement-breakpoint
ALTER TABLE "wall" DROP COLUMN "metadata";--> statement-breakpoint
ALTER TABLE "wall" DROP COLUMN "count";--> statement-breakpoint
ALTER TABLE "wall" DROP COLUMN "artists";