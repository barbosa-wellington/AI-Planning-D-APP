import {pgTable, uuid, serial, text, integer, boolean, timestamp, date, doublePrecision, numeric, jsonb,} from "drizzle-orm/pg-core";

// Create the first table on the postgresql database - Neon host
export const favoritesTable = pgTable("favorites", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    recipeId: integer("recipe_id").notNull(),
    title:text("title").notNull(),
    image: text("image"),
    cookTime:text("cook_time"),
    servings:text("servings"),
    createdAt: timestamp("created_at").defaultNow(),
});

// test-of table for AI service
export const diet_testTable = pgTable("diet_test", {

    id: serial("id").primaryKey(),
    diet_title: text("diet_title").notNull(),
    time_diet: text("time_diet").notNull(),
    time_meal: text("time_meal").notNull(),
    calories: integer("calories").notNull(),
    protein: integer("protein").notNull(),
    carbs: integer("carbs").notNull(),
    fat: integer("fat").notNull(),
    ingredients: text("ingridients"),
    instructions: text("instructions"),
});

//Test-of table for USER TABLE
export const userTable = pgTable("users",{
user_id: uuid("user_id").defaultRandom().primaryKey(),
name: text("name").notNull(),
email: text("email").unique().notNull(),
});

//Test-of table for FITBIT TABLE
export const fitbitTable = pgTable("fitbit", {
fitness_id: uuid("fitness_id").defaultRandom().primaryKey(),
user_id: uuid("user_id").references(() => userTable.user_id).notNull(),
date: date("date").notNull(),
steps: integer("steps").notNull(),
heart_rate_avg: doublePrecision("heart_rate_avg").notNull(),
sleep_hours: doublePrecision("sleep_hours").notNull(),
calories_burned: doublePrecision("calories_burned").notNull(),
source: text("source").notNull(),  // "fitbit" | "manual"
});

//Test-of table for DIET PREFERENCES TABLE
export const dietPreferences = pgTable("diet_preferences", {
preference_id: uuid("preference_id").defaultRandom().primaryKey(),
user_id: uuid("user_id").references(() => userTable.user_id).notNull(),
type: text("type").notNull(),             // Vegan, Keto, etc.
description: text("description"),
});

//Test-of table for Food Category
export const foodCategory = pgTable("food_category", {
category_id: serial("category_id").primaryKey(),name: text("name").notNull(),// parent_id is optional (null for top-level categories)
parent_id: integer("parent_id").references(() => foodCategory.category_id),
});

//Test-of table for FOOD
export const food = pgTable("food", {
food_id: uuid("food_id").defaultRandom().primaryKey(),
name: text("name").notNull(),
external_id: text("external_id"),      // ID from external DB
source_api: text("source_api"),        // FoodDataCentral | FoodFacts | Dataset
calories_per_100g: numeric("calories_per_100g").notNull(),
protein_per_100g:  numeric("protein_per_100g").notNull(),
carbs_per_100g:    numeric("carbs_per_100g").notNull(),
fat_per_100g:      numeric("fat_per_100g").notNull(),
fiber_per_100g:    numeric("fiber_per_100g"),
sugar_per_100g:    numeric("sugar_per_100g"),
sodium_per_100g:   numeric("sodium_per_100g"),
category_id: integer("category_id").references(() => foodCategory.category_id).notNull(),
});

//Test-of table for RECIPE
export const recipe = pgTable("recipe", {
recipe_id: uuid("recipe_id").defaultRandom().primaryKey(),
name: text("name").notNull(),
description: text("description"),
prep_time_minutes: integer("prep_time_minutes"),
cook_time_minutes: integer("cook_time_minutes"),
servings: integer("servings"),
difficulty: text("difficulty"),          // Easy | Medium | Hard
image_url: text("image_url"),
});

//Test-of table for RECIPE INGREDIENT
export const recipeIngredient = pgTable("recipe_ingredient", {
recipe_ingredient_id: uuid("recipe_ingredient_id").defaultRandom().primaryKey(),
recipe_id: uuid("recipe_id").references(() => recipe.recipe_id).notNull(),
food_id: uuid("food_id").references(() => food.food_id).notNull(),
quantity: numeric("quantity").notNull(),
unit: text("unit").notNull(), // grams | cups | pieces | etc.
});

