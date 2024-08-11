import React, { useState } from "react";
import { loadCurrencyAndLanguage } from "utils/services.js";
import i18n from "../../i18n/i18n.js";
import { useQuery } from "react-query";
import { isCookiesExist } from "utils/auth.js";

import NavbarSelect from "./Select.jsx";
import { VscAccount } from "react-icons/vsc";
import LoggedInSection from "./LoggedInSection.jsx";
import LoggedOutSection from "./LoggedOutSection.jsx";

const UserSection = () => {
  const isLogged = useQuery("isLogged", isCookiesExist, {
    staleTime: Infinity,
  }).data;
  const [isVisible, setIsVisible] = useState(false);

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };
  const { data } = useQuery("languagesAndCurrency", loadCurrencyAndLanguage, {
    staleTime: Infinity,
  });
  const handleCurrencyChange = (option) => {
    localStorage.setItem("currencyCode", option.code);
    localStorage.setItem("currencyLabel", option.label);
    window.location.reload();
  };
  const handleLanguageChange = (option) => {
    i18n.changeLanguage(option.label);
    localStorage.setItem("language", option.code);
    window.location.reload();
  };
  return (
    <>
      <div className="text-left text-[#1FB137] max-w-[200px] mr-20">
        <NavbarSelect
          options={data.currencyData}
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
          options={data.languageData}
          defaultValue={{
            value: i18n.language,
            label: i18n.language.toUpperCase(),
            code: localStorage.getItem("language"),
          }}
          handleChange={handleLanguageChange}
        />
      </div>
      {isVisible && !isLogged && <LoggedOutSection isVisible={isVisible} />}
      {isVisible && isLogged && <LoggedInSection isVisible={isVisible} />}
    </>
  );
};

export default UserSection;
