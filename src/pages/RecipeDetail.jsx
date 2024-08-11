import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buyRecipe } from "utils/services";
import useFetchRecipeDetail from "hooks/useFetchRecipeDetail";
import { addRecipeToFavourite } from "utils/services";

import Header from "components/Shared/Header";
import RecommendedRecipes from "components/RecipeDetail/RecommendedRecipes";
import RecipeInfo from "components/RecipeDetail/RecipeInfo";
import Ingredients from "components/RecipeDetail/Ingredients";
import RecipeInstructions from "components/RecipeDetail/RecipeInstructions";
import RecipeImage from "components/RecipeDetail/RecipeImage";
import PaymentButton from "components/RecipeDetail/PaymentButton";

const RecipeDetail = () => {
  const navigate = useNavigate();
  const recipesRef = useRef();
  const { id } = useParams();

  const data = useFetchRecipeDetail({ id });

  const handlePayment = async () => {
    const clientSecret = await buyRecipe({ id });
    navigate("/payment", { state: { clientSecret, data, } });
  };

  const handleFavouriteClick = async() => {
    await addRecipeToFavourite({id});
  }
  return (
    <div className="w-full" ref={recipesRef}>
      <Header label={data?.title || "Default Title"} />
      <div className="w-full px-4 lg:px-20 pt-5">
        <RecipeInfo data={data} />
        <div className="w-full flex flex-col md:flex-row gap-8 py-20 pxx-4 md:px-10">
          <RecipeImage
            id={id}
            image={data?.image}
            alt={data?.title}
            isFavourite={data?.isFavourite}
            handleFavouriteClick={handleFavouriteClick}
          />
          <Ingredients data={data?.extendedIngredients} />
        </div>
        <div className="flex flex-col gap-5">
          <RecipeInstructions data={data} />
          {data?.paymentStatus == false && (
            <PaymentButton data={data} handlePayment={handlePayment} />
          )}
          <div className="w-full pr-1 mt-10">
            <RecommendedRecipes id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecipeDetail;
