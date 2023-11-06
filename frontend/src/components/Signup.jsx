//import users from "../../../backend/data/users.js";
import { Button } from "./../../components/ui/button.jsx";
import React, { useState } from "react";
import { Input } from "./../../components/ui/input.jsx";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    collegeName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    //await users.createUser(formData);
    console.log(formData);
    // You can handle form submission logic here
    // For demonstration: log form data on submission
  }

  return (
    <div>
      <h1 className="my-10">Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <Input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Gender:
          <Input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Date of Birth:
          <Input
            className="text-center"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          College Name:
          <Input
            type="text"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Phone Number:
          <Input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Signup;
