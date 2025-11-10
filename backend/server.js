import express from "express";
import cors from "cors";
import orderRoutes from "./api/orders.js";
import paymentRoutes from "./api/payment.js";

const app = express();

app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
