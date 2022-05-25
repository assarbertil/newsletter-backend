import { Router } from "express";
export const router = Router();

let users = [
  {
    id: 1,
    email: "assar.classon@gmail.com",
  },
  {
    id: 2,
    email: "assar.classon2@gmail.com",
  },
];

router.get("/users", (req, res) =>
  res.render("users", { title: "Users", users })
);

router.get("/register", (req, res) =>
  res.render("register", { title: "Create a user", users })
);

router.get("/success", (req, res) =>
  res.render("message", { title: "succes", msg: "User registered!" })
);
