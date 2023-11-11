import userRoutes from "./users.js";
import restaurantRoutes from "./restaurants.js";

const constructorMethod = (app) => {
  app.use("/api/auth", userRoutes);
  app.use("/api/restaurants", restaurantRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

export default constructorMethod;
