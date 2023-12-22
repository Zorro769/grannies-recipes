import React, {useState} from 'react'
import axios, { axiosPrivate } from '../api/axios';
import BackGround from  '../images/create-recipe.jpg'
import {cuisines, dishTypes} from '../utils/recipeData';
import useAxiosPrivate from "../hooks/useAxiosPrivate";


const CreateRecipe = () => {
    const axiosPrivate = useAxiosPrivate();
const [errMsg, setErrMsg] = useState('')
const [name, setName] = useState('')
const [selectedFile, setSelectedFile] = useState();
const [ingredients, setIngredients] = useState([{ original: '' }]);
const [isSelected, setIsSelected] = useState(false);
const [cuisine, setCuisine] = useState('');
const [dishType, setDishType] = useState('');
const [totalMin, setTotalMin] = useState('');
const [vegetarian, setVegetarian] = useState('');
const [evaluation, setEvaluation] = useState('');
const [instructions, setInstructions] = useState('');

const reader = new FileReader();
  const handleSubmit = async (e) =>  { 
    e.preventDefault();
    const formData = new FormData();
    
    // const formattedIngredients = ingredients
    // .filter((ingredient) => ingredient.original.trim() !== '')
    // .map((ingredient) => ({ original: ingredient.original }));
    console.log(selectedFile);
    ingredients.map((ingredient) => {
        formData.append('extendedIngredients', JSON.stringify(ingredient));
      });
      
      formData.append('extendedIngredients', JSON.stringify([]));
    formData.append('title', name);
    formData.append('cuisine', cuisine);
    formData.append('dishType', dishType);
    formData.append('instructions', instructions);
    formData.append('readyInMinutes', totalMin);
    formData.append('cheap', evaluation);
    formData.append('vegetarian', vegetarian);

    if (selectedFile) {
        console.log(selectedFile.name)
        reader.onload = (readerEvent) => {
            formData.append('image', readerEvent.target.result)
          }
      }
      
    try {
        console.log(localStorage.getItem('accessToken'));
        await axiosPrivate.get('/users/allusers')
        const response = await axiosPrivate.post('/recipes', formData,);
      } catch (error) {
        console.error('Error sending data:', error);
      }
  }

  const handleFileChange = (e) => {
    console.log('Hello')
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
    setIsSelected(true);
  };

const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value ? { original: value } : null;

    // Filter out null values
    const filteredIngredients = newIngredients.filter(ingredient => ingredient !== null);

    if (index === newIngredients.length - 1 && value.trim() !== '') {
        filteredIngredients.push('');
    }
    setIngredients(filteredIngredients)
};
  return (
    <>
    <img src={BackGround} alt="login" className="w-[1190px] h-[717px] object-cover fixed" />
    <div className="bg-gradient-to-l from-transparent to-black to-65% w-[1190px] h-[1017px] fixed top-0 z-8 flex flex-col items-start justify-start pt-40 2xl:pt-20 px-4"></div>
    <div className='bg-gradient-to-l from-transparent to-black to-65% w-[1190px] h-[1017px] fixed top-0 z-8 flex flex-col items-start justify-start pt-40 2xl:pt-20 px-4'></div>
    <div className="h-screen w-full relative">
        
            <div className='h-full w-[400px] z-20 text-center flex flex-col items-center'>
                <span className='text-white font-Nunito text-xl font-bold'>Granny's<span className='text-[#166534] text-2xl'>Recipes</span></span>
                <form onSubmit={handleSubmit} className='text-left w-[340px] mt-10'>
                    <label className='text-[#1FB137] text-base font-bold '>
                        Name of recipe:
                        <br />
                        <input type="name" name="name" id="name" className=' border-[#1FB137] bg-black border w-full py-2 pl-4 pr-10' onChange={(e) => setName(e.target.value)}/>
                    </label>
                    <label className='text-[#1FB137] text-base font-bold inline-block mt-5 w-full'>
                        Cuisine type:
                        <select
        id="dishSelect"
        className="border-[#1FB137] bg-black border w-full py-2 pl-4 pr-10"
        onChange={(e) => setCuisine(e.target.value)}
        value={cuisine}  
    >
        {cuisines.map(cuisine => (
            <option key={cuisine} value={cuisine}>
                {cuisine}
            </option>
        ))}
    </select>
                    </label>
                    {/*   */}
                    <label className='text-[#1FB137] text-base font-bold inline-block mt-5 w-full'>
                        Dish type:
                        <select
        id="dishSelect"
        className="border-[#1FB137] bg-black border w-full py-2 pl-4 pr-10"
        onChange={(e) => setDishType(e.target.value)}
        value={dishType}  
    >
        {dishTypes.map(dishType => (
            <option key={dishType} value={dishType}>
                {dishType}
            </option>
        ))}
    </select>
                    </label>
                    <label className='text-[#1FB137] text-base font-bold inline-block mt-5 w-full'>
                        Total time(in min):
                        <br />
                        <input type="number" name="time" id="time" className=' border-[#1FB137] bg-black border w-full py-2 pl-4 pr-10' onChange={(e) => setTotalMin(e.target.value)}/>
                    </label>
                    <label className='text-[#1FB137] text-base font-bold inline-block mt-10 w-full radio-container'>
                        <input type="radio" name="dishType" value="vegetarian" className='radio-input' checked={vegetarian === 'vegetarian'} onChange={(e) => setVegetarian(e.target.value)}/>
                        <span className="label-text">Vegetarian</span>
                    </label>

                    <label className='text-[#1FB137] text-base font-bold inline-block mt-2 w-full radio-container'>
                        <input type="radio" name="dishType" value="non-vegetarian" className='radio-input' checked={vegetarian === 'non-vegetarian'} onChange={(e) => setVegetarian(e.target.value)}/>
                        <span className="label-text">Non Vegetarian</span>
                    </label>
                    <label className='text-[#1FB137] text-base font-bold inline-block mt-10 w-full radio-container'>
                        <input type="radio" name="evaluation" value="expensive" className='radio-input' checked={evaluation === 'expensive'} onChange={(e) => setEvaluation(e.target.value)}/>
                        <span className="label-text">Expensive</span>
                    </label>

                    <label className='text-[#1FB137] text-base font-bold inline-block mt-2 w-full radio-container'>
                        <input type="radio" name="evaluation" value="cheap" className='radio-input' checked={evaluation === 'cheap'} onChange={(e) => setEvaluation(e.target.value)}/>
                        <span className="label-text">Cheap</span>
                    </label>
                    {/* <label className='text-[#1FB137] text-base font-bold inline-block mt-2 w-full radio-container'> */}
                    <span className='text-[#1FB137] text-base font-bold inline-block mt-5 w-full radio-container'>Ingredients</span>
                        {ingredients.map((ingredient, index) => (
                        <div key={index} className="text-[#1FB137] text-base font-bold w-full radio-container">
                        <label className='inline-block w-full'>
                        <br />
                            <input
                            type="text"
                            value={ingredient.original}
                            className='text-[#1FB137] text-base border-[#1FB137] bg-black border w-full py-2 pl-4 pr-10'
                            onChange={(e) => handleIngredientChange(index, e.target.value)}/>
                        </label>
                        <br />
                        </div> ))}
                    <span className='text-[#1FB137] text-base font-bold inline-block mt-5 w-full radio-container'>Instructions</span>
                    <br />
                    <textarea
                        name="dishType"
                        onChange={(e) => setInstructions(e.target.value)}
                        className='border-[#1FB137] text-[#1FB137] bg-black border w-full py-2 pl-4 pr-10 resize-none'
                        style={{ height: '100px' }} />
<label className='text-[#1FB137] text-base font-bold inline-block mt-2 w-full radio-container'>
        Pick an image
      </label>
      <br />
      <input
        type="file"
        name="evaluation"
        onChange={handleFileChange}
        className='hidden'
        id="fileInput"
        accept='image/*'
      />
      <label
        htmlFor="fileInput"
        className={`bg-[#166534] w-[130px] h-[45px] rounded-3xl text-white text-xl text-center cursor-pointer inline-block mt-2 px-4 py-2 ${selectedFile ? 'bg-gray-700' : ''}`}>
        
        {'Choose'}      
        </label>
        <br/><br />
        {selectedFile ? (
            <span className='text-[#1FB137] text-base'>
            Chosen file: <br /><br />
            <span className='text-base w-100'>{selectedFile.name}</span>
            </span>
        ) : <span className='text-[#1FB137] text-base'>Image is not chosen</span>}
                <div className='text-left text-orange-900 mt-5'>
                        {errMsg}
                    </div>
                    <div className="flex justify-center mt-12">
                        <button type="submit" value="Sign in" className='bg-[#166534] w-[130px] h-[45px]  rounded-3xl text-white text-xl self-center' >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
        </>
  )
}

export default CreateRecipe