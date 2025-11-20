CREATE TABLE "ai_chat_messages" (
	"message_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"sender" text NOT NULL,
	"tokens" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ai_chat_sessions" (
	"session_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"purpose" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ai_suggestions" (
	"suggestion_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"message_id" uuid NOT NULL,
	"recipe_id" uuid,
	"food_id" uuid,
	"plan_id" uuid,
	"meal_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "consumption_log" (
	"consumption_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"meal_id" uuid,
	"recipe_id" uuid,
	"food_id" uuid,
	"quantity" numeric NOT NULL,
	"unit" text NOT NULL,
	"consumed_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "meal" (
	"meal_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"plan_id" uuid NOT NULL,
	"meal_date" date NOT NULL,
	"meal_slot" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "meal_item" (
	"item_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"meal_id" uuid NOT NULL,
	"recipe_id" uuid,
	"food_id" uuid,
	"quantity" numeric NOT NULL,
	"unit" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "target_adjustments" (
	"adjustment_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"calories" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_targets" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"daily_calories_kcal" integer NOT NULL,
	"daily_protein_g" integer NOT NULL,
	"daily_fat_g" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ai_chat_messages" ADD CONSTRAINT "ai_chat_messages_session_id_ai_chat_sessions_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."ai_chat_sessions"("session_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_chat_sessions" ADD CONSTRAINT "ai_chat_sessions_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_suggestions" ADD CONSTRAINT "ai_suggestions_message_id_ai_chat_messages_message_id_fk" FOREIGN KEY ("message_id") REFERENCES "public"."ai_chat_messages"("message_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_suggestions" ADD CONSTRAINT "ai_suggestions_recipe_id_recipe_recipe_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe"("recipe_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_suggestions" ADD CONSTRAINT "ai_suggestions_food_id_food_food_id_fk" FOREIGN KEY ("food_id") REFERENCES "public"."food"("food_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_suggestions" ADD CONSTRAINT "ai_suggestions_plan_id_diet_plan_plan_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."diet_plan"("plan_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_suggestions" ADD CONSTRAINT "ai_suggestions_meal_id_meal_meal_id_fk" FOREIGN KEY ("meal_id") REFERENCES "public"."meal"("meal_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consumption_log" ADD CONSTRAINT "consumption_log_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consumption_log" ADD CONSTRAINT "consumption_log_meal_id_meal_meal_id_fk" FOREIGN KEY ("meal_id") REFERENCES "public"."meal"("meal_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consumption_log" ADD CONSTRAINT "consumption_log_recipe_id_recipe_recipe_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe"("recipe_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consumption_log" ADD CONSTRAINT "consumption_log_food_id_food_food_id_fk" FOREIGN KEY ("food_id") REFERENCES "public"."food"("food_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meal" ADD CONSTRAINT "meal_plan_id_diet_plan_plan_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."diet_plan"("plan_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meal_item" ADD CONSTRAINT "meal_item_meal_id_meal_meal_id_fk" FOREIGN KEY ("meal_id") REFERENCES "public"."meal"("meal_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meal_item" ADD CONSTRAINT "meal_item_recipe_id_recipe_recipe_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe"("recipe_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meal_item" ADD CONSTRAINT "meal_item_food_id_food_food_id_fk" FOREIGN KEY ("food_id") REFERENCES "public"."food"("food_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "target_adjustments" ADD CONSTRAINT "target_adjustments_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_targets" ADD CONSTRAINT "user_targets_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;