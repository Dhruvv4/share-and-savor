import { Router } from "express";
const router = Router();
import userMethods from '../data/users.js';
import helpers from '../helpers.js';

// User login route
router.post("/login", async (req, res) => {
  // Handle user login logic here
  try {
    let { email, password } = req.body;
    // validating username and password
    email = helpers.validEmail(email);
    password = helpers.validPassword(password);
    const user = await userMethods.checkUser(email, password);
    let id = user?._id?.toString();
    if (user) {
      req.session.user = {
        id: id, firstName: user.firstName, lastName: user.lastName, gender: user.gender, dateOfBirth: user.dateOfBirth,
        collegeName: user.collegeName, phoneNumber: user.phoneNumber, email: user.email
      };
      res.status(200).json({ message: "User login route" });
    }
    else {
      res.status(200).json({ message: "Redirect it to register page" });
    }
  } catch (e) {
    if (e.includes("401")) {
      console.log("hello")
      res.status(401).json({ error: e });
    } else if (e.includes("400")) {
      res.status(400).json({ error: e });
    } else {
      res.status(404).json({ error: "Resource is not found" });
    }
  }
});

// User registration route
router.post("/register", async (req, res) => {
  // Handle user registration logic here
  try {
    let { firstName, lastName, gender, dateOfBirth, collegeName, phoneNumber, email, password } = req.body;
    firstName = helpers.validName(firstName);
    lastName = helpers.validName(lastName);
    gender = helpers.validGender(gender);
    dateOfBirth = helpers.validDOB(dateOfBirth);
    collegeName = helpers.validString(collegeName);
    phoneNumber = helpers.validPhoneNumber(phoneNumber);
    email = helpers.validEmail(email);
    password = helpers.validPassword(password);
    const user = await userMethods.createUser(firstName, lastName, gender, dateOfBirth, collegeName, phoneNumber,
      email, password);
    if (user) {
      return res.status(200).json(user);
    }
  } catch (e) {
    if (e.includes("401")) {
      res.status(401).json({ error: e });
    } else if (e.includes("400")) {
      res.status(400).json({ error: e });
    } else {
      res.status(404).json({ error: "Resource is not found" });
    }
  }
});

// User edit profile route
router
  .route('/editprofile')
  .post(async (req, res) => {
    try {
      if (!req?.session?.user) {
        throw "Unauthorized(401): User is not logged in.";
      }
      let { updatedfirstName, updatedlastName, updatedgender, updateddateOfBirth,
        updatedcollegeName, updatedphoneNumber, updatedemail, updatedpassword } = req.body;
      let id = req.session.user.id;
      // validating the fields            
      updatedfirstName = helpers.validName(updatedfirstName);
      updatedlastName = helpers.validName(updatedlastName);
      updatedgender = helpers.validGender(updatedgender);
      updateddateOfBirth = helpers.validDOB(updateddateOfBirth);
      updatedcollegeName = helpers.validName(updatedcollegeName);
      updatedphoneNumber = helpers.validPhoneNumber(updatedphoneNumber);
      updatedemail = helpers.validEmail(updatedemail);
      updatedpassword = helpers.validPassword(updatedpassword);
      const updatedUser = await userMethods.updateUserByID(id, updatedfirstName, updatedlastName, updatedgender,
        updateddateOfBirth, updatedcollegeName, updatedphoneNumber, updatedemail, updatedpassword);
      // res.json(updatedUser);
      if (updatedUser) {
        res.status(200).json({ message: "Redirect it to dashboard" });
      }
    }
    catch (e) {
      if (e.includes("401")) {
        res.status(401).json({ error: e });
      } else if (e.includes("400")) {
        res.status(400).json({ error: e });
      } else {
        res.status(404).json({ error: "Resource is not found" });
      }
    }
  });

// User delete profile route
router
  .route('/deleteprofile')
  .post(async (req, res) => {
    try {
      if (!req?.session?.user) {
        throw "Unauthorized(401): User is not logged in.";
      }
      let id = req.session.user.id;
      const deletedUser = await userMethods.deleteUserByID(id);
      if (deletedUser) {
        res.status(200).json({ message: "Redirect it to register page" });
      }
    } catch (e) {
      if (e.includes("401")) {
        res.status(401).json({ error: e });
      } else if (e.includes("400")) {
        res.status(400).json({ error: e });
      } else {
        res.status(404).json({ error: "Resource is not found" });
      }
    }
  });

// User logout route
router.get("/logout", (req, res) => {
  // Handle user logout logic here
  try {
    if (!req?.session?.user) {
      throw "Unauthorized(401): User is not logged in.";
    } else {
      req.session.destroy();
      res.status(200).json({ message: "You have been logged out" });
      return;
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

export default router;
