import axios from "axios";

const mealdbURL = import.meta.env.VITE_MEALDB_URL;

if (!mealdbURL) throw new Error("VITE_MEALDB_URL is not set. Copy .env.example to .env.");

export const mealdb = axios.create({ baseURL: mealdbURL });
