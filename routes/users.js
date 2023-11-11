import { Router } from "express";
const router = Router();
import userMethods from '../data/users.js';
import helpers from '../helpers.js';

// User login route
router.post("/login", async (req, res) => {
  // Handle user login logic here
  try {
    const { email, password } = req.body;
    // validating username and password
    email = helpers.validEmail(email);
    password = helpers.validPassword(password);
    const user = await userMethods.checkUser(email, password);
    let id = user._id.toString();
    if (!user) {
      res.redirect('/register'); // Redirect it to the register route
    }
    else {
      req.session.user = {
        id: id, firstName: user.firstName, lastName: user.lastName, gender: user.gender,
        dateOfBirth: user.dateOfBirth, collegeName: user.collegeName, phoneNumber: user.phoneNumber,
        email: user.email, password: user.password
      };
    }
    return res.json({ message: "User login route" });
  } catch (error) {
    res.status(400).json({ error: 'Page Not Available' });
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
      return res.json({ message: "User registration route" });
    }
  } catch (error) {
    res.status(400).json({ error: 'Page Not Available' });
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
  req.session.destroy();
  return res.json({ message: "User logout route" });
});

export default router;
