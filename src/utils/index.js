export async function fetchRecipes (filter){
    console.log(filter);
    const {query, limit} = filter;

    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API}&query=${query}&number=${limit}`;
    
    const response = await fetch(url);

    const data = await response.json();
    
    return data?.results;
}
export async function fetchRandomRecipes (filter){
    const { limit } = filter;

    const url = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API}&number=${limit}`;
    
    const response = await fetch(url);

    const data = await response.json();
    
    return data?.recipes;
}
export async function fetchRecommendRecipes (filter){
    const {id} = filter;

    const url = `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${process.env.REACT_APP_API}`;
    
    const response = await fetch(url);

    const data = await response.json();
    return data;
}
export async function fetchRecipe(id){
const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false?&apiKey=${process.env.REACT_APP_API}`

const response = await fetch(url)

const data = await response.json();

return data;
}