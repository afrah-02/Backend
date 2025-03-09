import express from "express";
import Recipe from "../models/recipesModel.js";

const router = express.Router();

// Create a new recipe
router.post("/", async (req, res) => {
    try {
        const { title, ingredients, instructions } = req.body;
        const newRecipe = new Recipe({ title, ingredients, instructions });
        await newRecipe.save();
        res.status(201).json({ message: "Recipe added successfully", recipe: newRecipe });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all recipes
router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;