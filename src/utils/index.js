export async function fetchRecipes (filter){
    console.log(filter);
    const {query='', limit, type, diet, maxReadyTime=1000, cuisine} = filter;

    // const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API}&query=${query}&number=${limit}`;
    
    const url = `${process.env.REACT_APP_SERVER_URL}/spoonacular/recipes/?query=${query}&limit=${limit}&type=${type}&diet=${diet}&maxReadyTime=${maxReadyTime}&cuisine=${cuisine}`
    
    const response = await fetch(url);

    const data = await response.json();
    
    return data;
}
export async function fetchRandomRecipes (filter){
    const { limit } = filter;

    // const url = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API}&number=${limit}`;
    const url = `${process.env.REACT_APP_SERVER_URL}/spoonacular/recipes/random?limit=30`
    
    const response = await fetch(url);

    const data = await response.json();
    
    return data;
}
export async function fetchRecommendRecipes (filter){
    const {id} = filter;

    const url = `${process.env.REACT_APP_SERVER_URL}/spoonacular/recipes/recommended/${id}`;
    
    const response = await fetch(url);

    const data = await response.json();
    return data;
}
export async function fetchRecipe(id){
// const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false?&apiKey=${process.env.REACT_APP_API}`

const url = `${process.env.REACT_APP_SERVER_URL}/spoonacular/recipes/${id}`

const response = await fetch(url)

const data = await response.json();

return data;
}
export async function fetchSortedRecipe(sortType) {
    const url = `${process.env.REACT_APP_SERVER_URL}/spoonacular/recipes/top-categories?limit=10&sort=${sortType.value[0]}&sortDirection=${sortType.value[1]}`
    
    const response = await fetch(url);

    const data = await response.json();

    return data;
}