CREATE TABLE "settings" (
	"user" uuid PRIMARY KEY NOT NULL,
	"language" text DEFAULT 'en-GB',
	"theme" text DEFAULT 'ash',
	"presence" text DEFAULT 'everyone',
	"wall" text DEFAULT 'everyone',
	"recents" text DEFAULT 'everyone',
	"library" text DEFAULT 'everyone',
	"readComments" text DEFAULT 'everyone',
	"writeComments" text DEFAULT 'everyone',
	"message" text DEFAULT 'everyone',
	"friend" text DEFAULT 'everyone',
	"pronouns" text DEFAULT 'everyone'
);
--> statement-breakpoint
ALTER TABLE "settings" ADD CONSTRAINT "settings_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;