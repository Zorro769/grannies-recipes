import { flushSync } from "react-dom";


export async function fetchRecipes (filter){
    const {query, limit} = filter;

    const url = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API}&number=6&tags=vegetarian,dessert`;
    
    const response = await fetch(url);

    const data = await response.json();
    
    return data?.recipes;
}
//https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_EDAMAM_API_KEY}`
export async function fetchRecipe(id){
console.log(id);
const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false?&apiKey=${process.env.REACT_APP_API}`

const response = await fetch(url)

const data = await response.json();

return data;
}