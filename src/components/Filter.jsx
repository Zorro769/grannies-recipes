import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { fetchRecipes } from "../utils/fetchRecipesData";
import { axiosPrivate } from "../api/axios";
import Select from "react-select";
import colorStyle from "../helpers/styleReactSelect";

const Filter = ({onClose,values, handleFilterSubmit, handleChange}) => {
  const [uploadedData, setUploadedData] = useState([]);

  const uploadingDietsDishTypesCuisines = async () => {
    const data = await axiosPrivate.get("/recipes/data");
    // setLoading(false);
    setUploadedData(data.data);
  };
  useEffect(() => {
    // props.setCuisine("");
    // props.setDiet("");
    // props.setMaxReadyTime();
    // props.setDishType("");
    uploadingDietsDishTypesCuisines();
  }, []);
  return (
    <div className="bg-black h-full p-5">
      <div className="flex justify-end">
        <IoMdClose
          className="cursor-pointer text-gray-600 text-xl"
          onClick={() => onClose()}
        />
      </div>

      <form action="" className="text-left w-[340px]">
        <p className="text-green-500 text-2xl underline">Filters</p>
        <label className="text-[#1FB137] text-base font-bold inline-block mt-5 w-full">
          Cuisine type:
          <Select
            options={uploadedData?.cuisines}
            isMulti
            isClearable
            name="cuisine"
            value={values.cuisine}
            styles={colorStyle}
            onChange={handleChange}
          />
        </label>
        <label className="text-[#1FB137] text-base font-bold inline-block mt-5 w-full">
          Dish type:
          <Select
            options={uploadedData?.dishTypes}
            isMulti
            name="type"
            isClearable
            value={values.type}
            styles={colorStyle}
            onChange={handleChange}
          />
        </label>
        <label className="text-[#1FB137] text-base font-bold inline-block mt-5 w-full">
          Diet:
          <Select
            options={uploadedData?.diets}
            isMulti
            isClearable
            name="diet"
            value={values.diet}
            styles={colorStyle}
            onChange={handleChange}
          />
        </label>
        <label className="text-[#1FB137] text-base font-bold inline-block mt-5 w-full">
          Total time(in min):
          <br />
          <input
            type="number"
            placeholder="Enter total time"
            onWheel={(e) => e.target.blur()}
            name="time"
            value={values.maxReadyTime}
            className=" border-[#1FB137] bg-black border w-full py-2 pl-4 pr-10"
            onChange={handleChange}
          />
        </label>
        <div className="text-right">
          <button
            type="button"
            className="mt-7 bg-[#166534] w-[130px] h-[45px]  rounded-3xl text-white text-xl self-right"
            onClick={(e) => {
              handleFilterSubmit(e);
              onClose();
            }}
          >
            Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
