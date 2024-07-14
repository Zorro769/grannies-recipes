import { axiosPrivate } from "api/axios";

export const addRecipeToFavourite = async ({ id }) => {
    try {
        await axiosPrivate.get(`/recipes/favourite/${id}`);
    } catch (err) {
        throw new Error("Can't add recipe to favourite");
    }
}

export const buyRecipe = async ({id}) => {
    const response = await axiosPrivate.post(
        `${process.env.REACT_APP_SERVER_URL
        }/recipes/create-payment-intent?currency=${localStorage.getItem(
            "currencyCode"
        )}`,
        { recipeId: id }
    );
    const clientSecret = response.data;

    return clientSecret;
}