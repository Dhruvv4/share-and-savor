import userRoutes from "./users.js";
import restaurantRoutes from "./restuarants.js";

const constructorMethod = (app) => {
  app.use("/auth", userRoutes);
  app.use("/restuarants", restaurantRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

export default constructorMethod;