//Test-of table for DIET PLAN
export const dietPlan = pgTable("diet_plan", {
plan_id: uuid("plan_id").defaultRandom().primaryKey(),
user_id: uuid("user_id").references(() => userTable.user_id).notNull(),
start_date: date("start_date").notNull(),
end_date: date("end_date"),
goal_type: text("goal_type"), // weight_loss, maintenance, etc.
});

//Test-of table for MEAL
export const meal = pgTable("meal", {
meal_id: uuid("meal_id").defaultRandom().primaryKey(),
plan_id: uuid("plan_id").references(() => dietPlan.plan_id).notNull(),
meal_date: date("meal_date").notNull(),
meal_slot: text("meal_slot").notNull(), // breakfast | lunch | dinner | snack
});

//Test-of table for MEAL ITEM
export const mealItem = pgTable("meal_item", {
item_id: uuid("item_id").defaultRandom().primaryKey(),
meal_id: uuid("meal_id").references(() => meal.meal_id).notNull(),
recipe_id: uuid("recipe_id").references(() => recipe.recipe_id),
food_id: uuid("food_id").references(() => food.food_id),
quantity: numeric("quantity").notNull(),
unit: text("unit").notNull(),
});

//Test-of table for TARGET ADJUSTMENTS
export const targetAdjustments = pgTable("target_adjustments", {
adjustment_id: uuid("adjustment_id").defaultRandom().primaryKey(),
user_id: uuid("user_id").references(() => userTable.user_id).notNull(),
calories: integer("calories").notNull(), // change in daily calories
});

//Test-of table for CONSUMPTION LOG
export const consumptionLog = pgTable("consumption_log", {
consumption_id: uuid("consumption_id").defaultRandom().primaryKey(),
user_id: uuid("user_id").references(() => userTable.user_id).notNull(),
meal_id: uuid("meal_id").references(() => meal.meal_id),
recipe_id: uuid("recipe_id").references(() => recipe.recipe_id),
food_id: uuid("food_id").references(() => food.food_id),
quantity: numeric("quantity").notNull(),
unit: text("unit").notNull(),
});

//Test-of table for AI CHAT SESSIONS
export const aiChatSessions = pgTable("ai_chat_sessions", {
session_id: uuid("session_id").defaultRandom().primaryKey(),
user_id: uuid("user_id").references(() => userTable.user_id).notNull(),
purpose: text("purpose"), // e.g. "initial_plan", "adjustment", etc.
});

//Test-of table for AI CHAT MESSAGES
export const aiChatMessages = pgTable("ai_chat_messages", {
message_id: uuid("message_id").defaultRandom().primaryKey(),
session_id: uuid("session_id").references(() => aiChatSessions.session_id).notNull(),
sender: text("sender").notNull(), // "user" | "ai"
tokens: integer("tokens"),
});

//Test-of table for AI SUGGESTIONS
export const aiSuggestions = pgTable("ai_suggestions", {
suggestion_id: uuid("suggestion_id").defaultRandom().primaryKey(),
message_id: uuid("message_id").references(() => aiChatMessages.message_id).notNull(), // Optional links — only one or some may be filled for each suggestion
recipe_id: uuid("recipe_id").references(() => recipe.recipe_id),
food_id: uuid("food_id").references(() => food.food_id),
plan_id: uuid("plan_id").references(() => dietPlan.plan_id),
meal_id: uuid("meal_id").references(() => meal.meal_id),
});

//Test-of table for User Targets
 export const userTargets = pgTable("user_targets", {
  user_id: uuid("user_id").references(() => userTable.user_id).primaryKey(),
  daily_calories_kcal: integer("daily_calories_kcal").notNull(),
  daily_protein_g: integer("daily_protein_g").notNull(),
daily_fat_g: integer("daily_fat_g").notNull(),
});
