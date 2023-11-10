import users from "./data/users.js";
import configRoutes from "./routes/index.js";
import express from "express";

// Express server instance
const app = express();
const PORT = process.env.EXPRESS_PORT || 3000;

// Middlewares
app.use(express.json());

// Router setup
configRoutes(app);

// Server instanstiation
app.listen(PORT, () => {
  console.log("Server is listening on port 3000");
});

async function main() {
  //  feel free to test any function
  // // Create  User
  // try {
  //   console.log(
  //     await users.createUser(
  //       "prabhas",
  //       "varma",
  //       "others",
  //       "03/07/2022",
  //       "stevens",
  //       "2324422222",
  //       "prabhasvarma71@gmail.com",
  //       "Rahul@2001"
  //     )
  //   );
  // } catch (e) {
  //   console.log(e);
  // }
  // Check user
  // try {
  //   console.log(
  //     await users.checkUser("prabhasvarma74@gmail.com", "Rahul@2002")
  //   );
  // } catch (e) {
  //   console.log(e);
  // }
  // // get user by ID
  // try {
  //   console.log(await users.getUserByID("6532ebede249baeb519e937f"));
  // } catch (e) {
  //   console.log(e);
  // }
  // // get user by Email
  // try {
  //   console.log(await users.getUserByEmail("sairahulvarma73@gmail.com"));
  // } catch (e) {
  //   console.log(e);
  // }
  // // delete user by ID
  // try {
  //   console.log(await users.deleteUserByID("6532f32654d547621ad63caf"));
  // } catch (e) {
  //   console.log(e);
  // }
  // // update User
  // try {
  //   console.log(
  //     await users.updateUserByID(
  //       "6532f61d852b75366c015d42",
  //       "prabhas",
  //       "varma",
  //       "male",
  //       "03/07/1985",
  //       "stevens",
  //       "1234567819",
  //       "sairahulvarma73@gmail.com",
  //       "Rahul@2002"
  //     )
  //   );
  // } catch (e) {
  //   console.log(e);
  // }
}

main();
