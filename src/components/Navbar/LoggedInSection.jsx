import React from "react";

const LoggedInSection = ({ isVisible, handleLogOut }) => {
  return (
    <div
      id="dropdown"
      className={`absolute ${
        isVisible ? "block" : "none"
      } z-10 divide-y bg-black opacity-90 text-center top-[155%] left-[54%]`}
    >
      <ul
        className=" text-sm text-gray-700 dark:text-gray-200 text-center"
        aria-labelledby="dropdownDefaultButton"
      >
        <li>
          <button
            className="w-full inline-block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left"
            onClick={() => handleLogOut()}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LoggedInSection;
