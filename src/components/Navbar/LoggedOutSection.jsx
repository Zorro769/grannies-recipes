import React from "react";
import { Link } from "react-router-dom";

const LoggedOutSection = ({ isVisible }) => {
  return (
    <div
      id="dropdown"
      className={`absolute ${
        isVisible ? "block" : "none"
      } z-10 divide-y bg-black opacity-90 text-center my-account-icon top-[155%] left-[54%]`}
    >
      <ul
        className=" text-sm text-gray-700 dark:text-gray-200 text-center"
        aria-labelledby="dropdownDefaultButton"
      >
        <li>
          <Link
            className="w-full inline-block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left"
            to="/login"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            className="w-full inline-block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left"
            to="/register"
          >
            Register
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LoggedOutSection;
