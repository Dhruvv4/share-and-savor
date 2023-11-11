import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const LandingPage = () => {
  // TODO: Redesign this page

  return (
    <div className="flex flex-col items-center pt-24 h-full text-center">
      <h1 className="text-5xl font-bold  mb-4">
        Welcome to Share and Savor – Where Every Bite Counts!
      </h1>
      <p className="text-lg  mb-8">
        🌱 Join a Movement Redefining Food Sharing! 🌱
      </p>
      <div>
        <div className="flex gap-8 mb-10">
          <p className="p-4 max-w-md rounded-lg border-slate-200 border-2">
            <span className="block font-medium mb-3">
              🍕 Tackle Food Waste and Hunger with Just a Tap! 🍕
            </span>{" "}
            Ever thought your love for food could be a force for good? Welcome
            to Share and Savor, the innovative platform transforming the way we
            handle food surplus. We're not just an app; we're a community
            crusade against food waste and insecurity!
          </p>
          <p className="p-4 max-w-md rounded-lg border-slate-200 border-2">
            <span className="block font-medium mb-3">
              🍲 Connect with a Network of Giving and Receiving 🍲
            </span>{" "}
            Dive into a world where your favorite restaurants are more than just
            eateries; they're partners in a grand food sharing journey. With our
            cutting-edge geolocation features, discover a network of food donors
            and recipients right in your neighborhood.
          </p>
          <p className="p-4 max-w-md rounded-lg border-slate-200 border-2">
            <span className="block font-medium mb-3">
              🌍 Make an Impact, One Plate at a Time 🌍
            </span>{" "}
            Your actions have power! By joining Share and Savor, you're not just
            getting or giving food – you're making waves in environmental
            sustainability and community support.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-3xl mb-8">
            Features That Make Sharing Simple
          </h3>
          <div className="flex flex-col items-start max-w-lg gap-4 mx-auto">
            <p className="font-mono">
              📍 Geo-Friendly Finds: Locate nearby food sharing spots with ease.
            </p>
            <p className="font-mono">
              💚 Community Connection: Engage with local restaurants and
              community members.
            </p>
            <p className="font-mono">
              🌟 Seamless Sharing: Effortlessly share or claim surplus food.
            </p>
          </div>
        </div>
      </div>
      <Link className="mt-10" to={"/register"}>
        <Button>Get Started</Button>
      </Link>
    </div>
  );
};

export default LandingPage;
