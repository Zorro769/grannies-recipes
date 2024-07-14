import React from "react";
import { AiFillPushpin } from "react-icons/ai";

const Ingredients = ({ data }) => {
  return (
    <div className="w-full md:w-2/4 pr-1">
      <div className="flex flex-col gap-5">
        <p className="text-green-500 text-2xl underline">Ingredients</p>
        {data?.map((ingredient, index) => {
          return (
            <p key={index} className="text-neutral-100 flex gap-2 text-xl">
              <AiFillPushpin className="text-green-800 text-xl" /> {ingredient}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Ingredients;
