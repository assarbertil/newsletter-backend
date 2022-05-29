import { Router } from "express";
import { User } from "../models/user.js";

export const router = Router();

// Password protected admin page
router.get("/admin", async (req, res) => {
  const reject = () => {
    res.setHeader("www-authenticate", "Basic");
    res.sendStatus(401);
  };

  const authorization = req.headers.authorization;

  if (!authorization) {
    return reject();
  }

  const [username, password] = Buffer.from(
    authorization.replace("Basic ", ""),
    "base64"
  )
    .toString()
    .split(":");

  if (!(username === "admin" && password === "admin")) {
    return reject();
  }

  res.render("admin", { title: "Admin", users: await User.find() });
});
