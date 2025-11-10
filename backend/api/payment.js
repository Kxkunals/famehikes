import express from "express";

const router = express.Router();

// POST /api/payment/verify
router.post("/payment/verify", async (req, res) => {
  try {
    // 🔹 Add your payment verification logic here (e.g., Razorpay signature check)
    res.status(200).json({ success: true, message: "Payment verified successfully ✅" });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ success: false, message: "Payment verification failed ❌" });
  }
});

export default router;

