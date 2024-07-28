import React from "react";

const RecipeTitle = ({ title }) => {
  return (
    <div className="p-3">
      <p className="font-semibold text-[#1FB137]">{title}</p>
    </div>
  );
};

export default RecipeTitle;
