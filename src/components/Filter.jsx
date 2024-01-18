import React from 'react'
import { IoMdClose } from "react-icons/io";
import { fetchRecipes } from "../utils/index";
import {cuisines, dishTypes, diet} from '../utils/recipeData';


const Filter = (props) => {
  const [cuisine, setCuisine] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetchRecipes({limit:10, type:'Drink', diet:'vegetarian', maxReadyTime:30,cuisine:'Asian'});
    console.log(response);
    props.data(response);
    props.onClose();
  }
  return (
    <div className='bg-black h-full p-3'>
        <div className='flex justify-end'>
            <IoMdClose className='cursor-pointer text-gray-600 text-xl' onClick={props.onClose}/>
        </div>
        
        <form action="" className='text-left w-[340px]'>
        <label className='text-[#1FB137] text-base font-bold inline-block mt-5 w-full'>
                        Cuisine type:
                        <select id="dishSelect" className="border-[#1FB137] bg-black border w-full py-2 pl-4 pr-10" onChange={(e) => setCuisine(e.target.value)} value={cuisine}>
                            {cuisines.map(cuisine => (
                                <option key={cuisine} value={cuisine}>
                                    {cuisine}
                                </option>
                            ))}
                        </select>
                    </label>
            <button type='button' className='text-white' onClick={handleSubmit}>Click me</button>
        </form>
    </div>
  )
}

export default Filter