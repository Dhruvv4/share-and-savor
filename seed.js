import res from "./data/restaurants.json" assert { type: "json" };
import { closeConnection, dbConnection } from "./config/mongoConnection.js";
import { restuarants as resRef } from "./config/mongoCollections.js";

const seed = async () => {
  // Your code to seed the database goes here
  const db = await dbConnection();
  db.dropDatabase();

  const resCollection = await resRef();
  const insertInfo = await resCollection.insertMany(res);
  if (insertInfo.insertedCount === 0) throw "Could not add restaurants";
  closeConnection();
  return true;
};

await seed();

export default seed;
