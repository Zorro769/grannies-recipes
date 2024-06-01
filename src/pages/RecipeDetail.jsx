import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRecipe, fetchRecommendRecipes } from "../utils";
import Loading from "../components/Loading";
import Header from "../components/Header";
import axios from "axios";

import { AiFillPushpin } from "react-icons/ai";
import RecipeCard from "../components/RecipeCard";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [containsLI, setContainsLI] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const recipesRef = useRef();
  const { id } = useParams();
  const containsLIValue =
    recipe?.instructions?.includes("<li>") ||
    recipe?.instructions?.includes("\n") ||
    recipe?.instructions?.includes("<p>");
  useEffect(() => {
    if (!loading && recipesRef.current) {
      recipesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);
  const handlePayment = async () => {
    const response = await axiosPrivate.post(
      `${
        process.env.REACT_APP_SERVER_URL
      }/recipes/create-payment-intent?currency=${localStorage.getItem(
        "currencyCode"
      )}`,
      { recipeId: id }
    );
    const clientSecret = response.data;
    navigate("/payment", { state: { clientSecret } });
  };
  useEffect(() => {
    const getRecipe = async () => {
      try {
        setLoading(true);
        let data = [];

        data = await fetchRecipe(id);

        data.extendedIngredients.map((item) => {
          console.log(item);
        });

        setRecipe(data);
        setContainsLI(containsLIValue);
        const recommend = await fetchRecommendRecipes({ id });
        await setRecipes(recommend);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getRecipe();
    window.addEventListener("storage", getRecipe);

    return () => {
      window.removeEventListener("storage", getRecipe);
    };
  }, [id, containsLIValue]);

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  return (
    <div className="w-full" ref={recipesRef}>
      <Header label={recipe?.title || "Default Title"} />

      <div className="w-full px-4 lg:px-20 pt-5">
        <div className="flex gap-10 items-center justify-center px-4">
          <div className="flex flex-col justify-between">
            <span className="text-white text-center border border-gray-500 py-1.5 px-2 rounded-full mb-2">
              {recipe?.pricePerServing}{" "}
            </span>

            <span className="text-center text-neutral-100 text-[12px] md:text-md">
              EVALUATION
            </span>
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-white text-center border border-gray-500 py-1.5 rounded-full mb-2 p-2">
              {recipe?.readyInMinutes}
            </span>
            <p className="text-neutral-100 text-[12px] md:text-md">
              TOTAL TIME
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-white text-center border border-gray-500 py-1.5 rounded-full mb-2 p-5">
              {recipe?.vegetarian ? (
                <span>vegetarian</span>
              ) : (
                <span>non-vegetarian</span>
              )}
            </span>
            <p className="text-center text-neutral-100 text-[12px] md:text-md">
              TYPE
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-8 py-20 pxx-4 md:px-10">
          <div className="w-full md:w-2/4 flex items-center md:border-r border-slate-800 pr-1">
            <div className="flex flex-col gap-5">
              <img
                src={recipe?.image}
                alt={recipe?.title}
                className="rounded-lg h-[500px] md:h-[400px] md:w-[550px]"
              />
            </div>
          </div>
          <div className="w-full md:w-2/4 pr-1">
            <div className="flex flex-col gap-5">
              <p className="text-green-500 text-2xl underline">Ingredients</p>
              {recipe?.extendedIngredients?.map((ingredient, index) => {
                return (
                  <p
                    key={index}
                    className="text-neutral-100 flex gap-2 text-xl"
                  >
                    <AiFillPushpin className="text-green-800 text-xl" />{" "}
                    {ingredient}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-green-500 text-2xl underline mt-10">
            Instructions
          </p>
          <ol className="relative text-white">
            <div
              className={
                recipe?.paymentStatus !== false || !recipe?.paymentStatus
                  ? " text-xl"
                  : "absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-50% to-black"
              }
            ></div>
            {recipe?.instructions?.length > 0 &&
              (containsLI
                ? recipe?.instructions
                    .split(/\n|<\/li>|<\/ol>|<\/p>|<p>/)
                    .map((item, index) => {
                      const cleanedInstruction = item
                        .replace(/<li>|<ol>/g, "")
                        .trim();
                      if (cleanedInstruction !== "") {
                        return (
                          <li key={index} className="flex items-center mt-5">
                            <div className="h-full inline-block">
                              <AiFillPushpin className="text-green-800 text-xl mr-2 inline-block" />
                            </div>
                            <div className="h-full text-white inline-block">
                              {cleanedInstruction}
                            </div>
                          </li>
                        );
                      }
                      return null;
                    })
                : recipe?.instructions.split(".").map((item, index) => {
                    const cleanedInstruction = item.trim();
                    if (cleanedInstruction !== "") {
                      return (
                        <li key={index} className="flex items-center mt-5">
                          <div className="h-full inline-block">
                            <AiFillPushpin className="text-green-800 mr-2 inline-block" />
                          </div>
                          <div className="h-full inline-block">
                            {cleanedInstruction}
                          </div>
                        </li>
                      );
                    }
                    return null;
                  }))}
          </ol>
          {recipe?.paymentStatus == false && (
            <button
              onClick={handlePayment}
              className="bg-[#166534] w-[150px] text-center p-3 rounded-3xl text-white text-xl "
            >
              Buy a recipe
            </button>
          )}

          <div className="w-full pr-1 mt-10">
            <div className="flex flex-col gap-5"></div>
            {recipes?.length > 0 && (
              <>
                <p className="text-white text-2xl">Also Try This</p>

                <div className="flex flex-wrap gap-5 px-1 pt-3">
                  {recipes?.map((item, index) => (
                    <RecipeCard recipe={item} index={index} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecipeDetail;
