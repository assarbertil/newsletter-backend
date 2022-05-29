import { Router } from "express";
import { User } from "../models/user.js";
import * as argon2 from "argon2";
import { createAccessToken } from "../lib/jwt.js";

export const router = Router();

// Endpoint to register a user
// *Requires a session cookie
router.post("/api/login", async (req, res) => {
  // First find a user with the email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Then check if the password hashes match
  const valid = await argon2.verify(user.password, req.body.password);
  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // If all is good, sign a reshresh token and an access token and send it back

  // Refresh token
  res.cookie("jid", createAccessToken(user._id), { httpOnly: true });

  // Access token
  res.json({
    message: "Logged in",
    accessToken: createAccessToken(user._id),
    user: {
      _id: user._id,
      email: user.email,
      isSubscribed: user.isSubscribed,
    },
  });
});

// Endpoint to register a user
// *Requires a session cookie
router.post("/api/register", async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: await argon2.hash(req.body.password),
    isSubscribed: req.body.isSubscribed,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
