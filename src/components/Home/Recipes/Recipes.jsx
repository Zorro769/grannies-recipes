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
    console.log(page);
    return fetchRandomRecipes({ page });
  };
  const [itemsCount, setItemsCount] = useState(5);
  const scrollToElement = () => {
    const { current } = recipesRef;
    if (current) {
      current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const { data, isLoading } = useQuery(["recipes", page], fetchRecipesData, {
    keepPreviousData: true,
    staleTime: Infinity,
    onSuccess: (data) => {
      setItemsCount(data.totalPages);
      scrollToElement();
    },
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [infoDialog, setInfoDialog] = useState(false);
  const [filterDialog, setFilterDialog] = useState(false);
  const navigate = useNavigate();

  const handleFilterSubmit = async () => {
    setSearchParams({
      limit: 10,
      ...searchParams,
      page: page || 1,
    });
    handleSearch();
  };

  const handleSearchParamsChange = (event) => {
    setSearchParams({
      ...searchParams,
      [event.target.name]: event.target.value,
    });
  };

  const handleSearch = async (option = sorts[0]) => {
    const params = createSearchParams({
      ...(searchParams.query && { query: searchParams.query }),
      ...(searchParams.diet && { diet: JSON.stringify(searchParams.diet) }),
      ...(searchParams.type && { type: JSON.stringify(searchParams.type) }),
      ...(searchParams.cuisine && {
        cuisine: JSON.stringify(searchParams.cuisine),
      }),
      ...(searchParams.maxReadyTime && {
        maxReadyTime: searchParams.maxReadyTime,
      }),
      ...(option && { sorts: JSON.stringify(option) }),
      page: (1).toString(),
    });
    navigate({
      pathname: "/search",
      search: params.toString(),
    });
  };

  const handleSortChanged = (option) => {
    setSearchParams({
      ...searchParams,
      sorts: option,
    });
    handleSearch(option);
  };

  const handleFilterChange = (value, name) => {
    setSearchParams((prev) => ({
      ...prev,
      [name.name]: value,
    }));
  };

  const closeDialog = (reason) => {
    if (reason && reason !== "backdropClick") return;
    setFilterDialog(false);
    setOpenDialog(false);
    setInfoDialog(false);
  };

  const handleFilterClick = () => {
    setFilterDialog(true);
  };

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
          onSubmit={handleSearch}
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
        />
      </div>
      <Dialogs
        closeDialog={closeDialog}
        openDialog={openDialog}
        infoDialog={infoDialog}
        filterDialog={filterDialog}
        handleFilterSubmit={handleFilterSubmit}
        handleFilterChange={handleFilterChange}
        handleTimeChange={handleSearchParamsChange}
        searchParams={searchParams}
      />
    </div>
  );
};

export default Recipes;
