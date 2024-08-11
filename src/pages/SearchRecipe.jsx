import React, { useState, useRef } from "react";
import SearchBar from "components/Shared/SearchBar";
import { useQuery } from "react-query";
import RecipeList from "../components/Home/Recipes/RecipeList";
import { useSearchParams } from "react-router-dom";
import { fetchRecipes } from "utils/fetchRecipesData";
import { useScroll } from "hooks/useScroll";
import SearchFilters from "components/SearchRecipes/SearchFilters";

const SearchRecipe = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const recipesRef = useRef(null);
  const scroll = useScroll(recipesRef);
  const fetchRecipesData = () => {
    return fetchRecipes({
      ...localSearchParams,
      ...(localSearchParams.diet && {
        diet: JSON.stringify(localSearchParams.diet),
      }),
      ...(localSearchParams.type && {
        type: JSON.stringify(localSearchParams.type),
      }),
      ...(localSearchParams.cuisine && {
        cuisine: JSON.stringify(localSearchParams.cuisine),
      }),
      ...(localSearchParams.sorts && {
        sorts: localSearchParams.sorts,
      }),
      page,
    });
  };
  const params = Object.fromEntries(searchParams.entries());

  const [localSearchParams, setLocalSearchParams] = useState({
    sorts: JSON.parse(params.sorts),
    ...(params.maxReadyTime && {
      maxReadyTime: JSON.parse(params.maxReadyTime),
    }),
    ...(params.cuisine && { cuisine: JSON.parse(params.cuisine) }),
    ...(params.type && { type: JSON.parse(params.type) }),
    ...(params.diet && { diet: JSON.parse(params.diet) }),
    page: parseInt(params.page),
    ...(params.query && {
      query: params.query,
    }),
  });
  const page = parseInt(params.page);

  const { data } = useQuery(["recipes", params], fetchRecipesData, {
    staleTime: Infinity,
    onSuccess: () => {
      scroll();
    },
  });

  const itemsCount = data?.totalPages || 1;
  const handleSortChanged = (option) => {
    if (option.label === "Random") {
      setLocalSearchParams({
        query: "",
        cuisine: "",
        type: "",
        diet: "",
        maxReadyTime: 1000,
        sorts: option,
        page: 1,
      });
    } else {
      setLocalSearchParams({
        ...localSearchParams,
        sorts: option,
        page: 1,
      });
    }
  };

  const handlePageChange = (page) => {
    setSearchParams({
      ...localSearchParams,
      ...(localSearchParams.diet && {
        diet: JSON.stringify(localSearchParams.diet),
      }),
      ...(localSearchParams.type && {
        type: JSON.stringify(localSearchParams.type),
      }),
      ...(localSearchParams.cuisine && {
        cuisine: JSON.stringify(localSearchParams.cuisine),
      }),
      ...(localSearchParams.sorts && {
        sorts: JSON.stringify(localSearchParams.sorts),
      }),
      page,
    });
    scroll();

  };
  const handleSearchParamsChange = (event) => {
    setLocalSearchParams((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleFilterChange = (value, name) => {
    setLocalSearchParams((prev) => ({
      ...prev,
      [name.name]: value,
    }));
  };
  const handleFilterSubmit = async () => {
    setSearchParams({
      ...localSearchParams,
      ...(localSearchParams.diet && {
        diet: JSON.stringify(localSearchParams.diet),
      }),
      ...(localSearchParams.type && {
        type: JSON.stringify(localSearchParams.type),
      }),
      ...(localSearchParams.cuisine && {
        cuisine: JSON.stringify(localSearchParams.cuisine),
      }),
      maxReadyTime: localSearchParams.maxReadyTime,
      sorts: JSON.stringify(localSearchParams.sorts),
      page: 1,
      ...(localSearchParams.query && { query: localSearchParams.query }),
    });
  };

  return (
    <div className="w-full text-center px-2 mt-10" ref={recipesRef}>
      <div className="w-full flex items-center justify-center pt-10 pb-5 px-0 md:px-10">
        <SearchBar
          placeholder="Eg. Cake, Vegan, Chicken"
          value={localSearchParams.query}
          onSubmit={handleFilterSubmit}
          onChange={handleSearchParamsChange}
        />
      </div>

      <div
        className="flex justify-center duration-0.7 py-10"
        style={{ backgroundColor: "black" }}
      >
        <div className="w-96 ml-10 px-6 border-r border-[#1FB137]">
          <SearchFilters
            values={localSearchParams}
            handleFilterChange={handleFilterChange}
            handleTimeChange={handleSearchParamsChange}
            handleSortChanged={handleSortChanged}
            handleFilterSubmit={handleFilterSubmit}
          />
        </div>
        <RecipeList
          recipes={data?.results}
          count={itemsCount}
          page={page}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SearchRecipe;
