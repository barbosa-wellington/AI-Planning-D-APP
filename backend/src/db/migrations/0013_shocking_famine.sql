CREATE TABLE "diet_test" (
	"id" serial PRIMARY KEY NOT NULL,
	"time_diet" text NOT NULL,
	"time_meal" text NOT NULL,
	"calories" integer NOT NULL,
	"protein" integer NOT NULL,
	"carbs" integer NOT NULL,
	"fat" integer NOT NULL,
	"ingridients" text,
	"instructions" text
);
