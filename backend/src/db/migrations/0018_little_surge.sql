ALTER TABLE "users" DROP CONSTRAINT "users_clerk_user_id_unique";--> statement-breakpoint
ALTER TABLE "ai_chat_messages" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "ai_chat_sessions" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "ai_suggestions" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "consumption_log" DROP COLUMN "consumed_at";--> statement-breakpoint
ALTER TABLE "diet_plan" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "diet_preferences" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "fitbit" DROP COLUMN "last_synced_at";--> statement-breakpoint
ALTER TABLE "food" DROP COLUMN "brand";--> statement-breakpoint
ALTER TABLE "food" DROP COLUMN "barcode";--> statement-breakpoint
ALTER TABLE "food" DROP COLUMN "last_updated";--> statement-breakpoint
ALTER TABLE "food" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "recipe" DROP COLUMN "instructions";--> statement-breakpoint
ALTER TABLE "recipe" DROP COLUMN "created_by";--> statement-breakpoint
ALTER TABLE "recipe" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "target_adjustments" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "clerk_user_id";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "created_at";