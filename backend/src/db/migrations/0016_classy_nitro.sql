CREATE TABLE "diet_plan" (
	"plan_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date,
	"goal_type" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "food" (
	"food_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"brand" text,
	"barcode" text,
	"external_id" text,
	"source_api" text,
	"calories_per_100g" numeric NOT NULL,
	"protein_per_100g" numeric NOT NULL,
	"carbs_per_100g" numeric NOT NULL,
	"fat_per_100g" numeric NOT NULL,
	"fiber_per_100g" numeric,
	"sugar_per_100g" numeric,
	"sodium_per_100g" numeric,
	"last_updated" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"category_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "food_category" (
	"category_id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"parent_id" integer
);
--> statement-breakpoint
CREATE TABLE "recipe" (
	"recipe_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"prep_time_minutes" integer,
	"cook_time_minutes" integer,
	"servings" integer,
	"difficulty" text,
	"image_url" text,
	"instructions" jsonb,
	"created_by" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recipe_ingredient" (
	"recipe_ingredient_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recipe_id" uuid NOT NULL,
	"food_id" uuid NOT NULL,
	"quantity" numeric NOT NULL,
	"unit" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "diet_preferences" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "diet_preferences" ALTER COLUMN "type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "diet_preferences" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "diet_preferences" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "diet_preferences" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "fitbit" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "fitbit" ALTER COLUMN "date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "fitbit" ALTER COLUMN "steps" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "fitbit" ALTER COLUMN "heart_rate_avg" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "fitbit" ALTER COLUMN "sleep_hours" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "fitbit" ALTER COLUMN "calories_burned" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "fitbit" ALTER COLUMN "source" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "fitbit" ALTER COLUMN "last_synced_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "fitbit" ALTER COLUMN "last_synced_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "clerk_user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "diet_plan" ADD CONSTRAINT "diet_plan_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "food" ADD CONSTRAINT "food_category_id_food_category_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."food_category"("category_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "food_category" ADD CONSTRAINT "food_category_parent_id_food_category_category_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."food_category"("category_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_recipe_id_recipe_recipe_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe"("recipe_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_food_id_food_food_id_fk" FOREIGN KEY ("food_id") REFERENCES "public"."food"("food_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");