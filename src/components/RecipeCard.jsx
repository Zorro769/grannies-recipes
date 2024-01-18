import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiHeart } from 'react-icons/hi';
import { HiOutlineHeart } from 'react-icons/hi';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import InfoDialog from './InfoDialog';
import Dialog from '@mui/material/Dialog'
import defaultImage from '../images/default_recipe.jpg';


const RecipeCard = ({ recipe, flag=false, favouriteFlag = true, onClose }) => {
    const { id,image,sourceUrl, title, readyInMinutes, dishTypes } = recipe;
    const [flagFavourite, setFlag] = useState(flag);
    const axiosPrivate = useAxiosPrivate();
    const [infoDialog, setInfoDialog] = useState(false);

    const closeDialog = () => {
        setInfoDialog(false);
    }
    const handleFavouriteClick = async() => {
        try {
            setFlag(!flagFavourite);
            await axiosPrivate.get(`/recipes/favourite/${id}`)
        }
        catch(err) {
            setInfoDialog(true);
            setFlag(false);
        }   
    }
    return (
       
            <div className='bg-_gradient shadow md:w-[220px] rounded-lg relative' onClick={onClose}>
                <div className='bg-_gradient shadow w-full rounded-lg relative'>
                    {
                    favouriteFlag ? (  
                flagFavourite | flag ? (
                    <button  className="absolute right-0" onClick={handleFavouriteClick}>
                    <HiHeart color='#9c1616' fontSize={'30px'}/>
                </button> 
                ) : (
                    <button  className="absolute right-0" onClick={handleFavouriteClick}>
                    <HiOutlineHeart color='#9c1616' fontSize={'30px'}/>
                </button> 
                )
                    ) :(
                        console.log()
                    )
            }
                
                <Link  to={`/recipes/${recipe?._id || id}`} className='w-full md:w-full'>
                <img src={image || defaultImage} alt={title} className='rounded-lg h-[200px] md:h-[150px] w-full' />
                
                <div className='p-3'>
                    <p className='font-semibold text-[#1FB137]'>{title}</p>

                    <div className='mt-2'>
                        <span className='px-2 py-1 text-[12px] capitalize bg-[#0c452243] shadow-xl rounded-full mr-3 text-green-500'>
                            {readyInMinutes}
                        </span>
                        {dishTypes?.length > 0 && (
                            <span
                            key={0} // or use a unique key based on your data
                            className='px-2 py-1 text-[12px] capitalize bg-[#0c452243] shadow-xl rounded-full text-green-500'
                            >
                            {dishTypes[0]}
                            </span>
                        )}
                    </div>
                    
                </div>
                </Link>
                </div>
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

export default RecipeCard