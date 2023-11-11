import { Router } from "express";

const router = Router();

import helpers from "../helpers.js";
import restaurantsData from "../data/restaurants.js";

// TODO: Validate the users session for all restuarant routes.

// Create a new restaurant
router.post("/", async (req, res) => {
  // Your code to create a new restaurant goes here
  let {
    name,
    address,
    phone,
    email,
    lat,
    lng,
    url,
    country,
    state,
    city,
    star_count,
    rating_count,
    catogory_name,
  } = req.body;

  try {
    name = helpers.validStringWithNumAndSpecialChar(name);
    address = helpers.validStringWithNumAndSpecialChar(address);
    phone = helpers.validPhoneNumber(phone);
    email = helpers.validEmail(email);
    lat = helpers.checkNumeric(lat);
    lng = helpers.checkNumeric(lng);
    url = helpers.checkUrl(url);
    country = helpers.validString(country);
    state = helpers.validString(state);
    city = helpers.validString(city);
    star_count = helpers.checkNumeric(star_count);
    rating_count = helpers.checkNumeric(rating_count);
    catogory_name = helpers.validStringWithNumAndSpecialChar(catogory_name);

    const newRestaurant = await restaurantsData.createRestaurant(
      name,
      address,
      phone,
      email,
      lat,
      lng,
      url,
      country,
      state,
      city,
      star_count,
      rating_count,
      catogory_name
    );

    res.status(200).json(newRestaurant);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});
// Get all restaurants
router.get("/", async (req, res) => {
  try {
    const allRestaurants = await restaurantsData.getAllRestaurants();
    return res.status(200).json(allRestaurants);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
});
// Get a restaurant by ID
router.get("/:id", async (req, res) => {
  try {
    helpers.validObjectId(req.params.id);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  try {
    // Your code to get a restaurant by ID goes here
    const restaurant = await restaurantsData.getRestaurantById(req.params.id);
    res.status(200).json(restaurant);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
});

export default router;
