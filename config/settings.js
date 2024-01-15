// Initialize dotenv, to use .env file settings
import dotenv from "dotenv";
dotenv.config();

export const mongoConfig = {
  serverUrl: process.env.MONGODB_PROD_URL || "mongodb://localhost:27017/",
  database: process.env.MONGO_DB_NAME || "CS545_Save_Saviour",
};
