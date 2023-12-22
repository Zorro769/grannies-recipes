import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchRecipe, fetchRecipes } from '../utils'
import Loading from '../components/Loading'
import Header from '../components/Header'
// import useRefreshToken from "../hooks/useRefreshToken";
import axios, { axiosPrivate } from "../api/axios";

import { AiFillPushpin, AiOutlineConsoleSql } from "react-icons/ai"
import { BsPatchCheck } from "react-icons/bs"
import RecipeCard from '../components/RecipeCard'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../context/AuthProvider";


const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null)
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [containsLI, setContainsLI] = useState(false); // Declare containsLI stat
  const axiosPrivate = useAxiosPrivate();

  // const refresh = useRefreshToken();

 
    

  
  const { id } = useParams()
  useEffect(() => {
    const getRecipe = async (id) => {
      try {
        const respone = await axiosPrivate.get("/users/allusers");
        setLoading(true)
      
        const data = await fetchRecipe(id)
  
        setRecipe(data)
  
        const recommend = await fetchRecipes({ query: recipe?.label, limit: 5 })
  
        setRecipes(recommend)
  
        setLoading(false)
        const containsLIValue  = recipe?.instructions.includes("<li>") || recipe?.instructions.includes("\n");
        setContainsLI(containsLIValue );
      } catch (error) {
        console.log(error)
  
        setLoading(false)
      }
    }
    getRecipe(id);
  }, [id])
  

  // useEffect(() => {
  //   getRecipe(id)
  // }, [id])


  if (loading) {
    return (
      <div className='w-full h-[100vh] flex items-center justify-center'>
        <Loading />
      </div>
    );
  }
  // getRecipe(id);
  return (
    <div className='w-full'>
      <Header
        label={recipe?.title || "Default Title"}
      />

      <div className='w-full px-4 lg:px-20 pt-5'>

        <div className='flex gap-10 items-center justify-center px-4'>
          <div className='flex flex-col justify-between'>
            <span className='text-white text-center border border-gray-500 py-1.5 px-2 rounded-full mb-2'>{recipe?.cheap ? <span>cheap</span> : <span>expensive</span> } </span>

            <span className='text-center text-neutral-100 text-[12px] md:text-md'>EVALUATION</span>
          </div>

          <div className='flex flex-col justify-center'>
            <span className='text-white text-center border border-gray-500 py-1.5 rounded-full mb-2'>
              {recipe?.readyInMinutes} min
            </span>
            <p className='text-neutral-100 text-[12px] md:text-md'>
              TOTAL TIME
            </p>
          </div>

          <div className='flex flex-col justify-center'>
            <span className='text-white text-center border border-gray-500 py-1.5 rounded-full mb-2 p-5'>
              {recipe?.vegetarian ? <span>vegetarian</span> : <span>non-vegetarian</span>}
            </span>
            <p className='text-center text-neutral-100 text-[12px] md:text-md'>TYPE</p>
          </div>


        </div>

        <div className='w-full flex flex-col md:flex-row gap-8 py-20 pxx-4 md:px-10'>
          {/* LEFT SIDE */}
          <div className='w-full md:w-2/4 md:border-r border-slate-800 pr-1'>
            <div className='flex flex-col gap-5'>
            <img src={recipe?.image} alt={recipe?.title} className='rounded-lg h-[200px] md:h-[150px] md:w-[220px]' />
              <p className='text-green-500 text-2xl underline'>Ingredients</p>

              {
                recipe?.extendedIngredients?.map((ingredient, index) => {
                  return (
                    <p key={index} className='text-neutral-100 flex gap-2'>
                      <AiFillPushpin className='text-green-800 text-xl' /> {ingredient.original}
                    </p>
                  )
                })

                  // <span>{recipe?.extendedIngredients}</span>
                
                
              }
            </div>
            <div className='flex flex-col gap-5' >
              <p className='text-green-500 text-2xl underline mt-10'>Instructions</p>
              <ol className='text-white'>
                
              {
               
                 !containsLI ? (
                    recipe?.instructions.split(/\./).map((item, index) => {
                      const cleanedInstruction = item.trim();
                    
                      if (cleanedInstruction !== '') {
                        return (
                          <li key={index} className='flex items-center mt-5'>
                            <div className='h-full inline-block'>
                              <AiFillPushpin className='text-green-800 text-xl mr-2 inline-block' />
                            </div>
                            <div className='h-full inline-block'>{cleanedInstruction}</div>
                          </li>
                        );
                      }
                
                      return null;
                    })
                  ) : (
                    recipe?.instructions.split(/\n|<\/?li>/).map((item, index) => {
                      const cleanedInstruction = item.replace(/<\/?li>|<\/?ol>/g, '').trim();
                      if (cleanedInstruction !== '') {
                        return (
                          <li key={index} className='flex items-center mt-5'>
                            <div className='h-full inline-block'>
                              <AiFillPushpin className='text-green-800 text-xl mr-2 inline-block' />
                            </div>
                            <div className='h-full inline-block'>{cleanedInstruction}</div>
                          </li>
                        );
                      }
                      return null;
                    })
                  )
              }
              </ol>
            </div>
          </div>


          {/* RIGHT SIDE */}
          <div className='w-full md:w-2/4 2xl:pl-10 mt-20 md:mt-0'>
            {
              recipes?.length > 0 && (
                <>
                  <p className='text-white text-2xl'>Also Try This</p>

                  <div className='flex flex-wrap gap-6 px-1 pt-3'>
                    {
                      recipes?.map((item, index) => (
                        <RecipeCard recipe={item} index={index} />
                      ))
                    }
                  </div>
                </>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
export default RecipeDetail