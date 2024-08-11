import React from "react";
import { Banner1 } from "../../images";
import { useTranslation } from "react-i18next";

const images = [Banner1];

const Header = ({ label, image, type }) => {
  const { t } = useTranslation();
  return (
    <div className="w-full h-[100vh]">
      <div className="relative w-full h-full">
        <img
          src={image ?? images[Math.floor(Math.random() * images.length)]}
          alt="Hero"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute w-full h-full bg-gradient-to-t from-black to-transparent top-0 z-8 flex flex-col items-center justify-center pt-40 2xl:pt-20 px-4 ">
        <h1 className="text-white text-4xl md:text-5xl font-bold text-center">
          {label}
        </h1>
        {type && (
          <p className="text-xl mt-4 text-center text-green-500 bg-[#00000090] px-6 py-4 rounded-full ">
            {t("greeting1")}
            <br className="hidden md:block" />
            {t("greeting2")}
          </p>
        )}
      </div>
    </div>
  );
};

export default Header;
