import React, { memo } from "react";
import LinksSection from "./LinksSection.jsx";
import Logo from "images/logo.png";
import UserSection from "./UserSection.jsx";

const Navbar = () => {
  return (
    <header className="w-full fixed z-10 bg-black opacity-90 object-cover">
      <nav className="relative flex w-full py-2 md:py-3 px-4 md:px-9 items-center">
        <a
          href="/"
          className="flex items-center justify-center text-white text-lg cursor-pointer mr-5"
        >
          <img
            src={Logo}
            alt="Logo"
            className="hidden md:block w-8 h-8 lg:w-14 lg:h-14"
          />
        </a>
        <LinksSection />
        <div className="text-white ml-auto relative flex gap-6 inline-block justify-between">
          <UserSection />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
