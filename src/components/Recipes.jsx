import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";
import { faArrowDownShortWide } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import colorStyle from "../utils/styleReactSelect";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "./Loading";
import RecipeCard from "./RecipeCard";
import { fetchRandomRecipes, fetchRecipes, fetchSortedRecipe } from "../utils";
import CreateRecipe from "./CreateRecipe";
import Dialog from "@mui/material/Dialog";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import InfoDialog from "./InfoDialog";
import Filter from "./Filter";

const Recipes = () => {
  const axiosPrivate = useAxiosPrivate();

  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("Dessert,Vegan");
  const [limit, setLimit] = useState(30);
  const [loading, setLaoding] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [infoDialog, setInfoDialog] = useState(false);
  const [filterDialog, setFilterDialog] = useState(false);
  const sorts = [
    { value: ["popularity", "desc"], label: "Most Popular" },
    { value: ["price", "asc"], label: "Less Price" },
    { value: ["price", "desc"], label: "Most Price" },
    { value: ["time", "asc"], label: "Less Time" },
    { value: ["time", "desc"], label: "Most Time" },
  ];
  const [sort, setSort] = useState(true);
  const [sortType, setSortType] = useState();

  const handleChange = (e) => {
    setQuery(e.target.value);
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
  const fetchRecipe = async () => {
    try {
      const data = await fetchRandomRecipes({ query, limit });
      setRecipes(data);
      setLaoding(false);
    } catch (error) {
      console.log(error);
    }
    setLaoding(false);
  };
  const fetchFavourites = async () => {
    try {
      const data = await axiosPrivate.get("/recipes/favourite");
      setFavourites(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleFilterClick = async () => {
    setFilterDialog(true);
  };
  const handleSearchedRecipe = async (e) => {
    try {
      setLaoding(true);
      e.preventDefault();
      const data = await fetchRecipes({ query, limit });
      setRecipes(data);
    } catch (err) {
      console.log(err);
    }
    setLaoding(false);
  };

  const showMore = () => {
    setLimit((prev) => prev + 10);
    fetchRecipe();
  };
  const handleSortTypeChange = async (option) => {
    // console.log("hello");
    const response = await fetchSortedRecipe(option);
    setRecipes(response);
  };
  useEffect(() => {
    setLaoding(true);
    fetchRecipe();
    fetchFavourites();
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="w-full text-center">
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
        {/* <div className="inline-block">
          <FontAwesomeIcon
            icon={faArrowDownShortWide}
            className=" cursor-pointer inline text-gray-600 ml-4 text-2xl"
            onClick={() => setSort(!sort)}
          />

          <div
            className={
              sort
                ? "absolute bg-black text-white z-50  border-2 border-[#1FB137]"
                : "hidden"
            }
          >
            <ul
              className="cursor-pointer space-y-4 "
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              {sorts.map((sortType) => (
                <li
                  value={sortType}
                  key={sortType}
                  className="border-[#1FB137] text-[#1FB137] p-3"
                >
                  {sortType}
                </li>
              ))}
            </ul>
          </div>
        </div> */}
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
        {/* </Link> */}
      </div>
      <div className="text-left text-[#1FB137] ">
        {/* <select
          id="dishSelect"
          className="border-none bg-black border p-y-2 pl-4 pr-10 text-[#1FB137]"
          onChange={(e) => setSortType(e.target.value)}
          value={sortType}
        >
          {sorts.map((sortType) => (
            <option key={sortType} value={sortType} className="border-none p-2">
              {sortType}
            </option>
          ))}
        </select> */}
        <Select
          className="basic-single min-w-[200px] inline-block border-transparent"
          options={sorts}
          defaultValue={sorts[0]}
          styles={{
            singleValue: (provided, state) => ({
              ...provided,
              color: "[#1FB137]", // Change to the desired color
            }),
            ...colorStyle, // Merge colorStyle with other styles
            control: (provided, state) => ({
              ...provided,
              border: "none",
              background: "black",
              // Add other styles if needed
            }),
            // Add other styles if needed
          }}
          onChange={(option) => handleSortTypeChange(option)}
        />
      </div>
      <div className="flex justify-center">
        {recipes?.length > 0 ? (
          <>
            <div className="w-full flex items-start flex-wrap gap-10 py-10">
              {recipes?.map((item, index) => (
                <RecipeCard
                  recipe={item}
                  key={index}
                  flag={favourites.some((recipe) => recipe.recipe === item.id)}
                />
              ))}
              <div className="bg-_gradient shadow md:w-[220px] self:center rounded-lg relative flex align-center justify-center">
                <button
                  className="bg-green-800 text-white px-3 py-30 text-xl rounded-full text-sm"
                  onClick={showMore}
                >
                  Show More
                </button>
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
        <Filter onClose={closeDialog} data={setRecipes} />
      </Dialog>
    </div>
  );
};

export default Recipes;
