import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";

//
const SearchBar = ({ placeholder, value, handleInputChange, handleSearchRecipe }) => {
  return (
    <form className="min-w-[600px] lg:w-2/4">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          className="bg-black border border-4 border-gray-800 text-gray-300 text-md rounded-full focus:ring-1 focus:ring-slate-800 focus:border-slate-800 block w-full p-2.5 outline-none px-5 placeholder:text-sm shadow-xl"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer">
          <BiSearchAlt2
            className="text-gray-600 text-2xl"
            onClick={handleSearchRecipe}
          />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
