import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Safe initialization
try {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error("Root element not found");
  }

  const root = ReactDOM.createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} catch (error) {
  console.error("Failed to initialize app:", error);
  // Fallback UI
  document.body.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: Arial; text-align: center; padding: 20px;">
      <div>
        <h1 style="color: #FF6B35; margin-bottom: 20px;">FameHikes</h1>
        <p style="color: #666; margin-bottom: 20px;">Something went wrong. Please refresh the page.</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; background: #FF6B35; color: white; border: none; border-radius: 5px; cursor: pointer;">
          Refresh Page
        </button>
      </div>
    </div>
  `;
}