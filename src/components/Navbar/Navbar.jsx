import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import LoggedInSection from "./LoggedInSection.jsx";
import LoggedOutSection from "./LoggedOutSection.jsx";
import Dialogs from "./Dialogs.jsx";
import LinksSection from "./LinksSection.jsx";
import Logo from "images/logo.png";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";

import axios from "../../api/axios.js";
import { useTranslation } from "react-i18next";
import NavbarSelect from "./Select.jsx";
import { VscAccount } from "react-icons/vsc";

import i18n from "../../i18n/i18n.js";

const Navbar = ({ loginOpened }) => {
  const axiosPrivate = useAxiosPrivate();
  const [infoDialog, setInfoDialog] = useState(false);
  const [openLoginDialog, setLoginOpenDialog] = useState(loginOpened);
  const [openRegisterDialog, setRegisterOpenDialog] = useState(false);
  const [openFavouriteDialog, setFavouriteOpenDialog] = useState(false);
  const [openMyRecipesDialog, setMyRecipesDialog] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [currency, setCurrency] = useState([]);
  const { t } = useTranslation();
  const closeDialog = () => {
    setInfoDialog(false);
  };

  const location = useLocation();
  const showLoginDialog = location.state?.showLoginDialog;

  useEffect(() => {
    loadCurrencyAndLanguage();

    if (showLoginDialog) {
      setLoginOpenDialog(true);
    }
  }, [showLoginDialog]);

  const loadCurrencyAndLanguage = async () => {
    const response = await axios.get("/recipes/load-currency-languages");
    setLanguages(response?.data?.languageData);
    setCurrency(response?.data?.currencyData);
    if (localStorage.getItem("currencyCode") === null) {
      localStorage.setItem(
        "currencyCode",
        response?.data?.currencyData[0].code
      );
      localStorage.setItem(
        "currencyLabel",
        response?.data?.currencyData[0].label
      );
    }
  };

  const handleCurrencyChange = (option) => {
    localStorage.setItem("currencyCode", option.code);
    localStorage.setItem("currencyLabel", option.label);
    window.dispatchEvent(new Event("storage"));
  };
  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  const handleLoginDialogClose = () => {
    setLoginOpenDialog(false);
  };

  const handleRegisterOpenDialog = () => {
    setRegisterOpenDialog(true);
  };
  const handleLoginOpenDialog = () => {
    setLoginOpenDialog(true);
  };
  const handleLanguageChange = (option) => {
    i18n.changeLanguage(option.label);
    localStorage.setItem("language", option.code);
    console.log(localStorage.getItem("language"));
    window.dispatchEvent(new Event("storage"));
  };

  const handleDialogClose = () => {
    setRegisterOpenDialog(false);
    setLoginOpenDialog(false);
    setFavouriteOpenDialog(false);
    setMyRecipesDialog(false);
  };
  const handleLogOut = async () => {
    try {
      await axiosPrivate.get("/users/logout");
      localStorage.removeItem("accessToken");
      setInfoDialog(true);
    } catch (err) {}
    if (!localStorage.getItem("accessToken")) {
      handleButtonClick();
    }
  };

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
          <div className="text-left text-[#1FB137] max-w-[200px] mr-20">
            <NavbarSelect
              options={currency}
              defaultValue={{
                value: localStorage.getItem("currencyLabel")?.toUpperCase(),
                label: localStorage.getItem("currencyLabel")?.toUpperCase(),
                code: localStorage.getItem("currencyLabel")?.toUpperCase(),
              }}
              handleChange={handleCurrencyChange}
            />
          </div>
          <div className="mx-5">
            <button onClick={handleButtonClick} id="account_button">
              <VscAccount className="text-3xl" />
            </button>
          </div>
          <div
            className="text-left text-[#1FB137] max-w-[200px] mr-5 cursor-pointer"
            onClick={() => {}}
          >
            <NavbarSelect
              options={languages}
              defaultValue={{
                value: i18n.language,
                label: i18n.language.toUpperCase(),
                code: localStorage.getItem("language"),
              }}
              handleChange={handleLanguageChange}
            />
          </div>
          {isVisible && !localStorage.getItem("accessToken") && (
            <LoggedOutSection
              isVisible={isVisible}
              handleRegisterOpenDialog={handleRegisterOpenDialog}
              handleLoginOpenDialog={handleLoginOpenDialog}
            />
          )}
          {isVisible && localStorage.getItem("accessToken") && (
            <LoggedInSection
              isVisible={isVisible}
              handleLogOut={handleLogOut}
            />
          )}
        </div>
      </nav>
      <Dialogs
        openLoginDialog={openLoginDialog}
        handleLoginDialogClose={handleLoginDialogClose}
        handleButtonClick={handleButtonClick}
        openRegisterDialog={openRegisterDialog}
        handleDialogClose={handleDialogClose}
        openFavouriteDialog={openFavouriteDialog}
        openMyRecipesDialog={openMyRecipesDialog}
        infoDialog={infoDialog}
        closeDialog={closeDialog}
      />
    </header>
  );
};

export default Navbar;
