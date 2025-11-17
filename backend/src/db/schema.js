import {pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

// Create the first table on the postgresql database - Noen host
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
    ingridients: text("ingridients"),
    instructions: text("instructions"),
});

// test-of table for AI service