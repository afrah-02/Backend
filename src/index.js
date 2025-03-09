import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/user.js";
import  recipesRouter  from "./routes/recipesRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect("mongodb+srv://demomongo123:demomongo123@cluster0.bwegp.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB connected...");
}).catch((error) => {
    console.error("DB connection error:", error);
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});