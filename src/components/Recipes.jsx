import React, { useEffect, useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import Loading from './Loading'
import Searchbar from './SearchBar'
import RecipeCard from './RecipeCard'
import { fetchRecipes } from '../utils'
import Button from './Button'
import CreateRecipe from './CreateRecipe'
import Dialog from '@mui/material/Dialog';
import { GrAdd } from "react-icons/gr";
const Recipes = () => {
    const [recipes, setRecipes] = useState([])
    const [query, setQuery] = useState('Dessert,Vegan')
    const [limit, setLimit] = useState(30)
    const [loading, setLaoding] = useState(false)
    const [openDialog, setOpenDialog] = useState(false);

    const handleChange = (e) => {
        setQuery(e.target.value)
    }
    const closeCreateRecipeDialog = () => {
        setOpenDialog(false);
    }
    const openCreateRecipeDialog = () => {
        setOpenDialog(true);
    }
    const fetchRecipe = async () => {
        // try {
            const data = await fetchRecipes({ query, limit })

            setRecipes(data)
            setLaoding(false)
        // } catch (error) {
        // } finally {
            setLaoding(false)
        // }
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
      }, [])


      const createRecipeClick = () => {

      }
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
                                    <RecipeCard recipe={item} key={index} />))
                            }
                        </div>

                        <div className='flex w-full items-center justify-center py-10'>

                            <Button
                                title="Show More"
                                containerStyle="bg-green-800 text-white px-3 py-1 rounded-full text-sm"
                                handleClick={showMore}
                            />
                        </div>
                    </>
                ) : <div className='text-white w-full items-center justify-center py-10'>
                    <p className='text-center'>No Recipe Found</p>
                </div>
            }
            <Dialog
        open={openDialog}
        onClose={closeCreateRecipeDialog}
        fullWidth
        maxWidth='lg'
        PaperProps={{ style: { height: '750px' } }}>
        <CreateRecipe />
      </Dialog>
        </div>
    )
}

export default Recipes