import { ObjectId } from "mongodb";
import isUrl from "is-url";
const validName = (name) => {
  name = name.toLowerCase();
  if (!name) throw "Error: name can't be empty";
  if (typeof name != "string") throw "Error: name should be string";
  name = name.trim();
  if (!name) throw "Error: name can't be just spaces";
  if (name.length < 3) throw "Error: name should be atleast 3 characters";
  for (let i = 0; i < name.length; i++) {
    if (
      (name.charCodeAt(i) >= 65 && name.charCodeAt(i) <= 90) ||
      (name.charCodeAt(i) >= 97 && name.charCodeAt(i) <= 122) ||
      name.charCodeAt(i) == 32
    ) {
    } else {
      throw "Error: only characters are allowed(A-Z and a-z)";
    }
  }
  return name;
};

const validGender = (gender) => {
  gender = gender.toLowerCase();
  if (!gender) throw "Error: gender can't be empty";
  if (typeof gender != "string") throw "Error: gender should be string";
  gender = gender.trim();
  if (!gender) throw "Error: gender can't be just spaces";
  gender.toLowerCase();
  if (!(gender === "male" || gender === "female" || gender === "others")) {
    throw `Invalid gender input!`;
  }
  return gender;
};

const validDOB = (DOB) => {
  if (!DOB) throw "Error: DOB can't be empty";
  if (typeof DOB != "string") throw "Error: DOB should be string";
  DOB = DOB.trim();
  if (!DOB) throw "Error: DOB is not provided";
  const datePattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  if (!datePattern.test(DOB)) {
    throw "Invalid Date Of Birth";
  }

  // Check if the date is before today.
  const today = new Date();
  const date = Date.parse(DOB);
  if (date > today) {
    throw "The entered Date of Birth cannot be greater than today";
  }
  return DOB;
};

const validPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) throw "Error: phoneNumber can't be empty";
  if (typeof phoneNumber != "string") {
    throw "Error: phoneNumber should be string";
  }
  phoneNumber = phoneNumber.trim();
  if (phoneNumber.length != 10)
    throw "Error: Phone number should contain 10 digits";
  if (!phoneNumber) throw "Error: PhoneNumber can't be just spaces";
  for (let i = 0; i < phoneNumber.length; i++) {
    if (phoneNumber.charCodeAt(i) >= 48 && phoneNumber.charCodeAt(i) <= 57) {
    } else {
      throw "Error: phone number should contain only digits";
    }
  }
  return phoneNumber;
};

const validEmail = (email) => {
  email = email.toLowerCase();
  if (!email) throw "Error: email can't be empty";
  if (typeof email != "string") throw "Error: email should be string";
  email = email.trim();
  if (!email) throw "Email is not provided!";
  email = email.trim();
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    throw "You have entered an invalid email address!";
  return email;
};

const validPassword = (password) => {
  password.trim();
  if (!password) throw `No password was provided!`;
  if (typeof password != "string") throw "Error: password should be string";
  if (password.includes(" ")) throw `passwords can't have spaces!`;
  if (password.length < 6)
    throw `passwords should be at least 6 characters long!`;
  if (!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password))
    throw `passwords should have atleast one special character!`;
  if (!/[A-Z]/.test(password))
    throw `passwords should have atleast one capital alphabet!`;
  if (!/[0-9]/.test(password))
    throw `passwords should have atleast one number!`;
  return password;
};

const validString = (str) => {
  str = str.toLowerCase();
  if (!str) throw "Error: string should not be empty";
  if (typeof str != "string") throw "Error: Input should be string";
  //   trim() function removes spaces at the ends
  str = str.trim();
  if (!str) throw "Error: Input entered is just spaces";
  for (let i = 0; i < str.length; i++) {
    if (
      (str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90) ||
      (str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122) ||
      str.charCodeAt(i) == 32
    ) {
    } else {
      throw "Error: only characters are allowed(A-Z and a-z)";
    }
  }
  return str;
};
const validStringWithNumAndSpecialChar = (str) => {
  str = str.toLowerCase();
  if (!str) throw "Error: string should not be empty";
  if (typeof str != "string") throw "Error: Input should be string";
  //   trim() function removes spaces at the ends
  str = str.trim();
  if (!str) throw "Error: Input entered is just spaces";
  return str;
};

const validObjectId = (str) => {
  if (!str) throw "invalid object ID";
  //   check whether the input is string or not
  if (typeof str != "string") throw "invalid object ID";
  //   trim() function removes spaces at the ends
  str = str.trim();
  if (!str) throw "invalid object ID";
  if (!ObjectId.isValid(str)) throw "invalid object ID";
  return str;
};

const checkUrl = (url) => {
  const checkUrl = isUrl(url);
  if (!checkUrl) throw "Invalid Url";
  return url;
};
const checkNumeric = (num) => {
  num = parseFloat(num);
  if (num == NaN) {
    throw "Error: input should be a number";
  }
  return num;
};

export default {
  validName,
  validEmail,
  validGender,
  validDOB,
  validPhoneNumber,
  validPassword,
  validString,
  validStringWithNumAndSpecialChar,
  validObjectId,
  checkUrl,
  checkNumeric,
};
