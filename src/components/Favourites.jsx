import { useEffect, useState } from 'react'
import { fetchRecipe } from '../utils'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import RecipeCard from './RecipeCard'


const Favourites = ({onClose}) => {
  const axiosPrivate = useAxiosPrivate();
  const [recipes, setRecipes] = useState([])
  const [favourites, setFavourites] = useState([]);

  const fetchFavourites = async () => {
    try {
      const data = await axiosPrivate.get("/recipes/favourite");
      const fetchedFavourites = data.data;
  
      setFavourites((prevFavourites) => {
        const updatedFavourites = [...prevFavourites, ...fetchedFavourites];
        return updatedFavourites;
      });
  
      const recipesData = await Promise.all(
        fetchedFavourites.map(async (recipe) => {
          const recipeData = await fetchRecipe(recipe.recipe);
          return {...recipeData };
        })
      );
      setRecipes(recipesData);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    fetchFavourites();
  }, []);
  
  return (
    <div className='flex'>
    <div className='fixed w-[1280px] h-full bg-black'>
      <p className='text-[#1FB137] text-3xl block ml-10'>Favourites</p>
    </div>
  
    <div className='flex-grow overflow-y-auto'>
      {recipes?.length > 0 ? (
        <div className='w-full flex flex-wrap gap-10 px-0 lg:px-10 py-10'>
          {recipes?.map((item, index) => (
            <RecipeCard onClose={onClose} recipe={item} key={index} flag={favourites.some((recipe) => recipe.recipe === item.id)} />
          ))}
        </div>
      ) : (
        <div className='text-white w-full items-center justify-center py-10'>
          <p className='text-center'>No Recipe Found</p>
        </div>
      )}
    </div>
  </div>
  
  )
}

export default Favourites