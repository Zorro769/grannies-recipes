import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import Select from "react-select";
import colorStyle from "../utils/styleReactSelect";

import Loading from "./Loading";
import RecipeCard from "./RecipeCard";
import { fetchRandomRecipes, fetchRecipes, fetchSortedRecipe } from "../utils";
import CreateRecipe from "./CreateRecipe";
import Dialog from "@mui/material/Dialog";
import InfoDialog from "./InfoDialog";
import Filter from "./Filter";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import i18n from "../i18n/i18n";

const Recipes = () => {
  const recipesRef = useRef(null);
  const axiosPrivate = useAxiosPrivate();

  const [cuisine, setCuisine] = useState("");
  const [type, setDishType] = useState("");
  const [diet, setDiet] = useState("");
  const [maxReadyTime, setMaxReadyTime] = useState();
  const [shouldScroll, setShouldScroll] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("Dessert,Vegan");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [itemsCount, setItemsCount] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [infoDialog, setInfoDialog] = useState(false);
  const [filterDialog, setFilterDialog] = useState(false);
  const [recipeFlag, setRecipeFlag] = useState("random");

  const sorts = [
    { value: ["popularity", "desc"], label: "Most Popular" },
    { value: ["price", "asc"], label: "Less Price" },
    { value: ["price", "desc"], label: "Most Price" },
    { value: ["time", "asc"], label: "Less Time" },
    { value: ["time", "desc"], label: "Most Time" },
  ];
  const [sort, setSort] = useState(true);
  const [sortType, setSortType] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page")) || 1;
  useEffect(() => {
    if (!loading && recipesRef.current) {
      recipesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);
  const handleFilterSubmit = async (e, page = 1) => {
    console.log(page);
    const formData = new FormData();
    setRecipeFlag("filter");
    setLoading(true);
    const response = await fetchRecipes({
      limit: 10,
      type: JSON.stringify(type),
      diet: JSON.stringify(diet),
      cuisine: JSON.stringify(cuisine),
      maxReadyTime: maxReadyTime,
      page: page,
    });
    setLoading(false);
    setRecipes(response?.results);
    setItemsCount(Math.ceil(response?.totalItems / 20));
  };
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handlePageChange = (event, value = currentPage) => {
    setPage(value);
    setLoading(true);

    switch (recipeFlag) {
      case "random":
        fetchRecipe(value);
        break;
      case "search":
        handleSearchedRecipe(event, value);
        break;
      case "filter":
        handleFilterSubmit(event, value);
        break;
      case "sort":
        handleSortTypeChange(sortType, value);
    }

    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    navigate({ search: searchParams.toString() });
  };
  const closeDialog = (reason) => {
    if (reason && reason !== "backdropClick") return;
    setOpenDialog(false);
    setInfoDialog(false);
    setFilterDialog(false);
  };
  const openCreateRecipeDialog = () => {
    setOpenDialog(true);
  };
  const fetchRecipe = async (page) => {
    try {
      setSortType(sorts[0]);
      setLoading(true);
      await axiosPrivate.get("/recipes");
      const data = await fetchRandomRecipes({ page });
      setItemsCount(Math.ceil(data?.totalItems / 20));
      setRecipes(data?.results);
      setShouldScroll(true);
      await scrollToElement();
    } catch (error) {
      const data = await fetchRandomRecipes({ page });
      setItemsCount(Math.ceil(data?.totalItems / 20));
      setRecipes(data?.results);
      console.log(error);
    }
    setLoading(false);
  };
  const scrollToElement = async () => {
    const { current } = recipesRef;
    if (current !== null) {
      await new Promise((resolve) => setTimeout(resolve, 0));
      current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleSearchTypeChanged = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", 1);
    navigate({ search: searchParams.toString() });
  };
  const handleFilterClick = async () => {
    handleSearchTypeChanged();
    setFilterDialog(true);
    // setLoading(true);
  };
  const handleSearchedRecipe = async (e, page) => {
    try {
      setSortType(sorts[0]);
      setLoading(true);
      handleSearchTypeChanged();
      setRecipeFlag("search");
      e.preventDefault();
      const data = await fetchRecipes({ query, page });
      setRecipes(data?.results);
      setItemsCount(Math.ceil(data?.totalItems / 20));
      setRecipeLoading(false);
      const queryParams = new URLSearchParams(location.search);
      queryParams.set("query", query);
      const currentPage = queryParams.get("query");
      console.log(currentPage);
      const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
      window.history.replaceState(null, null, newUrl);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  const handleSortTypeChange = async (option, page) => {
    setLoading(true);
    handleSearchTypeChanged();
    setSortType(option);
    const response = await fetchSortedRecipe({ value: option, page: page });
    setRecipeFlag("sort");
    setRecipes(response?.results);
    setRecipeLoading(false);
    setItemsCount(Math.ceil(response?.totalItems / 20));
    setLoading(false);
  };
  useEffect((e) => {
    localStorage.setItem("language", i18n.language.toLowerCase());
    setLoading(true);

    if (queryParams.get("query")) {
      setQuery(queryParams.get("query"));
      console.log("hello");
      handleSearchedRecipe(e, currentPage);
    } else {
      fetchRecipe();
    }
    window.addEventListener("storage", handlePageChange);

    return () => {
      window.removeEventListener("storage", handlePageChange);
    };
  }, []);

  if (loading) {
    return <Loading ref={recipesRef} />;
  }
  return (
    <div className="w-full text-center" ref={recipesRef}>
      <div className="w-full flex items-center justify-center pt-10 pb-5 px-0 md:px-10">
        <form
          className="min-w-[600px] lg:w-2/4"
          onSubmit={handleSearchedRecipe}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Eg. Cake, Vegan, Chicken"
              onChange={handleChange}
              className="bg-black border border-4 border-gray-800 text-gray-300 text-md rounded-full focus:ring-1 focus:ring-slate-800 focus:border-slate-800 block w-full p-2.5 outline-none px-5 placeholder:text-sm shadow-xl"
            />

            <div className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer">
              <BiSearchAlt2
                className="text-gray-600 text-2xl"
                onClick={handleSearchedRecipe}
              />
            </div>
          </div>
        </form>
        <FaFilter
          className=" cursor-pointer inline text-gray-600 ml-4 text-2xl"
          onClick={handleFilterClick}
        />
      </div>
      <div className="text-white flex justify-end text-right">
        {/* <Link to="/createrecipe"> */}
        <button onClick={openCreateRecipeDialog} className="flex items-center">
          <span className="text-[#1FB137] flex items-center justify-center text-5xl m-0 p-0">
            +{" "}
          </span>{" "}
          <span className="text-[#1FB137] text-2xl font-bold mt-1 p-0">
            Create your recipe
          </span>
        </button>
      </div>
      <div className="text-left text-[#1FB137] ">
        <Select
          className="basic-single min-w-[200px] inline-block border-transparent"
          options={sorts}
          value={sortType}
          defaultValue={sorts[0]}
          styles={{
            singleValue: (provided, state) => ({
              ...provided,
              color: "[#1FB137]",
            }),
            ...colorStyle,
            control: (provided, state) => ({
              ...provided,
              border: "1px solid green",
              background: "black",
            }),
          }}
          onChange={(option) => handleSortTypeChange(option)}
        />
      </div>
      <div
        className="flex justify-center duration-0.7"
        style={recipeLoading ? { opacity: 0 } : { backgroundColor: "black" }}
      >
        {recipes?.length > 0 ? (
          <>
            <div className="w-full flex items-start flex-wrap gap-10 py-10">
              {!recipeLoading ? (
                recipes?.map((item, index) => (
                  <RecipeCard
                    recipe={item}
                    key={index}
                    flag={item.isFavourite}
                  />
                ))
              ) : (
                <Loading />
              )}
              <div className="flex justify-center mt-10 w-full bg-black">
                <Pagination
                  count={Number(itemsCount)}
                  variant="outlined"
                  shape="rounded"
                  page={currentPage}
                  defaultPage={1}
                  sx={{
                    color: "green",
                    backgroundColor: "black",
                    padding: 5 + "px",
                    border: "none ",
                    "& .MuiPaginationItem-page": {
                      border: "2px solid green",
                      color: "green !important",
                      "&:hover": {
                        backgroundColor: "darkgreen",
                        color: "white !important",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "darkgreen",
                        color: "white !important",
                      },
                    },
                  }}
                  onChange={handlePageChange}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="text-white w-full items-center justify-center py-10">
            <p className="text-center">No Recipe Found</p>
          </div>
        )}
      </div>
      <Dialog
        open={openDialog}
        onClose={closeDialog}
        fullWidth
        className="create-recipe-dialog"
        maxWidth="lg"
        PaperProps={{
          style: {
            height: "750px",
            border: "5px solid gray",
            borderRadius: "50px",
            background: "transparent",
          },
        }}
        disableBackdropClick={false}
      >
        <CreateRecipe onClose={closeDialog} />
      </Dialog>
      <Dialog
        open={infoDialog}
        onClose={closeDialog}
        fullWidth
        maxWidth="xs"
        PaperProps={{ style: { height: "100px", borderradius: "50%" } }}
      >
        <InfoDialog
          info={"You need to be logged in first"}
          onClose={closeDialog}
        />
      </Dialog>
      <Dialog
        open={filterDialog}
        onClose={closeDialog}
        fullWidth
        maxWidth="xs"
        PaperProps={{ style: { height: "500px" } }}
      >
        <Filter
          onClose={closeDialog}
          handleFilterSubmit={handleFilterSubmit}
          setCuisine={setCuisine}
          setDiet={setDiet}
          setDishType={setDishType}
          setMaxReadyTime={setMaxReadyTime}
          cuisine={cuisine}
          diet={diet}
          type={type}
          // setLoading={setLoading}
          maxReadyTime={maxReadyTime}
        />
      </Dialog>
    </div>
  );
};

export default Recipes;
