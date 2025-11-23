import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Get services from admin backend
router.get("/", async (req, res) => {
  try {
    const adminBackendUrl = process.env.ADMIN_BACKEND_URL || "http://localhost:5001";
    
    // Try to fetch from admin backend
    try {
      const response = await axios.get(`${adminBackendUrl}/api/services`, {
        timeout: 5000
      });
      
      if (response.data && response.data.success) {
        // Filter only active services
        const activeServices = response.data.services.filter(s => s.isActive !== false);
        return res.json({
          success: true,
          services: activeServices
        });
      }
    } catch (adminError) {
      console.warn("⚠️ Admin backend not available, returning default services:", adminError.message);
    }
    
    // Fallback to default services if admin backend is not available
    const defaultServices = [
      {
        id: "1",
        name: "YouTube Subscribers",
        serviceId: "3001",
        price: 150,
        category: "YouTube",
        description: "Boost your channel's growth with genuine subscribers.",
        isActive: true
      },
      {
        id: "2",
        name: "YouTube Views",
        serviceId: "3001",
        price: 150,
        category: "YouTube",
        description: "Get real views to increase engagement and visibility.",
        isActive: true
      },
      {
        id: "3",
        name: "YouTube Likes",
        serviceId: "3002",
        price: 120,
        category: "YouTube",
        description: "Enhance your videos' credibility with authentic likes.",
        isActive: true
      },
      {
        id: "4",
        name: "Instagram Likes",
        serviceId: "2009",
        price: 80,
        category: "Instagram",
        description: "Increase the reach of your posts with high-quality likes.",
        isActive: true
      },
      {
        id: "5",
        name: "Instagram Views",
        serviceId: "2009",
        price: 80,
        category: "Instagram",
        description: "Get more visibility on your reels and stories.",
        isActive: true
      },
      {
        id: "6",
        name: "Instagram Followers",
        serviceId: "2010",
        price: 100,
        category: "Instagram",
        description: "Gain authentic followers to build your online presence.",
        isActive: true
      }
    ];
    
    res.json({
      success: true,
      services: defaultServices
    });
  } catch (error) {
    console.error("❌ Error fetching services:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch services: " + (error.message || "Unknown error")
    });
  }
});

export default router;
