import configRoutes from "./routes/index.js";
import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import { checkSession } from "./middleware.js";

dotenv.config();

// Express server instance
const app = express();

const PORT = 3000;

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    resave: false,
    name: "AuthCookie",
    secret: process.env.EXPRESS_SESSION_SECRET,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 },
  })
);
// app.use(checkSession);

// Router setup
configRoutes(app);

// Server instanstiation
app.listen(PORT, () => {
  console.log("Server is listening on port 3000");
});
