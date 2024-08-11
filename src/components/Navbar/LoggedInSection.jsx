import React from "react";
import { logoutUser } from "utils/auth.js";
import toast from "react-hot-toast";

import SuccessAuthToast from "components/Toasts/SuccessAuthToast";

const LoggedInSection = ({ isVisible }) => {
  const handleLogOut = async () => {
    await logoutUser();
    toast.custom(
      (t) => (
        <SuccessAuthToast
          t={t}
          title={"You have been logged out succesfully"}
          subtitle={"Your page will be reloaded"}
        />
      ),
      { duration: 5000 }
    );
  };
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
