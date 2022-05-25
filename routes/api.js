import { Router } from "express";
export const router = Router();

router.post("/api/user/:userId", (req, res) => {
  // Endpoint to register a user
  // req.body.email
  // req.body.password
  // req.body.subscribe
});

router.get("/api/user/:userId", (req, res) => {
  // Get a users own info if they send a permitted session cookie
});
