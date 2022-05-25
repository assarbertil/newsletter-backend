import chalk from "chalk";
import express from "express";
import { resolve } from "path";

import { router as indexRouter } from "./routes/index.js";
import { router as usersRouter } from "./routes/users.js";
import { router as apiRouter } from "./routes/api.js";

const port = 3000;
const dirname = resolve("."); // Current directory
const app = express(); // Create express instance

app.set("view engine", "pug"); // Template engine
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data
app.use(express.static(dirname + "/public")); // Static folder

// Routers
app.use(indexRouter);
app.use(usersRouter);
app.use(apiRouter);

// Make server available on port
app.listen(port, () => {
  console.log(
    chalk.blueBright(`Server is running on http://localhost:${port}`)
  );
});
