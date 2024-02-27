import { axiosPrivate } from "../api/axios";


export async function fetchRecipes(filter) {
    const { query = '', limit, type, diet, maxReadyTime = 1000, cuisine, page = 1 } = filter;

    // const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API}&query=${query}&number=${limit}`;
    console.log(page);
    const url = `${process.env.REACT_APP_SERVER_URL}/spoonacular/recipes/?query=${query}&limit=100&type=${type}&diet=${diet}&maxReadyTime=${maxReadyTime}&cuisine=${cuisine}&page=${page}&size=20`

    const response = await fetch(url);

    const data = await response.json();

    return data;
}
export async function fetchRandomRecipes(filter) {
    const { page = 1 } = filter;

    // const url = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API}&number=${limit}`;
    const url = `${process.env.REACT_APP_SERVER_URL}/spoonacular/recipes/random?limit=100&page=${page}&size=${20}`

    const response = await axiosPrivate.get(url);

    return response?.data;
}
export async function fetchRecommendRecipes(filter) {
    const { id } = filter;

    const url = `${process.env.REACT_APP_SERVER_URL}/spoonacular/recipes/recommended/${id}`;

    const response = await fetch(url);

    const data = await response.json();
    return data;
}
export async function fetchRecipe(id) {
    // const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false?&apiKey=${process.env.REACT_APP_API}`

    const url = `${process.env.REACT_APP_SERVER_URL}/spoonacular/recipes/${id}`

    const response = await fetch(url)

    const data = await response.json();

    return data;
}
export async function fetchSortedRecipe(filter) {
    const { value, page=1 } = filter;
    console.log(filter);
    console.log(value.value[0]);
    const url = `${process.env.REACT_APP_SERVER_URL}/spoonacular/recipes/top-categories?limit=100&sort=${value.value[0]}&sortDirection=${value.value[1]}&size=20&page=${page}`

    const response = await fetch(url);

    const data = await response.json();

    return data;
}