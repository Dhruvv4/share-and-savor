import userRoutes from "./users.js";
import restaurantRoutes from "./restuarants.js";

const constructorMethod = (app) => {
  app.use("/api/auth", userRoutes);
  app.use("/api/restuarants", restaurantRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

export default constructorMethod;
