// Initialize dotenv, to use .env file settings
import dotenv from "dotenv";
dotenv.config();

export const mongoConfig = {
  serverUrl: process.env.MONGODB_URL,
  database: process.env.MONGODB_DATABASE,
};
