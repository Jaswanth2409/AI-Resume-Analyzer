import axios from "axios";

const api = axios.create({
    baseURL: "https://ai-resume-analyzer-h25j.onrender.com"
});

export default api;
