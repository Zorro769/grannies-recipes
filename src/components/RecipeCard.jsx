import React from 'react'
import { Link } from 'react-router-dom'

const RecipeCard = ({ recipe }) => {
    const { id,image, title, readyInMinutes, dishTypes, mealType } = recipe
    // const id = uri?.split("#")[1]
    // const id = title
    return (
        <Link to={`/recipes/${id}`} className='w-full md:w-[220px]'>
            <div className='bg-_gradient shadow w-full rounded-lg'>
                <img src={image} alt={title} className='rounded-lg h-[200px] md:h-[150px] w-full' />
        
                <div className='p-3'>
                    <p className='text-white font-semibold'>{title}</p>

                    <div className='mt-2'>
                        <span className='px-2 py-1 text-[12px] capitalize bg-[#0c452243] shadow-xl rounded-full mr-3 text-green-500'>
                            {readyInMinutes} min
                        </span>
                        {dishTypes.length > 0 && (
                            <span
                            key={0} // or use a unique key based on your data
                            className='px-2 py-1 text-[12px] capitalize bg-[#0c452243] shadow-xl rounded-full text-green-500'
                            >
                            {dishTypes[0]}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default RecipeCard