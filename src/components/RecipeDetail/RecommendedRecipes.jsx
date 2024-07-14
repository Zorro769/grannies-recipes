import React from "react";
import { useQuery } from "react-query";
import { fetchRecommendRecipes } from "utils/fetchRecipesData";
import RecommendedRecipesData from "./RecommendedRecipesData";

const RecommendedRecipes = ({ id }) => {
  const fetchRecommended = () => {
    return fetchRecommendRecipes(id);
  };
  const { data } = useQuery(["recommended", id], fetchRecommended, {
    cacheTime: 0,
    staleTime: Infinity,
  });
  return <RecommendedRecipesData data={data} />;
};

export default RecommendedRecipes;
