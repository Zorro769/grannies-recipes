import React, { useState, useCallback, useRef } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import Header from "components/Shared/Header";
import RecipeList from "components/Home/Recipes/RecipeList";
import fetchFavouritesResource from "utils/fetchFavouriteRecipes";

const FavouritesData = ({ initialResource }) => {
  const axiosPrivate = useAxiosPrivate();
  const [page, setPage] = useState(1);
  const [resource, setResource] = useState(initialResource);
  const recipesRef = useRef(null);

  const { results: recipes, totalItems } = resource.read().data;
  const itemsCount = Math.ceil(totalItems / 20);

  // const handlePageChange = useCallback(
  //   (event, value) => {
  //     setPage(value);
  //     setResource(fetchFavouritesResource(axiosPrivate, value));
  //     recipesRef.current?.scrollIntoView();
  //   },
  //   [axiosPrivate]
  // );

  return (
    <div className="w-full">
      <Header label={"Favourites"} />
      <div className="flex-grow overflow-y-auto p-20" ref={recipesRef}>
        <RecipeList
          recipes={recipes}
          count={itemsCount}
          page={page}
          // handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default FavouritesData;
