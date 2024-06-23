import React from "react";

const CreateRecipeButton = ({ handleClick }) => {
  return (
    <button onClick={handleClick} className="flex items-center">
      <span className="text-[#1FB137] flex items-center justify-center text-5xl m-0 p-0">
        +{" "}
      </span>{" "}
      <span className="text-[#1FB137] text-2xl font-bold mt-1 p-0">
        Create your recipe
      </span>
    </button>
  );
};

export default CreateRecipeButton;
