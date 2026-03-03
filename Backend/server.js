import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import contactRoutes from "./routes/ContactRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("Tribaki Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));