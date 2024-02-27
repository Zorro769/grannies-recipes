import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { fetchRecipes } from "../utils/index";
import { cuisines, dishTypes, diets } from "../utils/recipeData";

const Filter = (props) => {
  useEffect(() => {
    props.setCuisine("");
    props.setDiet("");
    props.setMaxReadyTime();
    props.setType("");
  }, []);
  return (
    <div className="bg-black h-full p-5">
      <div className="flex justify-end">
        <IoMdClose
          className="cursor-pointer text-gray-600 text-xl"
          onClick={props.onClose}
        />
      </div>

      <form action="" className="text-left w-[340px]">
        <p className="text-green-500 text-2xl underline">Filters</p>
        <label className="text-[#1FB137] text-base font-bold inline-block mt-5 w-full">
          Cuisine type:
          <select
            id="cuisineSelect"
            className="border-[#1FB137] bg-black border w-full py-2 pl-4 pr-10"
            onChange={(e) => props.setCuisine(e.target.value)}
            value={props.cuisine}
          >
            <option value="" disabled selected>
              Select your Cuisine Type
            </option>
            {cuisines.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </label>
        <label className="text-[#1FB137] text-base font-bold inline-block mt-5 w-full">
          Dish type:
          <select
            id="dishSelect"
            className="border-[#1FB137] bg-black border w-full py-2 pl-4 pr-10"
            onChange={(e) => props.setType(e.target.value)}
            value={props.type}
          >
            <option value="" disabled selected>
              Select your Dish Type
            </option>
            {dishTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className="text-[#1FB137] text-base font-bold inline-block mt-5 w-full">
          Diet:
          <select
            id="dishSelect"
            className="border-[#1FB137] bg-black border w-full py-2 pl-4 pr-10"
            onChange={(e) => props.setDiet(e.target.value)}
            value={props.diet}
          >
            <option value="" disabled selected>
              Select your Diet
            </option>
            {diets.map((diet) => (
              <option key={diet} value={diet}>
                {diet}
              </option>
            ))}
          </select>
        </label>
        <label className="text-[#1FB137] text-base font-bold inline-block mt-5 w-full">
          Total time(in min):
          <br />
          <input
            type="number"
            placeholder="Enter total time"
            onWheel={(e) => e.target.blur()}
            name="time"
            id="time"
            className=" border-[#1FB137] bg-black border w-full py-2 pl-4 pr-10"
            onChange={(e) => props.setMaxReadyTime(e.target.value)}
          />
        </label>
        <div className="text-right">
          <button
            type="button"
            className="mt-7 bg-[#166534] w-[130px] h-[45px]  rounded-3xl text-white text-xl self-right"
            onClick={(e) => {
              props.handleSubmit(e);
              props.onClose();
            }}
          >
            Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
