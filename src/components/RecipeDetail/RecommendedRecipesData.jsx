import React from "react";
import RecipeCard from "components/Shared/RecipeCard";

const RecommendedRecipesData = ({data}) => {
  return (
    <>
      <div className="flex flex-col gap-5"></div>
      {data?.length > 0 && (
        <>
          <p className="text-white text-2xl">Also Try This</p>

          <div className="flex flex-wrap gap-5 px-1 pt-3">
            {data?.map((item, index) => (
              <RecipeCard recipe={item} index={index} flag={item.isFavourite} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default RecommendedRecipesData;
