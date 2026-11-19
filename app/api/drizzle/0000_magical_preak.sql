CREATE TABLE "albums" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"artist" uuid NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL,
	"released" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "artists" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user" uuid NOT NULL,
	"parent" uuid,
	"content" text NOT NULL,
	"targetType" text NOT NULL,
	"targetId" uuid NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "listens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user" uuid,
	"song" uuid,
	"created" timestamp DEFAULT now() NOT NULL,
	"duration" integer,
	"rawName" text,
	"rawArtist" text,
	"rawAlbum" text,
	"rawAlbumArtist" text,
	"submitter" text,
	"spotifyId" text,
	"appleMusicId" text,
	"mbid" text,
	"isrc" text
);
--> statement-breakpoint
CREATE TABLE "songs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"artist" uuid NOT NULL,
	"album" uuid,
	"created" timestamp DEFAULT now() NOT NULL,
	"duration" integer,
	"index" integer
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL,
	"about" text,
	"avatar" text,
	"personalPronoun" text DEFAULT 'they',
	"possessivePronoun" text DEFAULT 'them',
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "wall" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user" uuid NOT NULL,
	"targetType" text NOT NULL,
	"targetId" uuid NOT NULL,
	"metadata" text,
	"created" timestamp DEFAULT now() NOT NULL,
	"count" integer DEFAULT 1 NOT NULL,
	"artists" uuid[] DEFAULT '{}' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "albums" ADD CONSTRAINT "albums_artist_artists_id_fk" FOREIGN KEY ("artist") REFERENCES "public"."artists"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_comments_id_fk" FOREIGN KEY ("parent") REFERENCES "public"."comments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listens" ADD CONSTRAINT "listens_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listens" ADD CONSTRAINT "listens_song_songs_id_fk" FOREIGN KEY ("song") REFERENCES "public"."songs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "songs" ADD CONSTRAINT "songs_artist_artists_id_fk" FOREIGN KEY ("artist") REFERENCES "public"."artists"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "songs" ADD CONSTRAINT "songs_album_albums_id_fk" FOREIGN KEY ("album") REFERENCES "public"."albums"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wall" ADD CONSTRAINT "wall_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;