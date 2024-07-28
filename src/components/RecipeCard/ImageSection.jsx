import React from "react";
import RecipeInfo from "components/RecipeCard/RecipeInfo";
import defaultImage from "images/default_recipe.jpg";

const ImageSection = ({ data }) => {
  const { image, title } = data;
  return (
    <div className="relative">
      <img
        src={image || defaultImage}
        alt={title}
        className="rounded-lg h-[200px] md:h-[150px] w-full"
      />
      <RecipeInfo data={data} />
    </div>
  );
};

export default ImageSection;
