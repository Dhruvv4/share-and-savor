import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AppContext";
import { Button } from "./ui/button";
import taco from "@/assets/taco.svg";
import { useLocation } from "react-router-dom";

const Header = (props) => {
  // TODO: Add profile dropdown and dark mode toggle
  // TODO: Add logic to show/hide links based on user login status

  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const { pathname } = useLocation();
  const isLoginRoute = pathname === "/login";

  const isLoggedIn = false;
  const navLinks = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Restaurants",
      path: "/about",
    },
  ];

  const logoutClick = () => {
    navigate("/login");
  };

  return (
    <header className="bg-white dark:bg-gray-900">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link to={"/"}>
          <img src={taco} className="w-10" alt="" />
        </Link>

        <div className="flex flex-1 items-center justify-end">
          {isLoggedIn && (
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                {navLinks.map((link) => (
                  <li key={link.title}>
                    <Link
                      className="font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                      to={link.path}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="flex items-center justify-end gap-4">
            <div className="sm:flex sm:gap-4">
              <Link to={isLoginRoute ? "/register" : "/login"}>
                <Button>{isLoginRoute ? "Register" : "Login"}</Button>
              </Link>
            </div>

            <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
