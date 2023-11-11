import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const LandingPage = () => {
  // TODO: Redesign this page

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-center">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">
        Welcome to Our Amazing Site!
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Discover a world of possibilities with our services.
      </p>
      <Link to={"/register"}>
        <Button>Get Started</Button>
      </Link>
    </div>
  );
};

export default LandingPage;
