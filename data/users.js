import { users } from "../config/mongoCollections.js";

import check from "../helpers.js";
import bcrypt from "bcrypt";

import { ObjectId } from "mongodb";

const saltRounds = 16;

const createUser = async (
  firstName,
  lastName,
  gender,
  dateOfBirth,
  collegeName,
  phoneNumber,
  email,
  password
) => {
  // Input Validation
  firstName = check.validName(firstName);
  lastName = check.validName(lastName);
  gender = check.validGender(gender);
  dateOfBirth = check.validDOB(dateOfBirth);
  collegeName = check.validString(collegeName);
  phoneNumber = check.validPhoneNumber(phoneNumber);
  email = check.validEmail(email);
  password = check.validPassword(password);

  const usersCollection = await users();
  const user = await usersCollection.findOne({ email: email });
  if (!user) {
    password = await bcrypt.hash(password, saltRounds);
    let createUser = {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      dateOfBirth: dateOfBirth,
      collegeName: collegeName,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
    };

    const insertUser = await usersCollection.insertOne(createUser);

    if (insertUser.insertedCount == 0) throw "Error: Could not add User";

    const newId = insertUser.insertedId.toString();

    const user = await getUserByID(newId);
    return user;
  } else {
    throw "Error: there is already a user with that email";
  }
};

const checkUser = async (email, password) => {
  email = check.validEmail(email);
  password = check.validPassword(password);

  const usersCollection = await users();
  const user = await usersCollection.findOne({ email: email });
  if (user == null) throw "Either the username or password is invalid";
  let compareToMatch = await bcrypt.compare(password, user.password);
  if (compareToMatch) {
    return user;
  } else {
    throw "Could not find a user with given email and password combination!";
  }
};

const getUserByID = async (id) => {
  id = check.validObjectId(id);
  const usersCollection = await users();
  const user = await usersCollection.findOne({ _id: new ObjectId(id) });
  if (user === null) {
    throw `No user with user id: ${id} found! Only pass id as strings!`;
  }
  user._id = user._id.toString();
  return user;
};

const getUserByEmail = async (email) => {
  email = check.validEmail(email);
  const usersCollection = await users();
  const user = await usersCollection.findOne({ email: email });
  if (user === null) throw `No user with email: ${email} found!`;
  user._id = user._id.toString();
  return user;
};

const deleteUserByID = async (id) => {
  id = check.validObjectId(id);
  const usersCollection = await users();
  let user = await getUserByID(id);
  const delInfo = await usersCollection.deleteOne({ _id: new ObjectId(id) });
  if (delInfo.deletedCount === 0) {
    throw `Could not delete user with ID of ${id}`;
  }

  return `Account with EmailAdress: ${user.email} has been successfully deleted`;
};

const updateUserByID = async (
  id,
  updatedfirstName,
  updatedlastName,
  updatedgender,
  updateddateOfBirth,
  updatedcollegeName,
  updatedphoneNumber,
  updatedemail,
  updatedpassword
) => {
  // input validation
  id = check.validObjectId(id);
  updatedfirstName = check.validName(updatedfirstName);
  updatedlastName = check.validName(updatedlastName);
  updatedgender = check.validGender(updatedgender);
  updateddateOfBirth = check.validDOB(updateddateOfBirth);
  updatedcollegeName = check.validString(updatedcollegeName);
  updatedphoneNumber = check.validPhoneNumber(updatedphoneNumber);
  updatedemail = check.validEmail(updatedemail);
  updatedpassword = check.validPassword(updatedpassword);

  const usersCollection = await users();
  // check if user exists or not
  const user = await usersCollection.findOne({ _id: new ObjectId(id) });
  if (user == null) throw `No user with that ${id}`;
  // check updatedemail matches with other user
  const duplicate = await usersCollection.findOne({ email: updatedemail });
  if (duplicate && duplicate._id.toString() != user._id.toString()) {
    throw `Error: Can't update email as User already exists with that email address: ${updatedemail}`;
  }
  let compareToMatch = await bcrypt.compare(updatedpassword, user.password);
  if (!compareToMatch) {
    updatedpassword = await bcrypt.hash(updatedpassword, saltRounds);
  } else {
    updatedpassword = user.password;
  }

  // checks if all fields are same as before
  if (
    (user.firstName === updatedfirstName,
    user.lastName === updatedlastName &&
      user.gender === updatedgender &&
      user.dateOfBirth === updateddateOfBirth &&
      user.collegeName === updatedcollegeName &&
      user.phoneNumber === updatedphoneNumber &&
      user.email === updatedemail &&
      compareToMatch)
  ) {
    throw "All the fields are same as before";
  }
  const updatedata = {
    firstName: updatedfirstName,
    lastName: updatedlastName,
    gender: updatedgender,
    dateOfBirth: updateddateOfBirth,
    collegeName: updatedcollegeName,
    phoneNumber: updatedphoneNumber,
    email: updatedemail,
    password: updatedpassword,
  };
  const updateInfo = await usersCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedata }
  );
  if (updateInfo.modifiedCount === 0) {
    throw "Could not update user";
  }
  return await getUserByID(id);
};

export default {
  createUser,
  checkUser,
  getUserByID,
  deleteUserByID,
  updateUserByID,
  getUserByEmail,
};
