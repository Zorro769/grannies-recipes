import { fetchRecipeById } from "utils/fetchRecipesData";
import { useQuery } from "react-query";
import axios from "api/axios";

const useFetchRecipeDetail = ({ id }) => {
    const { data } = useQuery(["recipe", id], () => fetchRecipeById(id), {
        cacheTime: 0,
        staleTime: Infinity,
    });

    return data;
}

export default useFetchRecipeDetail;