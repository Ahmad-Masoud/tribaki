import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { name, email, messages } = req.body;

  const query =
    "INSERT INTO contact_us (name_, email, messages) VALUES (?, ?, ?)";

  db.query(query, [name, email, messages], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({
      message: "Message sent successfully",
      id: result.insertId,
    });
  });
});

export default router;