import { axiosPrivate } from "../api/axios";


export async function fetchRecipes(filter) {
    const { query = '', limit, type, diet, maxReadyTime = 1000, cuisine, page = 1 } = filter;

    const url = `${process.env.REACT_APP_SERVER_URL}/spoonacular/recipes/?query=${query}&limit=100&type=${type}&diet=${diet}&maxReadyTime=${maxReadyTime}&cuisine=${cuisine}&page=${page}&size=20&currency=${localStorage.getItem('currencyCode')}`

    const response = await axiosPrivate.get(url);

    return response?.data;
}
export async function fetchRandomRecipes(filter) {
    const { page = 1 } = filter;
    const url = `${process.env.REACT_APP_SERVER_URL}/spoonacular/recipes/random?limit=100&page=${page}&size=${20}&language=${localStorage.getItem('language')}&currency=${localStorage.getItem('currencyCode')}`

    const response = await axiosPrivate.get(url);

    return response?.data;
}
export async function fetchRecommendRecipes(filter) {
    const { id } = filter;

    const url = `${process.env.REACT_APP_SERVER_URL}/spoonacular/recipes/recommended/${id}?language=${localStorage.getItem('language')}&currency=${localStorage.getItem('currencyCode')}`;

    const response = await axiosPrivate.get(url);

    return response?.data;
}
export async function fetchRecipe(id) {
    const url = `${process.env.REACT_APP_SERVER_URL}/spoonacular/recipes/${id}?language=${localStorage.getItem('language')}&currency=${localStorage.getItem('currencyCode')}`

    const response = await axiosPrivate.get(url)

    return response?.data;
}
export async function fetchSortedRecipe(filter) {
    const { value, page = 1 } = filter;

    const url = `${process.env.REACT_APP_SERVER_URL}/spoonacular/recipes/top-categories?limit=100&sort=${value.value[0]}&sortDirection=${value.value[1]}&size=20&page=${page}&language=${localStorage.getItem('language')}&currency=${localStorage.getItem('currencyCode')}`

    const response = await axiosPrivate.get(url);

    return response?.data;
}