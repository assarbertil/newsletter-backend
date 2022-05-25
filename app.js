import "dotenv/config";
import chalk from "chalk";
import express from "express";
import { resolve } from "path";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", err => console.error(err));
db.once("open", () => chalk.greenBright("Connected to MongoDB"));

import { router as mainRouter } from "./routes/admin.js";
import { router as apiRouter } from "./routes/api.js";

const port = 3000;
const dirname = resolve("."); // Current directory
const app = express(); // Create express instance

app.set("view engine", "pug"); // Template engine
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data
app.use(express.static(dirname + "/public")); // Static folder
app.use(express.json());

// Routers
app.use(mainRouter);
app.use(apiRouter);

// Make server available on port
app.listen(port, () =>
  console.log(chalk.blueBright(`Server is running on http://localhost:${port}`))
);
