import users from "./data/users.js";
import configRoutes from "./routes/index.js";
import express from "express";
import session from "express-session";
import cors from "cors";
// Express server instance
const app = express();

const PORT = process.env.EXPRESS_PORT || 3000;

import session from "express-session";

app.use(
  session({
    name: "AuthCookie",
    secret: "some secret string!",
    resave: false,
    saveUninitialized: true,
  })
);

// Middlewares
app.use(express.json());
app.use(cors());
app.use(
  session({
    name: "AuthCookie",
    secret: "some secret string!",
    resave: false,
    saveUninitialized: true,
  })
);
// Router setup
configRoutes(app);

// Server instanstiation
app.listen(PORT, () => {
  console.log("Server is listening on port 3000");
});
