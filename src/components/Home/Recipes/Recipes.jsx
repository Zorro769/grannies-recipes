import React, { useEffect, useState, useRef, Suspense } from "react";
import { FaFilter } from "react-icons/fa";
import Select from "react-select";
import Loading from "../../Shared/Loading";
import SearchBar from "components/Shared/SearchBar";
import sorts from "helpers/filterData";
import CreateRecipeButton from "./CreateRecipeButton";
import { fetchRandomRecipes, fetchRecipes } from "utils/fetchRecipesData";
import Dialogs from "./Dialogs";
import usePersistState from "../../../hooks/usePersistState";
import colorStyle from "helpers/styleReactSelect";
import RecipeList from "./RecipeList";

const Recipes = () => {
  const recipesRef = useRef(null);
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = usePersistState("page", 1);
  const [loading, setLoading] = useState(false);
  const [itemsCount, setItemsCount] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoDialog, setInfoDialog] = useState(false);
  const [filterDialog, setFilterDialog] = useState(false);
  const isInitialMount = useRef(true);
  const [searchParams, setSearchParams] = usePersistState("searchParams", {
    query: "",
    cuisine: "",
    type: "",
    diet: "",
    maxReadyTime: 1000,
    sort: sorts[0],
  });
  const fetchRecipe = async () => {
    setLoading(true);
    try {
      const data = await fetchRandomRecipes({ page: page });
      setItemsCount(Math.ceil(data?.totalItems / 20));
      setRecipes(data?.results);
    } catch (error) {
      const data = await fetchRandomRecipes(page);
      setItemsCount(Math.ceil(data?.totalItems / 20));
      setRecipes(data?.results);
      console.log(error);
    }
    setLoading(false);
  };
  const handleFilterSubmit = async () => {
    setLoading(true);
    console.log(searchParams);
    const response = await fetchRecipes({
      limit: 10,
      ...searchParams,
      type: JSON.stringify(searchParams.type),
      diet: JSON.stringify(searchParams.diet),
      cuisine: JSON.stringify(searchParams.cuisine),
      page: page || 1,
    });
    setLoading(false);
    setRecipes(response?.results);
    setItemsCount(Math.ceil(response?.totalItems / 20));
  };

  const handleSearch = async () => {
    if (
      searchParams.sort.label === "Random" &&
      (searchParams.query.length !== 0 ||
        searchParams.diet.length !== 0 ||
        searchParams.cuisine.length !== 0 ||
        searchParams.type.length !== 0 ||
        searchParams.maxReadyTime !== 1000)
    ) {
      await handleFilterSubmit();
    } else {
      await fetchRecipe();
    }
  };

  const handleSearchParamsChange = (event) => {
    setSearchParams({
      ...searchParams,
      [event.target.name]: event.target.value,
    });
  };
  const hadnleFilterChange = (value, name) => {
    const simulatedEvent = {
      target: {
        value: value,
        name: name.name,
      },
    };
    handleSearchParamsChange(simulatedEvent);
  };
  const closeDialog = (reason) => {
    if (reason && reason !== "backdropClick") return;
    setFilterDialog(false);
    setOpenDialog(false);
    setInfoDialog(false);
  };

  const openCreateRecipeDialog = () => {
    setOpenDialog(true);
  };
  const handleFilterClick = () => {
    setFilterDialog(true);
  };
  const handlePageChange = (page) => {
    setPage(page);
  };
  const handleSortChanged = (option) => {
    if (option.label === "Random") {
      setSearchParams({
        query: "",
        cuisine: "",
        type: "",
        diet: "",
        sort: option,
        maxReadyTime: 1000,
      });
      setPage(1);
    } else {
      setSearchParams({
        ...searchParams,
        sort: option,
      });
    }
  };
  const scrollToElement = () => {
    const { current } = recipesRef;
    if (!loading && current) {
      current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleEffect = async () => {
      if (searchParams.sort && searchParams.sort.label === "Random") {
        await fetchRecipe();
      } else {
        await handleFilterSubmit();
      }

      if (isInitialMount.current) {
        isInitialMount.current = false;
        await handleSearch();
      } else {
        await handleSearch();
      }
    };

    handleEffect();
  }, [searchParams, page]);

  useEffect(() => {
    scrollToElement();
  }, [loading]);

  return (
    <div className="w-full text-center" ref={recipesRef}>
      <div className="w-full flex items-center justify-center pt-10 pb-5 px-0 md:px-10">
        <SearchBar
          placeholder="Eg. Cake, Vegan, Chicken"
          value={searchParams.query}
          handleInputChange={handleSearchParamsChange}
          handleSearchRecipe={handleSearch}
        />
        <FaFilter
          className="cursor-pointer inline text-gray-600 ml-4 text-2xl"
          onClick={handleFilterClick}
        />
      </div>
      <div className="flex justify-end text-right">
        <CreateRecipeButton handleClick={openCreateRecipeDialog} />
      </div>
      <div className="text-left max-w-[200px] font-bold text-[#1FB137]">
        <Select
          options={sorts}
          value={searchParams.sort}
          name="sort"
          defaultValue={sorts[0]}
          styles={colorStyle}
          onChange={handleSortChanged}
        />
      </div>
      <div
        className="flex justify-center duration-0.7"
        style={{ backgroundColor: "black" }}
      >
        <Suspense fallback={<Loading />}>
          <RecipeList
            recipes={recipes}
            count={itemsCount}
            page={page}
            handlePageChange={handlePageChange}
          />
        </Suspense>
      </div>
      <Dialogs
        closeDialog={closeDialog}
        openDialog={openDialog}
        infoDialog={infoDialog}
        filterDialog={filterDialog}
        handleFilterSubmit={handleFilterSubmit}
        handleFilterChange={hadnleFilterChange}
        searchParams={searchParams}
      />
    </div>
  );
};

export default Recipes;
