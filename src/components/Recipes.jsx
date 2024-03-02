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

const Recipes = () => {
  const recipesRef = useRef(null);
  const axiosPrivate = useAxiosPrivate();

  const [cuisine, setCuisine] = useState("");
  const [type, setType] = useState("");
  const [diet, setDiet] = useState("");
  const [maxReadyTime, setMaxReadyTime] = useState();

  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("Dessert,Vegan");
  const [page, setPage] = useState(1);
  const [loading, setLaoding] = useState(false);
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

  const handleSubmit = async (e, page) => {
    setRecipeFlag("filter");
    const response = await fetchRecipes({
      limit: 10,
      type: type,
      diet: diet,
      maxReadyTime: maxReadyTime,
      cuisine: cuisine,
      page: page,
    });
    setRecipes(response?.results);
    setItemsCount(Math.ceil(response?.totalItems / 20));
  };
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handlePageChange = (event, value = currentPage) => {
    console.log(value);
    setLaoding(true);
    setPage(value);
    switch (recipeFlag) {
      case "random":
        fetchRecipe(value);
        break;
      case "search":
        handleSearchedRecipe(event, value);
        break;
      case "filter":
        handleSubmit(value);
        break;
      case "sort":
        handleSortTypeChange(sortType, value);
    }

    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    navigate({ search: searchParams.toString() });
    recipesRef.current.scrollIntoView();
  };
  const closeDialog = (reason) => {
    if (reason && reason === "backdropClick") return;
    setOpenDialog(false);
    setInfoDialog(false);
    setFilterDialog(false);
  };
  const openCreateRecipeDialog = () => {
    setOpenDialog(true);
  };
  const fetchRecipe = async (page) => {
    try {
      await axiosPrivate.get("/recipes");
      const data = await fetchRandomRecipes({ page });
      setItemsCount(Math.ceil(data?.totalItems / 20));
      setRecipes(data?.results);
      // setRecipes(data?.results);
      setRecipeLoading(false);
      setLaoding(false);
    } catch (error) {
      console.log(error);
    }
    setLaoding(false);
  };
  const handleSearchTypeChanged = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", 1);
    navigate({ search: searchParams.toString() });
  };
  const handleFilterClick = async () => {
    handleSearchTypeChanged();
    setFilterDialog(true);
  };
  const handleSearchedRecipe = async (e, page) => {
    try {
      handleSearchTypeChanged();
      setRecipeFlag("search");
      setLaoding(true);
      e.preventDefault();
      const data = await fetchRecipes({ query, page });
      setRecipes(data?.results);
      setItemsCount(Math.ceil(data?.totalItems / 20));
      setRecipeLoading(false);
    } catch (err) {
      console.log(err);
    }
    setLaoding(false);
  };
  const handleSortTypeChange = async (option, page) => {
    handleSearchTypeChanged();
    setSortType(option);
    const response = await fetchSortedRecipe({ value: option, page: page });
    setRecipeFlag("sort");
    setRecipes(response?.results);
    setRecipeLoading(false);
    setItemsCount(Math.ceil(response?.totalItems / 20));
  };
  useEffect((e) => {
    setLaoding(true);
    fetchRecipe();
    window.addEventListener("storage", handlePageChange(e,currentPage));

    return () => {
      window.removeEventListener("storage", handlePageChange);
    };
  }, []);

  if (loading) {
    return <Loading />;
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
              placeholder="eg. Cake, Vegan, Chicken"
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
          defaultValue={sorts[0]}
          styles={{
            singleValue: (provided, state) => ({
              ...provided,
              color: "[#1FB137]",
            }),
            ...colorStyle,
            control: (provided, state) => ({
              ...provided,
              border: "none",
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
        maxWidth="lg"
        PaperProps={{
          style: {
            height: "750px",
            border: "5px solid gray",
            borderRadius: "50px",
          },
        }}
        disableBackdropClick={true}
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
          handleSubmit={handleSubmit}
          setCuisine={setCuisine}
          setDiet={setDiet}
          setType={setType}
          setMaxReadyTime={setMaxReadyTime}
          cuisine={cuisine}
          diet={diet}
          type={type}
          maxReadyTime={maxReadyTime}
        />
      </Dialog>
    </div>
  );
};

export default Recipes;
