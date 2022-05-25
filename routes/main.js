import { Router } from "express";
import { User } from "../models/user.js";

export const router = Router();

router.get("/", (req, res) => res.render("index", { title: "Home" }));

router.get("/users", (req, res) =>
  res.render("users", { title: "Users", users })
);

router.get("/register", (req, res) =>
  res.render("register", { title: "Create a user", users })
);

router.get("/success", (req, res) =>
  res.render("message", { title: "Success", msg: "User registered!" })
);
