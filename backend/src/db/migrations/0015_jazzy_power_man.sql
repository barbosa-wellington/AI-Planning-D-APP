CREATE TABLE "diet_preferences" (
	"preference_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"type" text,
	"description" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "fitbit" (
	"fitness_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"date" date,
	"steps" integer,
	"heart_rate_avg" double precision,
	"sleep_hours" double precision,
	"calories_burned" double precision,
	"source" text,
	"last_synced_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" text,
	"name" text,
	"email" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_clerk_user_id_unique" UNIQUE("clerk_user_id")
);
--> statement-breakpoint
ALTER TABLE "diet_preferences" ADD CONSTRAINT "diet_preferences_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fitbit" ADD CONSTRAINT "fitbit_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;