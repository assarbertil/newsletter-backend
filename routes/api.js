import { Router } from "express";
import { User } from "../models/user.js";

export const router = Router();

// Middleware that sets a found user to a response property
const getUser = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
};

// Endpoint to register a user
// *Requires a session cookie
router.post("/api/user", async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    isSubscribed: req.body.subscribe,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a user by id
// *Requires a session cookie
router.get("/api/user/:id", getUser, (req, res) => {
  res.json(res.user);
});

// Delete user by id
// Can only be done by admin interface
router.delete("/api/user/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a user
// *Requires a session cookie
router.patch("/api/user/:id", getUser, async (req, res) => {
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.subscribe != null) {
    res.user.isSubscribed = req.body.subscribe;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all registered users
router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
