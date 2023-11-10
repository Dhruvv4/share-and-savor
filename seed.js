import res from "./data/restaurants.json";
import { restuarants as resRef } from "./config/mongoCollections";

const seed = async () => {
  // Your code to seed the database goes here
  const resCollection = await resRef();
  const insertInfo = await resCollection.insertMany(res);
  if (insertInfo.insertedCount === 0) throw "Could not add restaurants";
  console.log("Successfully added restaurants");
  return true;
};

export default seed;
