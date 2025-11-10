import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import orderRoutes from "./api/orders.js";
import paymentRoutes from "./api/payment.js";

dotenv.config();

const app = express();

// ✅ CORS setup: allow both local dev and production frontend
app.use(cors({
  origin: [
    "https://famehikes.in",      // production Vercel domain
    "http://localhost:5173",     // local development
  ],
  methods: ["GET", "POST"],
  credentials: true,
}));

// Middleware
app.use(express.json());

// ✅ API Routes
app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("FameHikes backend is running ✅");
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));