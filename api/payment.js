import express from "express";
import Razorpay from "razorpay";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: "YOUR_RAZORPAY_KEY_ID",      // replace with your key_id
  key_secret: "YOUR_RAZORPAY_SECRET",  // replace with your key_secret
});

app.post("/api/create-order", async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // Razorpay uses paise
    currency: "INR",
    receipt: "receipt_order_" + Math.random(),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating order");
  }
});

app.listen(5001, () => console.log("✅ Razorpay backend running on port 5001"));
