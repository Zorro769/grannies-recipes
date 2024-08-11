import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "react-query";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { loadRecipesCategories } from "utils/services";
import { axiosPrivate } from "api/axios";
import toast from "react-hot-toast";

import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import colorStyle from "../../helpers/styleReactSelect";
import Loading from "../Shared/Loading";

const CreateRecipe = () => {
  const [uploadedData, setUploadedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      extendedIngredients: [{ original: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "extendedIngredients",
  });

  const { data } = useQuery("recipesOptions", loadRecipesCategories, {
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      setUploadedData(data);
      setLoading(false);
    }
  }, [data]);

  const onSubmit = async (formData) => {
    const recipeData = new FormData();

    recipeData.append("title", formData.title);
    recipeData.append("cuisines", JSON.stringify(formData.cuisines));
    recipeData.append("dishTypes", JSON.stringify(formData.dishtype));
    recipeData.append("diets", JSON.stringify(formData.diet));
    recipeData.append("instructions", formData.instructions);
    if (payment) recipeData.append("price", formData.price);
    recipeData.append(
      "extendedIngredients",
      JSON.stringify(formData.extendedIngredients)
    );
    recipeData.append("readyInMinutes", formData.totalmin);

    if (selectedFile) {
      recipeData.append("image", selectedFile);
    }

    try {
      await axiosPrivate.post("/recipes", recipeData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Your recipe has been successfully created");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="w-full h-full mt-20">
      <div className="h-full w-full py-10 pb-5 bg-transparent flex justify-center">
        {loading ? (
          <Loading />
        ) : (
          <div className="h-full w-[400px] text-center flex flex-col items-center justify-center rounded-[45px]">
            <span className="text-white font-Nunito text-xl font-bold">
              Granny's<span className="text-[#166534] text-2xl">Recipes</span>
            </span>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="text-left w-[340px] mt-5 py-5"
            >
              <label className="text-[#1FB137] text-base font-bold ">
                Name of recipe:
                <br />
                <input
                  {...register("title")}
                  placeholder="Enter title of recipe"
                  className=" border-[#1FB137] text-[#1FB137] bg-black border w-full p-2 pr-10"
                />
              </label>
              <label className="text-[#1FB137] text-base font-bold inline-block mt-5 w-full">
                Cuisine type:
                <Controller
                  name="cuisines"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={uploadedData?.data?.cuisines}
                      isMulti
                      isClearable
                      styles={colorStyle}
                    />
                  )}
                />
              </label>
              <label className="text-[#1FB137] text-base font-bold inline-block mt-5 w-full">
                Dish type:
                <Controller
                  name="dishtype"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={uploadedData?.data?.dishTypes}
                      isMulti
                      isClearable
                      styles={colorStyle}
                    />
                  )}
                />
              </label>
              <label className="text-[#1FB137] text-base font-bold inline-block mt-5 w-full">
                Diet:
                <Controller
                  name="diet"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={uploadedData?.data?.diets}
                      isMulti
                      isClearable
                      styles={colorStyle}
                    />
                  )}
                />
              </label>
              <label className="text-[#1FB137] text-base font-bold inline-block mt-5 w-full">
                Total time(in min):
                <br />
                <input
                  type="number"
                  placeholder="Enter total time"
                  onWheel={(e) => e.target.blur()}
                  {...register("totalmin")}
                  className=" border-[#1FB137] bg-black border w-full py-2 pl-4 pr-10"
                />
              </label>
              <span className="text-[#1FB137] text-base font-bold inline-block mt-5 w-full radio-container">
                Ingredients
              </span>
              <ul>
                {fields.map((field, index) => (
                  <li key={field.id}>
                    <input
                      {...register(`extendedIngredients.${index}.original`)}
                      className=" border-[#1FB137] bg-black border w-4/6 py-2 pl-4 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="bg-[#166534] rounded-3xl text-white text-2xl text-center cursor-pointer inline-block ml-3 px-2 py-1"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => {
                  append({ original: "" });
                }}
                className="bg-[#166534] rounded-3xl text-white text-xl text-center cursor-pointer inline-block mt-2 px-4 py-1"
              >
                Append
              </button>
              <span className="text-[#1FB137] text-base font-bold inline-block mt-5 w-full radio-container">
                Instructions
              </span>
              <textarea
                placeholder="Enter instructions"
                {...register("instructions")}
                className="border-[#1FB137] h-[200px] text-[#1FB137] bg-black border w-full py-2 pl-4 pr-10 resize-none"
              />
              <label className="text-[#1FB137] text-base font-bold inline-block w-full radio-container mt-5">
                <input
                  type="radio"
                  name="payment"
                  checked={!payment}
                  className="radio-input"
                  onChange={() => setPayment(false)}
                />
                <span className="label-text">Free</span>
              </label>
              <label className="text-[#1FB137] text-base font-bold inline-block mt-2 w-full radio-container">
                <input
                  type="radio"
                  name="payment"
                  checked={payment}
                  className="radio-input"
                  onChange={() => setPayment(true)}
                />
                <span className="label-text">Paid</span>
              </label>
              {payment ? (
                <label className="text-[#1FB137] text-base font-bold inline-block w-full mt-5">
                  Price:
                  <br />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price for the recipe"
                    required
                    className="border-[#1FB137] bg-black border w-full py-2 pl-4 pr-10"
                    {...register("price")}
                  />
                </label>
              ) : null}

              <label className="text-[#1FB137] text-base font-bold inline-block mt-5 w-full radio-container">
                Pick an image
              </label>
              <input
                type="file"
                name="image"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="hidden"
                ref={fileInputRef}
                id="fileInput"
                accept="image/*"
              />
              <label
                htmlFor="fileInput"
                className={`bg-[#166534] w-[130px] h-[45px] rounded-3xl text-white text-xl text-center cursor-pointer inline-block mt-2 px-4 py-2 ${
                  selectedFile ? "bg-gray-700" : ""
                }`}
              >
                {"Choose"}
              </label>
              <br />
              <br />
              {selectedFile ? (
                <>
                  <span className="text-[#1FB137] text-base">
                    Chosen file:
                    <span className="text-base w-100">
                      {" "}
                      {selectedFile.name}
                    </span>
                  </span>
                  <div className="mt-3 relative">
                    <div>
                      <div
                        className="absolute inline-block m-2 left-40 cursor-pointer"
                        onClick={() => {
                          setSelectedFile(null);
                          fileInputRef.current.value = null;
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faX}
                          color={"black"}
                          fontSize={25 + "px"}
                        />
                      </div>
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        className="rounded-lg md:w-[200px] h-[200px] md:h-[150px]"
                        alt=""
                      />
                    </div>
                  </div>
                </>
              ) : (
                <span className="text-[#1FB137] text-base">
                  Image is not chosen
                </span>
              )}
              <div className="flex justify-center mt-12">
                <button
                  type="submit"
                  value="Sign in"
                  className="bg-[#166534] w-[130px] h-[45px]  rounded-3xl text-white text-xl self-center"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateRecipe;
