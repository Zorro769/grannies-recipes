import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import Login from "./Login.jsx";
import Favourites from "./Favourites.jsx";
import MyRecipes from "./MyRecipes.jsx";
import Register from "./Register.jsx";
import Logo from "../images/logo.png";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Select from "react-select";
import colorStyle from "../utils/styleReactSelect";
import axios from "../api/axios.js";
import { useTranslation } from "react-i18next";

import { VscAccount } from "react-icons/vsc";
import InfoDialog from "./InfoDialog";
import Dialog from "@mui/material/Dialog";
import i18n from "../i18n/i18n.js";

const Navbar = ({ loginOpened }) => {
  const axiosPrivate = useAxiosPrivate();
  const [infoDialog, setInfoDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openLoginDialog, setLoginOpenDialog] = useState(loginOpened);
  const [openRegisterDialog, setRegisterOpenDialog] = useState(false);
  const [openFavouriteDialog, setFavouriteOpenDialog] = useState(false);
  const [openMyRecipesDialog, setMyRecipesDialog] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [defaultLanguage, setDefaultLanguage] = useState();
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

  const handleLanguageChange = (option) => {
    i18n.changeLanguage(option.label);
    localStorage.setItem("language", option.code);
    console.log(localStorage.getItem('language'));
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

        <ul className="hidden md:flex text-white gap-9">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favourites">Favourites</Link>
          </li>
          <li>
            <Link to="/myrecipes">My recipes</Link>
          </li>
        </ul>
        <div className="text-white ml-auto relative flex gap-6 inline-block justify-between">
          <div className="text-left text-[#1FB137] max-w-[70px] mr-20">
            <Select
              className="basic-single min-w-[200px] inline-block border-transparent"
              options={currency}
              defaultValue={{
                value: localStorage.getItem("currencyLabel")?.toUpperCase(),
                label: localStorage.getItem("currencyLabel")?.toUpperCase(),
                code: localStorage.getItem("currencyLabel")?.toUpperCase(),
              }}
              styles={{
                singleValue: (provided, state) => ({
                  ...provided,
                  color: "[#1FB137]",
                }),
                ...colorStyle,
                control: (provided, state) => ({
                  ...provided,
                  border: "none",
                  maxWidth: 90 + "px",
                  background: "black",
                }),
              }}
              onChange={(option) => handleCurrencyChange(option)}
            />
          </div>
          <div className="mx-5">
            <button onClick={handleButtonClick} id="account_button">
              <VscAccount className="text-3xl" />
            </button>
          </div>
          <div
            className="text-left text-[#1FB137] max-w-[50px] cursor-pointer"
            onClick={() => {}}
          >
            <Select
              className="basic-single min-w-[200px] inline-block border-transparent"
              options={languages}
              defaultValue={{
                value: i18n.language,
                label: i18n.language.toUpperCase(),
                code: localStorage.getItem("language"),
              }}
              styles={{
                singleValue: (provided, state) => ({
                  ...provided,
                  color: "[#1FB137]",
                }),
                ...colorStyle,
                control: (provided, state) => ({
                  ...provided,
                  border: "none",
                  maxWidth: 90 + "px",
                  background: "black",
                }),
              }}
              onChange={(option) => handleLanguageChange(option)}
            />
          </div>
          {isVisible && !localStorage.getItem("accessToken") && (
            <div
              id="dropdown"
              className={`absolute ${
                isVisible ? "block" : "none"
              } z-10 divide-y bg-black opacity-90 text-center my-account-icon`}
              style={{ top: "155%", left: "60%" }}
            >
              <ul
                className=" text-sm text-gray-700 dark:text-gray-200 text-center"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <button
                    className="w-full inline-block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left"
                    onClick={() => setLoginOpenDialog(true)}
                  >
                    Log in
                  </button>
                </li>
                <li>
                  <button
                    className="w-full inline-block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left"
                    onClick={() => setRegisterOpenDialog(true)}
                  >
                    Register
                  </button>
                </li>
              </ul>
            </div>
          )}
          {isVisible && localStorage.getItem("accessToken") && (
            <div
              id="dropdown"
              className={`absolute ${
                isVisible ? "block" : "none"
              } z-10 divide-y bg-black opacity-90 text-center`}
              style={{ top: "155%", left: "60%" }}
            >
              <ul
                class=" text-sm text-gray-700 dark:text-gray-200 text-center"
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
          )}
        </div>
      </nav>
      <div
        className={`${
          open ? "flex" : "hidden"
        } bg-black flex-col w-full px-4 pt-16 pb-10 text-white gap-6 text-[14px]`}
      >
        <a href="/">Home</a>
        <a href="/#recipes">Recipes</a>
        <a href="/">Favorites</a>
      </div>
      <Dialog
        open={openLoginDialog}
        onClose={handleLoginDialogClose}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          style: { height: "800px", border: "5px solid gray" },
          sx: { borderRadius: "50px" },
        }}
      >
        <Login
          onClose={handleLoginDialogClose}
          handleButtonClick={handleButtonClick}
        />
      </Dialog>
      <Dialog
        open={openRegisterDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          style: { height: "800px", border: "5px solid gray" },
          sx: { borderRadius: "50px" },
        }}
      >
        <Register onClose={handleDialogClose} />
      </Dialog>
      <Dialog
        open={openFavouriteDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="lg"
        PaperProps={{ style: { height: "800px" } }}
      >
        <Favourites
          onClose={handleDialogClose}
          handleButtonClick={handleButtonClick}
        />
      </Dialog>
      <Dialog
        open={openMyRecipesDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="lg"
        PaperProps={{ style: { height: "800px" } }}
      >
        <MyRecipes
          onClose={handleDialogClose}
          handleButtonClick={handleButtonClick}
        />
      </Dialog>
      <Dialog
        open={infoDialog}
        onClose={closeDialog}
        fullWidth
        maxWidth="xs"
        PaperProps={{ style: { height: "100px", borderradius: "50%" } }}
      >
        <InfoDialog
          info={"You have been logged out successfully"}
          onClose={closeDialog}
        />
      </Dialog>
    </header>
  );
};

export default Navbar;
