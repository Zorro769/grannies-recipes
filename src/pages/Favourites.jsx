import React, { useRef, useState } from "react";
import {
  fetchFavouritesRecipes,
  removeRecipeFromFavourites,
} from "utils/services";
import { useQuery } from "react-query";
import { useScroll } from "hooks/useScroll";
import usePersistState from "hooks/usePersistState";

import Header from "components/Shared/Header";
import RecipeList from "components/Home/Recipes/RecipeList";

const Favourites = () => {
  const [page, setPage] = usePersistState("page", 1);
  const recipesRef = useRef(null);
  const scroll = useScroll(recipesRef);

  const { data, refetch } = useQuery(
    "favourites",
    () => fetchFavouritesRecipes({ page }),
    {
      staleTime: Infinity,
    }
  );
  const [recipes, setRecipes] = useState(data.results);
  const handlePageChange = (page) => {
    setPage(page);
    scroll();
    refetch();
  };

  const handleSetRecipes = ({ newRecipes }) => {
    console.log(newRecipes);
    setRecipes(newRecipes);
  };
  return (
    <div className="w-full">
      <Header label={"Favourites"} />
      <div className="flex-grow overflow-y-auto p-20" ref={recipesRef}>
        <RecipeList
          recipes={recipes}
          count={data.itemsCount}
          page={page}
          handlePageChange={handlePageChange}
          handleFavouriteClick={removeRecipeFromFavourites}
          onFavouriteRemove={true}
          handleSetRecipes={handleSetRecipes}
        />
      </div>
    </div>
  );
};

export default Favourites;
