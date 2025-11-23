import express from "express";
import crypto from "crypto";
import axios from "axios";
import dotenv from "dotenv";
import { URLSearchParams } from "url";
import { notifyDeveloper } from "../utils/notifier.js";

dotenv.config();
const router = express.Router();

// POST /api/payment/verify
router.post("/payment/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      link,
      quantity,
      serviceId,
      serviceName,
      amount
    } = req.body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment verification details"
      });
    }

    const trimmedLink = typeof link === "string" ? link.trim() : "";
    const normalizedQuantity = Number(quantity);

    if (!trimmedLink || !Number.isFinite(normalizedQuantity) || normalizedQuantity <= 0 || !serviceId) {
      return res.status(400).json({
        success: false,
        message: "Missing or invalid order details (link, quantity, serviceId)"
      });
    }

    // Verify Razorpay signature
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!razorpayKeySecret) {
      console.error("❌ RAZORPAY_KEY_SECRET not found in environment variables");
      return res.status(500).json({
        success: false,
        message: "Server configuration error"
      });
    }

    // Generate expected signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", razorpayKeySecret)
      .update(text)
      .digest("hex");

    // Compare signatures
    if (expectedSignature !== razorpay_signature) {
      console.error("❌ Payment signature verification failed");
      return res.status(400).json({
        success: false,
        message: "Payment verification failed: Invalid signature"
      });
    }

    console.log("✅ Payment signature verified successfully");

    const summary = {
      paymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      link: trimmedLink,
      quantity: normalizedQuantity,
      serviceId,
      serviceName: serviceName || "Unknown",
      amount: amount ? Number(amount) : null,
    };

    // Only deliver service if payment is verified
    try {
      // Call SMM Panel API to deliver the service
      const smmPanelApiKey = process.env.SMM_PANEL_API_KEY;
      const smmPanelApiUrl = process.env.SMM_PANEL_API_URL;

      if (!smmPanelApiUrl || !smmPanelApiKey) {
        console.warn("⚠️ SMM Panel API credentials not configured. Skipping service delivery.");
        await notifyDeveloper("SERVICE_DELIVERY_SKIPPED", {
          ...summary,
          reason: "Missing SMM_PANEL_API credentials",
        });
        // Still return success since payment is verified
        return res.status(200).json({
          success: true,
          message: "Payment verified successfully ✅ (Service delivery skipped - API not configured)",
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id
        });
      }

      // Prepare SMM Panel API request
      const smmPanelPayload = new URLSearchParams();
      smmPanelPayload.append("key", smmPanelApiKey);
      smmPanelPayload.append("action", "add");
      smmPanelPayload.append("service", serviceId);
      smmPanelPayload.append("link", trimmedLink);
      smmPanelPayload.append("quantity", normalizedQuantity.toString());

      console.log("📤 Calling SMM Panel API to deliver service...");
      const smmResponse = await axios.post(smmPanelApiUrl, smmPanelPayload, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        timeout: 10000 // 10 second timeout
      });

      console.log("✅ SMM Panel API response:", smmResponse.data);

      // Check if SMM panel accepted the order
      if (smmResponse.data && (smmResponse.data.order || smmResponse.data.status === "success" || smmResponse.data.error === false)) {
        const smmOrderId = smmResponse.data.order || smmResponse.data.order_id || null;
        
        // Save transaction to admin backend
        try {
          const adminBackendUrl = process.env.ADMIN_BACKEND_URL || "http://localhost:5001";
          await axios.post(`${adminBackendUrl}/api/transactions`, {
            paymentId: razorpay_payment_id,
            razorpayOrderId: razorpay_order_id,
            smmOrderId,
            link: trimmedLink,
            quantity: normalizedQuantity,
            serviceId,
            serviceName: serviceName || "Unknown",
            amount: amount ? Number(amount) : null,
            status: "success",
            timestamp: new Date().toISOString()
          }, { timeout: 5000 }).catch(err => {
            console.warn("⚠️ Failed to save transaction to admin backend:", err.message);
          });
        } catch (err) {
          console.warn("⚠️ Admin backend not available:", err.message);
        }
        
        await notifyDeveloper("SERVICE_DELIVERED", {
          ...summary,
          smmOrderId,
          smmResponse: smmResponse.data
        });
        return res.status(200).json({
          success: true,
          message: "Payment verified and service delivered successfully ✅",
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          smmOrderId
        });
      } else {
        // Payment verified but service delivery failed
        console.error("❌ SMM Panel API returned error:", smmResponse.data);
        
        // Save failed transaction to admin backend
        try {
          const adminBackendUrl = process.env.ADMIN_BACKEND_URL || "http://localhost:5001";
          await axios.post(`${adminBackendUrl}/api/transactions`, {
            paymentId: razorpay_payment_id,
            razorpayOrderId: razorpay_order_id,
            link: trimmedLink,
            quantity: normalizedQuantity,
            serviceId,
            serviceName: serviceName || "Unknown",
            amount: amount ? Number(amount) : null,
            status: "failed",
            reason: "SMM panel rejected request",
            timestamp: new Date().toISOString()
          }, { timeout: 5000 }).catch(err => {
            console.warn("⚠️ Failed to save transaction to admin backend:", err.message);
          });
        } catch (err) {
          console.warn("⚠️ Admin backend not available:", err.message);
        }
        
        await notifyDeveloper("SERVICE_DELIVERY_FAILED", {
          ...summary,
          smmResponse: smmResponse.data || null,
          reason: "SMM panel rejected request"
        });
        return res.status(200).json({
          success: true,
          message: "Payment verified ✅ but service delivery failed. Please contact support.",
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          warning: "Service delivery failed"
        });
      }

    } catch (smmError) {
      // Payment is verified but SMM API call failed
      console.error("❌ Error calling SMM Panel API:", smmError.message);
      
      // Save failed transaction to admin backend
      try {
        const adminBackendUrl = process.env.ADMIN_BACKEND_URL || "http://localhost:5001";
        await axios.post(`${adminBackendUrl}/api/transactions`, {
          paymentId: razorpay_payment_id,
          razorpayOrderId: razorpay_order_id,
          link: trimmedLink,
          quantity: normalizedQuantity,
          serviceId,
          serviceName: serviceName || "Unknown",
          amount: amount ? Number(amount) : null,
          status: "failed",
          reason: smmError.message || "Unknown error",
          timestamp: new Date().toISOString()
        }, { timeout: 5000 }).catch(err => {
          console.warn("⚠️ Failed to save transaction to admin backend:", err.message);
        });
      } catch (err) {
        console.warn("⚠️ Admin backend not available:", err.message);
      }
      
      await notifyDeveloper("SERVICE_DELIVERY_FAILED", {
        ...summary,
        reason: smmError.message || "Unknown error",
      });
      return res.status(200).json({
        success: true,
        message: "Payment verified ✅ but service delivery failed. Please contact support with Payment ID.",
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        warning: "Service delivery failed - " + (smmError.message || "Unknown error")
      });
    }

  } catch (error) {
    console.error("❌ Payment verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed: " + (error.message || "Unknown error")
    });
  }
});

export default router;

