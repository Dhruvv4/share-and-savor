import { Router } from "express";
import user_functions from "./../data/users.js";
const router = Router();
import userMethods from '../data/users.js';
import helpers from '../helpers.js';

// User login route
router.post("/login", async (req, res) => {
  // Handle user login logic here
  let email = req.body.email;
  let password = req.body.password;
  email = email?.toLowerCase();

  try {
    const data = await user_functions.checkUser(email, password);
    if (data) {
      req.session.user = data;
      req.session.save();
      console.log("User session stored", req.session.user);
      res
        .status(200)
        .json({ message: "User successfully logged in", session: data });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

// User registration route
router.post("/register", async (req, res) => {
  // Handle user registration logic here
  const new_user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    dateOfBirth: req.body.dateOfBirth,
    university: req.body.university,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  try {
    await user_functions.createUser(new_user);
    res.status(200).json({ message: "User created" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

// User edit profile route
router
  .route('/editprofile')
  .post(async (req, res) => {
    try {
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
        res.render('/dashboard'); // Dashboard handlebars
      }
    }
    catch (error) {
      res.status(400).json({ error: error });
    }
  });

// User delete profile route
router
  .route('/deleteprofile')
  .post(async (req, res) => {
    try {
      let id = req.session.user.id;
      const deletedUser = await userMethods.deleteUserByID(id);
      if (deletedUser) {
        res.redirect('/register'); // Redirect it to the register route
      }
    } catch (error) {
      res.status(400).json({ error: error });
    }
  });

// User logout route
router.get("/logout", (req, res) => {
  // Handle user logout logic here
  if (req.session.user) {
    req.session.destroy();
    res.clearCookie();
    return res.status(200).json({ message: "User Logged out" });
  } else {
    return res.status(403).json({ message: "Unable to Log out" });
  }
});

export default router;
