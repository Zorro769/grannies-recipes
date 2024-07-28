import { isCookiesExist } from "utils/auth.js";
import Navbar from "./Navbar/Navbar.jsx";
import Footer from "./Shared/Footer.jsx";
import React, { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
