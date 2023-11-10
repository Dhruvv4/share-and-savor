import { Router } from "express";

const router = Router();

// Create a new restaurant
router.post("/", (req, res) => {
  // Your code to create a new restaurant goes here
  const newRestaurant = [];
  res.status(200).json(newRestaurant);
});

// Get all restaurants
router.get("/", (req, res) => {
  // Your code to get all restaurants goes here
  const allRestuarants = [];
  return res.status(200).json(allRestuarants);
});

// Get a restaurant by ID
router.get("/:id", (req, res) => {
  // Your code to get a restaurant by ID goes here
  const restaurant = [];
  res.status(200).json(restaurant);
});

export default router;
