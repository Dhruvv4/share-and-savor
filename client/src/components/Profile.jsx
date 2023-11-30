import React from "react";
import { Link } from "react-router-dom";
import ChangePassword from "./Changepassword";
import { useSelector } from "react-redux";

const userName = "[username] [lastname]";
const userSinceTime = "[user since time]";
const userEmail = "[user email]";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 h-full">
      <div className="w-3/6">
        <p className="text-5xl font-bold text-gray-800 mb-4">
          Hello, {user?.firstName}!
        </p>
        <p className="text-lg text-gray-600 mr-12">
          We've been together for {userSinceTime}.
        </p>
        <p className="text-lg text-gray-600 mr-12">
          Your registered e-mail is {user?.email}.
        </p>
        <p className="text-4xl font-bold text-gray-800 mt-8 mb-4">
          Your Impact
        </p>
        <div className="flex justify-center space-x-8 mb-4">
          <div className="flex flex-col items-center bg-primary p-4 text-white rounded-3xl">
            <img src="/save-white.png" className="w-3/5 h-3/5 mb-2"></img>
            <p className="text-xs">[amount] saved so far!</p>
          </div>
          <div className="flex flex-col items-center bg-primary p-4 text-white rounded-3xl">
            <img src="/restaurant-white.png" className="w-3/5 h-3/5 mb-2"></img>
            <p className="text-xs">[number] restaurants ordered from!</p>
          </div>
          <div className="flex flex-col items-center bg-primary p-4 text-white rounded-3xl">
            <img src="/food-white.png" className="w-3/5 h-3/5 mb-2"></img>
            <p className="text-xs">[amount] of food saved from being wasted!</p>
          </div>
        </div>
        <div>
          <Link to={"/change-password"}>
            <button className="text-lg text-gray-600 bg-transparent border-none">
              Change password
            </button>
          </Link>
        </div>
        <div>
          <Link to={"/"}>
            <button className="text-lg text-gray-600 bg-transparent border-none">
              Logout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
