import axios from "axios";

// Read the base URL from .env
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to set or remove the Authorization header
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

// Optional: Automatically set token from localStorage on app start
const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
}

export default API;
