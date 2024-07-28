import React, { useEffect, useState, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import Select from "react-select";
import SearchBar from "components/Shared/SearchBar";
import sorts from "helpers/filterData";
import CreateRecipeButton from "./CreateRecipeButton";
import { fetchRandomRecipes } from "utils/fetchRecipesData";
import Dialogs from "./Dialogs";
import usePersistState from "../../../hooks/usePersistState";
import { useQuery } from "react-query";
import colorStyle from "helpers/styleReactSelect";
import RecipeList from "./RecipeList";
import { useNavigate, createSearchParams } from "react-router-dom";

const Recipes = () => {
  const recipesRef = useRef(null);
  const [searchParams, setSearchParams] = useState({
    query: "",
    cuisine: "",
    type: "",
    diet: "",
    maxReadyTime: 1000,
    sorts: sorts[0],
  });
  const [page, setPage] = usePersistState("page", 1);
  const fetchRecipesData = () => {
    return fetchRandomRecipes({ page });
  };
  const scrollToElement = () => {
    const { current } = recipesRef;
    if (current) {
      current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const { data } = useQuery(["recipes", page], fetchRecipesData, {
    staleTime: Infinity,
    onSuccess: () => {
      scrollToElement();
    },
  });
  const itemsCount = data?.totalPages || 1;

  const [filterDialog, setFilterDialog] = useState(false);
  const navigate = useNavigate();

  const handleSearchParamsChange = (event) => {
    setSearchParams({
      ...searchParams,
      [event.target.name]: event.target.value,
    });
  };

  const handleSearch = async (option=sorts[0]) => {
    const params = createSearchParams({
      ...(searchParams.query && { query: searchParams.query }),
      ...(searchParams.diet && { diet: JSON.stringify(searchParams.diet) }),
      ...(searchParams.type && { type: JSON.stringify(searchParams.type) }),
      ...(searchParams.cuisine && {
        cuisine: searchParams.cuisine,
      }),
      ...(searchParams.maxReadyTime && {
        maxReadyTime: searchParams.maxReadyTime,
      }),
      ...(searchParams.sorts && { sorts: JSON.stringify(option) }),
      page: (1).toString(),
    });
    navigate({
      pathname: "/search",
      search: params.toString(),
    });
  };

  const handleSortChanged = (option) => {
    handleSearch(option);
  };

  const handleFilterChanged = (value, name) => {
    setSearchParams((prev) => ({
      ...prev,
      [name.name]: value,
    }));
  };
  const handleFilterSubmit = () => {
    handleSearch();
  }
  const closeDialog = (reason) => {
    if (reason && reason !== "backdropClick") return;
    setFilterDialog(false);
  };

  const handleFilterClick = () => {
    setFilterDialog(true);
  };
  const handleQuerySubmit = () => {
    handleSearch();
  }
  const handlePageChange = (newPage) => {
    setPage(newPage);
    scrollToElement();
  };
  return (
    <div className="w-full text-center" ref={recipesRef}>
      <div className="w-full flex items-center justify-center pt-10 pb-5 px-0 md:px-10">
        <SearchBar
          placeholder="Eg. Cake, Vegan, Chicken"
          value={searchParams.query}
          onSubmit={handleQuerySubmit}
          onChange={handleSearchParamsChange}
        />
        <FaFilter
          className="cursor-pointer inline text-gray-600 ml-4 text-2xl"
          onClick={handleFilterClick}
        />
      </div>
      <div className="flex justify-end text-right">
        <CreateRecipeButton />
      </div>
      <div className="text-left max-w-[200px] font-bold text-[#1FB137]">
        <Select
          options={sorts}
          value={searchParams.sorts}
          name="sort"
          defaultValue={sorts[0]}
          styles={colorStyle}
          onChange={handleSortChanged}
        />
      </div>
      <div className="flex justify-center duration-0.7 bg-black mt-10">
        <RecipeList
          recipes={data?.results}
          count={itemsCount}
          page={page}
          handlePageChange={handlePageChange}
          onFavouriteRemove={false}
        />
      </div>
      <Dialogs
        closeDialog={closeDialog}
        filterDialog={filterDialog}
        handleFilterSubmit={handleFilterSubmit}
        handleFilterChange={handleFilterChanged}
        handleTimeChange={handleSearchParamsChange}
        searchParams={searchParams}
      />
    </div>
  );
};

export default Recipes;
