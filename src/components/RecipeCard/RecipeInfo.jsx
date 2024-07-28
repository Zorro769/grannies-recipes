import React from "react";

const RecipeInfo = ({ data }) => {
  const { dishTypes, diets, cuisines, readyInMinutes } = data;
  return (
    <div className="absolute recipe-card-content flex gap-2 flex-wrap justify-center">
      <span className="px-2 py-1 text-[12px] capitalize bg-black shadow-xl rounded-full text-green-500">
        {readyInMinutes}
      </span>
      {dishTypes?.length > 0 ? (
        <span
          key={0}
          className="px-2 py-1 text-[12px] capitalize bg-black shadow-xl rounded-full text-green-500"
        >
          {dishTypes[0]}
        </span>
      ) : cuisines?.length > 0 ? (
        <span
          key={0}
          className="px-2 py-1 text-[12px] capitalize bg-black shadow-xl rounded-full text-green-500"
        >
          {cuisines[0]}
        </span>
      ) : (
        diets?.length > 0 && (
          <span
            key={0}
            className="px-2 py-1 text-[12px] capitalize bg-black shadow-xl rounded-full text-green-500"
          >
            {diets[0]}
          </span>
        )
      )}
    </div>
  );
};

export default RecipeInfo;
