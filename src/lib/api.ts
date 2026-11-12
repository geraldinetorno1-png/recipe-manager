import axios from "axios";

// Two base URLs, two instances. Neither one carries a credential.
const mealdbURL = import.meta.env.VITE_MEALDB_URL;
const apiURL = import.meta.env.VITE_API_URL;

if (!mealdbURL) throw new Error("VITE_MEALDB_URL is not set. Copy .env.example to .env.");
if (!apiURL) throw new Error("VITE_API_URL is not set. Copy .env.example to .env.");

export const mealdb = axios.create({ baseURL: mealdbURL });
export const api = axios.create({ baseURL: apiURL });
