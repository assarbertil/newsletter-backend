import "dotenv/config";
import chalk from "chalk";
import express from "express";
import { resolve } from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", err => console.error(err));
db.once("open", () => chalk.greenBright("Connected to MongoDB"));

import { router as mainRouter } from "./routes/admin.js";
import { router as authApiRouter } from "./routes/authApi.js";
import { router as userApiRouter } from "./routes/userApi.js";

const port = 5678;
const dirname = resolve("."); // Current directory
const app = express(); // Create express instance

app.set("view engine", "pug"); // Template engine
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data
app.use(express.json());
app.use(cookieParser());
app.use(express.static(dirname + "/public")); // Static folder

// Routers
app.use(mainRouter);
app.use(authApiRouter);
app.use(userApiRouter);

// Make server available on port
app.listen(port, () =>
  console.log(chalk.blueBright(`Server is running on http://localhost:${port}`))
);
