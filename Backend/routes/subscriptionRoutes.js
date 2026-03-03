import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { name, email } = req.body;

  const query =
    "INSERT INTO weekly_subscription (name_, email) VALUES (?, ?)";

  db.query(query, [name, email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({
      message: "Subscription successful",
      id: result.insertId,
    });
  });
});

export default router;