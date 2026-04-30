import express from "express";
import {ENV} from "./config/env.js";

import {db} from  "./config/db.js";
import { diet_testTable, favoritesTable } from "./db/schema.js";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

import job from "./config/cron.js";
import cors from "cors";
// the dotenv will ensure that the listening port will be 5001 from the env file.
// import "dotenv/config"

const app = express()
const PORT = ENV.PORT || 5001;

// for production application this job can be delete.
if (ENV.NODE_ENV === "production") job.start();

app.use(express.json())

// ✅ Enable CORS for your frontend origin (Expo web)
app.use(
  cors({
    origin: "http://localhost:8081",  // Expo web origin
  })
);



// This is a import for the Fitbit API
import fitbitRoutes from "../fitbit/router.js"

app.use("/fitbit", fitbitRoutes);


app.get("/api/health", (req,res) => {
    res.status(200).json("this is the API from the backend");
});

// Creating endpoint
app.post("/api/favorites", async (req,res) => {
    try {
        const { userId, recipeId, title, image, cookTime, servings} = req.body;

        if (!userId || !recipeId || !title){
            return res.status(400).json({ error: "Missing required fields - this is wrongs"});
        }

        const newFavorite = await db
            .insert(favoritesTable)
            .values({
                userId,
                recipeId,
                title,
                image,
                cookTime,
                servings,
            }).returning();
            
            res.status(201).json(newFavorite[0]);

    }catch (error) {
            console.log("Error adding favorite", error);
            res.status(500).json({ error: "Something went wrong"});
        
    }
});

// get the favorite item by using the userId as a search parameter
app.get("/api/favorites/:userId", async (req,res) => {
    try {

        const { userId } = req.params;

        const userFavorites = await db
            .select()
            .from(favoritesTable)
            .where(eq(favoritesTable.userId, userId));
        
        res.status(200).json(userFavorites);
    } catch (error) {

        console.log("Error fetching the favorite", error);
        res.status(500).json({ error: "Something went wrong"});
        
    }
});


// this command will only work once the drizzle-orm is import with the {and} function
// detele a entry using the userId and recipeId
app.delete("/api/favorites/:userId/:recipeId", async (req, res) => {
    try {
        const { userId, recipeId } = req.params;

        await db

            .delete(favoritesTable)
            .where(
                and(eq(favoritesTable.userId, userId), eq(favoritesTable.recipeId, parseInt(recipeId)))
            );

        res.status(200).json({ message: "Favorite removed successfully"});

    } catch (error) {
        console.log("Error removing a favorite", error);
        res.status(500).json({ error: "Something went wrong"});
    }

});


// Creating API test for the diet_testTABLE
// export const diet_testTable = pgTable("diet_test", {

//     id: serial("id").primaryKey(),
//     diet_title: text("diet_title").notNull(),
//     time_diet: text("time_diet").notNull(),
//     time_meal: text("time_meal").notNull(),
//     calories: integer("calories").notNull(),
//     protein: integer("protein").notNull(),
//     carbs: integer("carbs").notNull(),
//     fat: integer("fat").notNull,
//     ingridients: text("ingridients"),
//     instructions: text("instructions"),
// });

app.post("/api/diets", async (req,res) => {
    try {
        const { diet_title, time_diet, time_meal, calories, protein, carbs, fat, ingredients, instructions} = req.body;

        // if (!diet_title || !calories){
        //     return res.status(400).json({ error: "Missing required fields - this is wrongs"});
        // }

        const newDiet = await db
            .insert(diet_testTable)
            .values({
                diet_title,
                time_diet,
                time_meal,
                calories,
                protein,
                carbs,
                fat,
                ingredients,
                instructions,
            }).returning();
            
            res.status(201).json(newDiet[0]);

    }catch (error) {
            console.log("Error adding diet information", error);
            res.status(500).json({ error: "The register could not be store on the database."});
        
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server is running on PORT:", PORT)
});