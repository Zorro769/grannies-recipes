import { useEffect, useState, useCallback, memo } from "react";
import { fetchRecipe } from "../utils";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import RecipeCard from "./RecipeCard";
import Loading from "./Loading";
import Header from "../components/Header";

const Favourites = () => {
  const axiosPrivate = useAxiosPrivate();
  const [recipes, setRecipes] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(true);
  const fetchFavourites = async () => {
    try {
      const data = await axiosPrivate.get("/recipes/favourite");
      const fetchedFavourites = data.data;

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

  useEffect(() => {
    fetchFavourites();
  }, []);
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
        <div className="flex-grow overflow-y-auto p-20">
          {recipes?.length > 0 ? (
            <div className="w-full flex flex-wrap gap-10 px-0 lg:px-10 py-10">
              {recipes?.map((item, index) => (
                <RecipeCard
                  onClose={() => {
                    setRecipes((prevRecipes) => 
                      prevRecipes.filter((_, i) => i !== index)
                    );
                  }}
                  recipe={item}
                  key={recipes.id || index}
                  flag={flag}
                  shouldCallOnClose={true}
                />
              ))}
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
