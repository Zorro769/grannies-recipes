import { useEffect, useState, useCallback, useRef } from "react";
import { fetchRecipe, fetchSortedRecipe } from "../utils";
import Pagination from "@mui/material/Pagination";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import RecipeCard from "./RecipeCard";
import Loading from "./Loading";
import Header from "../components/Header";

const Favourites = () => {
  const axiosPrivate = useAxiosPrivate();

  const [recipes, setRecipes] = useState([]);
  const [itemsCount, setItemsCount] = useState(5);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const recipesRef = useRef(null);
  const [flag, setFlag] = useState(true);
  const fetchFavourites = async (page = 1) => {
    try {
      const {
        data: { totalItems },
      } = await axiosPrivate.get(`/recipes/favourite?page=${page}&size=1`);

      const pageSize = Math.min(totalItems, 20);

      const response = await axiosPrivate.get(
        `/recipes/favourite?page=${page}&size=${pageSize}`
      );
      console.log(response?.data?.totalItems);
      setItemsCount(Math.ceil(response?.data?.totalItems / 20));
      const fetchedFavourites = response?.data.results;
      console.log(fetchedFavourites);
      setFavourites((prevFavourites) => {
        const updatedFavourites = [...prevFavourites, ...fetchedFavourites];
        return updatedFavourites;
      });

      setLoading(false);
      setRecipes(fetchedFavourites);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleClose = useCallback((recipeId) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== recipeId)
    );
  }, []);
  useEffect(() => {
    fetchFavourites();
  }, []);
  const handlePageChange = (event, value) => {
    fetchFavourites(value);
    recipesRef.current.scrollIntoView();
  };
  // if (loading) {
  //   return (
  //       <Loading />
  //   )
  // }
  return (
    <div className="w-full">
      <Header label={"Favourites"} />
      {/* <p className='text-[#1FB137] text-3xl block ml-10'>Favourites</p> */}

      {loading ? (
        <Loading />
      ) : (
        <div className="flex-grow overflow-y-auto p-20" ref={recipesRef}>
          {recipes?.length > 0 ? (
            <div className="w-full flex justify-center flex-wrap gap-10 px-0 lg:px-10 py-10">
              {recipes?.map((item, index) => (
                <RecipeCard
                  onClose={() => {
                    handleClose(item.id);
                  }}
                  recipe={item}
                  key={item.id}
                  flag={flag}
                  shouldCallOnClose={true}
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

export default Favourites;
