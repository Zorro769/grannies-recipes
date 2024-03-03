import React from "react";
import { useEffect, useState, useRef } from "react";
import Pagination from "@mui/material/Pagination";
import { fetchRecipe } from "../utils";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import RecipeCard from "./RecipeCard";
import Header from "../components/Header";
import Loading from "./Loading";

const MyRecipes = ({ onClose }) => {
  const axiosPrivate = useAxiosPrivate();
  const [recipes, setRecipes] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);
  const [itemsCount, setItemsCount] = useState(5);
  const [loading, setLoading] = useState(true);
  const recipesRef = useRef(null);

  const fetchMyRecipes = async (event, page = 1) => {
    try {
      setLoading(true);
      const {
        data: { totalItems },
      } = await axiosPrivate.get(
        `/recipes?page=${page}&size=1`
      );
      const pageSize = Math.min(totalItems, 20);
      const response = await axiosPrivate.get(
        `/recipes?page=${page}&size=${pageSize}&language=${localStorage.getItem(
          "language"
        )}&currency=${localStorage.getItem("currencyCode")}`
      );
      setItemsCount(Math.ceil(response?.data?.totalItems / 20));
      const fetchedMyRecipes = response?.data.results;
      setMyRecipes(fetchedMyRecipes);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handlePageChange = (event, value) => {
    fetchMyRecipes(value);
    recipesRef.current.scrollIntoView();
  };
  useEffect(() => {
    fetchMyRecipes();
    window.addEventListener("storage", fetchMyRecipes);

    return () => {
      window.removeEventListener("storage", fetchMyRecipes);
    };
  }, []);
  return (
    <div className="w-full">
      <Header label={"My Recipes"} />
      {loading ? (
        <Loading />
      ) : (
        <div className="flex-grow overflow-y-auto p-20" ref={recipesRef}>
          {myRecipes?.length > 0 ? (
            <>
              <div className="w-full justify-center flex flex-wrap gap-10 px-0 lg:px-10 py-10">
                {myRecipes?.map((item, index) => (
                  <RecipeCard
                    recipe={item}
                    key={index}
                    favouriteFlag={false}
                    onClose={onClose}
                  />
                ))}
                <div className="flex justify-center mt-10 w-full bg-black">
                  <Pagination
                    count={itemsCount}
                    variant="outlined"
                    shape="rounded"
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
      )}
    </div>
  );
};

export default MyRecipes;
