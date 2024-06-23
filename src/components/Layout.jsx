import Navbar from "./Navbar/Navbar.jsx";
import Footer from "./Footer.jsx";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const showLoginDialog = location.state?.showLoginDialog || false;
  return (
    <>
      <Navbar loginOpened={showLoginDialog} />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
