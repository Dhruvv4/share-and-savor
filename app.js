import configRoutes from "./routes/index.js";
import express from "express";
import session from "express-session";
import cors from "cors";
import "dotenv/config.js";
import bodyParser from "body-parser";
import { logRequest } from "./middleware.js";

import { users as usersRef } from "./config/mongoCollections.js";

// Express server instance
const app = express();

const PORT = process.env.EXPRESS_PORT;
// Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://share-and-savor-client.vercel.app",
    ],
    credentials: true,
    allowedHeaders: "*",
    preflightContinue: true,
    methods: "*",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    resave: false,
    name: "AuthCookie",
    secret: process.env.EXPRESS_SESSION_SECRET,
    saveUninitialized: false,
    cookie: { maxAge: +process.env.EXPRESS_SESSION_TIMEOUT },
  })
);
app.use(logRequest);

app.get("/", async (req, res) => {
  res.json({ message: "Welcome to Share and Savor API." });
});

// Router setup
configRoutes(app);

// Server instanstiation
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
