import React from "react";
import { Link } from "react-router-dom";
import ChangePassword from "./Changepassword";
import { useSelector } from "react-redux";

const userName = "[username] [lastname]";
const userEmail = "[user email]";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const moneySavedMapper = { personal: 5, family: 8 }; // in $
  const amtFoodSaved = { personal: 2, family: 4 }; // in lbs
  const amountSaved = user?.orders?.reduce((acc, order) => {
    return acc + moneySavedMapper[order.type];
  }, 0);

  console.log(user);

  return (
    <div className="flex flex-col items-center justify-center  h-full">
      <div className="w-3/6">
        <p className="text-5xl font-bold text-gray-800 mb-4">
          Hello, {user?.firstName}!
        </p>
        <p className="text-lg text-gray-600 mr-12">
          We've been together since {new Date(user.createdAt).toDateString()}.
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
            <p className="text-xs">
              {user?.orders?.length} restaurants ordered from!
            </p>
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
