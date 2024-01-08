import React, { useEffect, useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import Loading from './Loading'
import Searchbar from './SearchBar'
import RecipeCard from './RecipeCard'
import { fetchRandomRecipes } from '../utils'
import CreateRecipe from './CreateRecipe'
import Dialog from '@mui/material/Dialog';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import InfoDialog from './InfoDialog'


const Recipes = () => {
    const axiosPrivate = useAxiosPrivate();

    const [recipes, setRecipes] = useState([])
    const [query, setQuery] = useState('Dessert,Vegan')
    const [limit, setLimit] = useState(30)
    const [loading, setLaoding] = useState(false)
    const [openDialog, setOpenDialog] = useState(false);
    const [favourites, setFavourites] = useState([]);
    const [infoDialog, setInfoDialog] = useState(false);

    const handleChange = (e) => {
        setQuery(e.target.value)
    }
    const closeDialog = () => {
        setOpenDialog(false);
        setInfoDialog(false);
    }
    const openCreateRecipeDialog = () => {
        setOpenDialog(true);
    }
    const fetchRecipe = async () => {
        try {
            const data = await fetchRandomRecipes({ query, limit })
            setRecipes(data)
            setLaoding(false)
        } catch (error) {
            console.log(error);
        } 
        setLaoding(false)
    }
    const fetchFavourites = async () => {
        try {
            const data = await axiosPrivate.get("/recipes/favourite");
            setFavourites(data.data);
        }
        catch(err) {
            console.log(err);
        }
    }
    const handleSearchedRecipe = async (e) => {
        e.preventDefault()
        fetchRecipe()
    }

    const showMore = () => {
        setLimit(prev => prev + 10)
        fetchRecipe()
    }

    useEffect(() => {
        setLaoding(true)
        fetchRecipe()
        fetchFavourites();
      }, [])
    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <div className='w-full'>
            <div className='w-full flex items-center justify-center pt-10 pb-5 px-0 md:px-10'>
                <form className='w-full lg:w-2/4' onSubmit={handleSearchedRecipe}>
                    <Searchbar placeholder="eg. Cake, Vegan, Chicken"
                        handleInputChange={handleChange}
                        rightIcon={
                            <BiSearchAlt2 className='text-gray-600' onClick={handleSearchedRecipe} />
                        }
                    />
                </form>

            </div>
            <div className='text-white text-right'>
                    <button onClick={openCreateRecipeDialog}><span className='text-[#1FB137] text-base text-5xl'>+  </span><span className='text-[#1FB137] text-base font-bold'>Create your recipe</span></button>
                </div>
            
            {
                recipes?.length > 0 ? (
                    <>
                        <div className='w-full  flex flex-wrap gap-10 px-0 lg:px-10 py-10'>
                            {

                                recipes?.map((item, index) => (
                                    <RecipeCard recipe={item} key={index} flag={favourites.some((recipe) => recipe.recipe === item.id )}/>))
                            }
                        </div>

                        <div className='flex w-full items-center justify-center py-10'>

                            <button className="bg-green-800 text-white px-3 py-1 text-xl rounded-full text-sm" onClick={showMore}>Show More</button>
                        </div>
                    </>
                ) : <div className='text-white w-full items-center justify-center py-10'>
                    <p className='text-center'>No Recipe Found</p>
                </div>
            }
            <Dialog
        open={openDialog}
        onClose={closeDialog}
        fullWidth
        maxWidth='lg'
        PaperProps={{ style: { height: '750px' } }}>
        <CreateRecipe onClose={closeDialog}/>
      </Dialog>
      <Dialog
        open={infoDialog}
        onClose={closeDialog}
        fullWidth
        maxWidth='xs'
        PaperProps={{ style: { height: '100px', borderradius: '50%' }}}>
        <InfoDialog info={'You need to be logged in first'} onClose={closeDialog}/>
      </Dialog>
        </div>
    )
}

export default Recipes