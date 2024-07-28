import React from "react";
import RecipeCard from "../../Shared/RecipeCard";
import SharedPagination from "../../Shared/Pagination";

const RecipeList = ({
  recipes,
  count,
  page,
  handlePageChange,
  onFavouriteRemove,
  handleSetRecipes,
}) => {
  return recipes?.length > 0 ? (
  // return (
    <>
      <div className="w-full flex items-start justify-center flex-wrap gap-10 ">
        {recipes?.map((item) => (
          <RecipeCard
            recipe={item}
            recipes={recipes}
            key={item.id}
            flag={item.isFavourite}
            onFavouriteRemove={onFavouriteRemove}
            handleSetRecipes={handleSetRecipes}
          />
        ))}
        <div className="flex justify-center mt-10 w-full bg-black">
          <SharedPagination
            count={Number(count)}
            page={page}
            handleChange={handlePageChange}
          />
        </div>
      </div>
    </>
  // );
  ) : (
    <div className="text-white w-full items-center justify-center py-10">
      <p className="text-center">No Recipe Found</p>
    </div>
  );
};

export default RecipeList;
