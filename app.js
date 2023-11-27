import users from "./data/users.js";
import configRoutes from "./routes/index.js";
import express from "express";
import session from "express-session";
import cors from "cors";
// Express server instance
const app = express();

const PORT = process.env.EXPRESS_PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(
  session({
    name: "AuthCookie",
    secret: "47522568807b1e83bcd0b67c206b1f59d5530fd6",
    resave: false,
    saveUninitialized: true,
    maxAge: 60000,
  })
);

// Router setup
configRoutes(app);

// Server instanstiation
app.listen(PORT, () => {
  console.log("Server is listening on port 3000");
});
