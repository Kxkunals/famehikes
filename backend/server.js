import express from "express";
import cors from "cors";
import orderRoutes from "./api/orders.js";
import paymentRoutes from "./api/payment.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["https://famehikes.in", "https://www.famehikes.in"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);

app.get("/", (req, res) => {
  res.send("FameHikes backend is running ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));