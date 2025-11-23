import express from "express";
import cors from "cors";
import orderRoutes from "./api/orders.js";
import paymentRoutes from "./api/payment.js";
import servicesRoutes from "./api/services.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["https://famehikes.in", "https://www.famehikes.in", "http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);
app.use("/api/services", servicesRoutes);

app.get("/", (req, res) => {
  res.send("FameHikes backend is running ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log("RAZORPAY_KEY_ID exists?", process.env.RAZORPAY_KEY_ID ? "✅" : "❌");
