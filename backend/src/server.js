import express from "express";
import {ENV} from "./config/env.js";

import {db} from  "./config/db.js";
import { diet_testTable, favoritesTable, userTable, diet_plan } from "./db/schema.js";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

import job from "./config/cron.js";

// the dotenv will ensure that the listening port will be 5001 from the env file.
// import "dotenv/config"

const app = express()
const PORT = ENV.PORT || 5001;

// for production application this job can be delete.
if (ENV.NODE_ENV === "production") job.start();

app.use(express.json())


app.get("/api/health", (req,res) => {
    res.status(200).json({success:true});
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
        const { diet_title, time_diet, time_meal, calories, protein, carbs, fat, ingridients, instructions} = req.body;

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

app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT)
});

app.get("/api/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const users = await db
      .select()
      .from(userTable)
      .where(eq(userTable.user_id, userId));

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(users[0]);
  } catch (error) {
    console.log("Error fetching user", error);
    res
      .status(500)
      .json({ error: "Something went wrong while fetching the user" });
  }
});

//Get all users
//Helpful for testing that data is being saved correctly.
//URL: GET /api/users
app.get("/api/users", async (req, res) => {
  try {
    const allUsers = await db.select().from(userTable);
    res.status(200).json(allUsers);
  } catch (error) {
    console.log("Error fetching users", error);
    res
      .status(500)
      .json({ error: "Something went wrong while fetching users" });
  }
});

app.delete("/api/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Delete from users table where user_id matches
    await db
      .delete(userTable)
      .where(eq(userTable.user_id, userId));
    res.status(200).json({ message: "User removed successfully" });
  } catch (error) {
    console.log("Error removing user", error);
    res.status(500).json({ error: "Something went wrong while removing the user" });
  }
});

app.post("/api/diet-plans", async (req, res) => {
  try {
    const { user_id, start_date, end_date, goal_type } = req.body;

    // user_id and start_date are NOT NULL in the DB, so we enforce them here
    if (!user_id || !start_date) {
      return res.status(400).json({
        error: "Missing required fields: user_id and start_date",
      });
    }

    // Insert new plan into diet_plan table
    const [newPlan] = await db
      .insert(dietPlan)
      .values({
        user_id,
        start_date, // send as "YYYY-MM-DD" string; Drizzle maps to date
        end_date,
        goal_type,
      })
      .returning();

    res.status(201).json(newPlan);
  } catch (error) {
    console.log("Error creating diet plan", error);
    res
      .status(500)
      .json({ error: "Something went wrong while creating the diet plan" });
  }
});

//Get all diet plans for a specific user
app.get("/api/diet-plans/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const plans = await db
      .select()
      .from(dietPlan)
      .where(eq(dietPlan.user_id, userId));

    res.status(200).json(plans);
  } catch (error) {
    console.log("Error fetching diet plans", error);
    res
      .status(500)
      .json({ error: "Something went wrong while fetching diet plans" });
  }
});
app.delete("/api/diet-plans/:userId/:planId", async (req, res) => {
  try {
    const { userId, planId } = req.params;

    // Delete from diet_plan where BOTH user_id and plan_id match
    await db
      .delete(dietPlan)
      .where(
        and(
          eq(dietPlan.user_id, userId),
          eq(dietPlan.plan_id, planId)
        )
      );

    res.status(200).json({ message: "Diet plan removed successfully" });
  } catch (error) {
    console.log("Error removing diet plan", error);
    res.status(500).json({ error: "Something went wrong while removing the diet plan" });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT)
});