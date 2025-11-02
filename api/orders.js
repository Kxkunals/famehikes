// api/orders.js
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const AIRSMM_API_KEY = "aaf2622f32caa10fa7f7366060919e48"; // replace this with your real key
const AIRSMM_API_URL = "https://airsmm.com/api/v2";

// ✅ Root route to test if server is running
app.get("/", (req, res) => {
  res.send("✅ AirSMM Proxy API is running properly!");
});

// ✅ Fetch services
app.get("/api/services", async (req, res) => {
  try {
    const response = await axios.post(AIRSMM_API_URL, {
      key: AIRSMM_API_KEY,
      action: "services",
    });
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error fetching services:", error.message);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

// ✅ Place an order
app.post("/api/order", async (req, res) => {
  const { service, link, quantity } = req.body;
  if (!service || !link || !quantity) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const response = await axios.post(AIRSMM_API_URL, {
      key: AIRSMM_API_KEY,
      action: "add",
      service,
      link,
      quantity,
    });
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error placing order:", error.message);
    res.status(500).json({ error: "Failed to create order" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ AirSMM Proxy running on port ${PORT}`));
