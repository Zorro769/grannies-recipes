import { axiosPrivate } from "../api/axios";

export async function fetchRecipes(filter) {
    const { query = '', limit, type = '', diet = '', maxReadyTime = 1000, cuisine = '', sorts = { value: ["popularity", "desc"], label: "Most Popular" }, page = 1 } = filter;

    const url = `${process.env.REACT_APP_SERVER_URL}/spoonacular/recipes/?query=${query}&limit=100&type=${type}&diet=${diet}&maxReadyTime=${maxReadyTime}&cuisine=${cuisine}&sort=${sorts.value[0]}&sortDirection=${sorts.value[1]}&page=${page}&size=20&language=en&currency=${localStorage.getItem('currencyCode')}`

    sessionStorage.setItem('url', url);

    const response = await axiosPrivate.get(url);

    return response?.data;
}
export async function fetchRandomRecipes(filter) {
    const { page = 1 } = filter;
    
    const url = `${process.env.REACT_APP_SERVER_URL}/spoonacular/recipes/random?limit=100&page=${page}&size=${20}&language=en&currency=${localStorage.getItem('currencyCode')}`

    const response = await axiosPrivate.get(url);

    return response?.data;
}
export async function fetchRecommendRecipes(id) {
    const url = `${process.env.REACT_APP_SERVER_URL}/spoonacular/recipes/recommended/${id}?language=${localStorage.getItem('language')}&currency=${localStorage.getItem('currencyCode')}`;

    const response = await axiosPrivate.get(url);

    return response?.data;
}
export async function fetchRecipeById(id) {
    const url = `${process.env.REACT_APP_SERVER_URL}/spoonacular/recipes/${id}?language=${localStorage.getItem('language')}&currency=${localStorage.getItem('currencyCode')}`

    const response = await axiosPrivate.get(url)

    return response?.data;
}
