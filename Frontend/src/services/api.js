import axios from "axios";

// Set VITE_API_BASE_URL in Vercel Production environment variables.
// Keep the existing Render endpoint as a fallback for older deployments.
const baseURL = (import.meta.env.VITE_API_BASE_URL || "https://ai-resume-analyzer-h25j.onrender.com").replace(/\/+$/, "");

const api = axios.create({
  baseURL,
  timeout: 120000,
});

export default api;
