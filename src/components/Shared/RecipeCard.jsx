import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  removeRecipeFromFavourites,
  addRecipeToFavourite,
} from "utils/services";

import FavouriteButton from "./FavouriteButton";
import ImageSection from "components/RecipeCard/ImageSection";
import RecipeTitle from "components/RecipeCard/RecipeTitle";

const RecipeCard = ({
  recipe,
  flag,
  onFavouriteRemove,
  recipes,
  handleSetRecipes,
}) => {
  const { id, title } = recipe;

  const handleFavouriteClick = async () => {
    if (onFavouriteRemove) {
      const newRecipes = await removeRecipeFromFavourites({ id, recipes });
      console.log(newRecipes);
      handleSetRecipes({newRecipes});
    } else await addRecipeToFavourite({ id });
  };

  return (
    <div className="bg-_gradient shadow md:w-[220px] rounded-lg relative single-item">
      <div className="bg-_gradient shadow w-full rounded-lg relative ">
        <Link to={`/recipes/${recipe?._id || id}`} className="w-full md:w-full">
          <ImageSection data={recipe} />
          <RecipeTitle title={title} />
        </Link>
      </div>
      <div className="inline-block absolute right-4 top-2 ">
        <FavouriteButton
          id={id}
          flag={flag}
          handleFavouriteClick={handleFavouriteClick}
        />
      </div>
    </div>
  );
};

export default RecipeCard;
