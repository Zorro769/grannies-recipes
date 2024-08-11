import axios, { axiosPrivate } from "api/axios";

export const addRecipeToFavourite = async ({ id }) => {
    try {
        await axiosPrivate.get(`/recipes/favourite/${id}`);
    } catch (err) {
        throw new Error("Can't add recipe to favourite");
    }
}

export const removeRecipeFromFavourites = async ({ recipes, id }) => {
    try {
        await axiosPrivate.get(`/recipes/favourite/${id}`);
    } catch (err) {
        throw new Error("Can't add recipe to favourite");
    }

    const updatedRecipes = recipes.filter((recipe) => {
        return recipe.id !== id;
    })
    return updatedRecipes;
}

export const buyRecipe = async ({ id }) => {
    const url = `recipes/create-payment-intent?currency=${localStorage.getItem("currencyCode")}`;
    const response = await axiosPrivate.post(
        url,
        { recipeId: id });
    const clientSecret = response.data;

    return clientSecret;
}

export const fetchFavouritesRecipes = async ({ page }) => {
    const url = `/recipes/favourite?page=${page}&size=${20}&language=en&currency=`;

    const response = await axiosPrivate.get(url);

    return response.data;
}

export const fetchUserRecipes = async ({ page }) => {
    const url = `/recipes?page=${page}&size=20&language=${localStorage.getItem("language")}&currency=${localStorage.getItem("currencyCode")}`;

    const response = await axiosPrivate.get(url);
    console.log(response);
    return response.data;
}

export const loadCurrencyAndLanguage = async () => {
    const response = await axios.get("/recipes/load-currency-languages");
    if (localStorage.getItem("currencyCode") === null) {
        localStorage.setItem(
            "currencyCode",
            response?.data?.currencyData[0].code
        );
        localStorage.setItem(
            "currencyLabel",
            response?.data?.currencyData[0].label
        );
    }
    return response?.data;
}
export const loadRecipesCategories = async () => {
    const response = await axios.get("/recipes/data");

    return response?.data;
}