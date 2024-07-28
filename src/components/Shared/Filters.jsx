import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";
import Select from "react-select";
import colorStyle from "../../helpers/styleReactSelect";

const Filters = ({
  values,
  handleTimeChange,
  handleFilterChange,
  handleFilterSubmit,
}) => {
  const [uploadedData, setUploadedData] = useState([]);
  const uploadingDietsDishTypesCuisines = async () => {
    const data = await axiosPrivate.get("/recipes/data");
    setUploadedData(data.data);
  };
  useEffect(() => {
    uploadingDietsDishTypesCuisines();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleFilterSubmit();
  };
  return (
    <div>
      <form action="" className="text-left w-full" onSubmit={handleSubmit}>
        <label className="text-[#1FB137] text-base font-bold inline-block mt-5 w-full">
          Cuisine type:
          <Select
            options={uploadedData?.cuisines}
            isMulti
            isClearable
            name="cuisine"
            value={values.cuisine}
            styles={colorStyle}
            onChange={handleFilterChange}
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
            onChange={handleFilterChange}
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
            onChange={handleFilterChange}
          />
        </label>
        <label className="text-[#1FB137] font-bold text-base inline-block mt-5 w-full">
          Total time(in min):
          <br />
          <input
            type="number"
            placeholder="Enter total time"
            onWheel={(e) => e.target.blur()}
            name="maxReadyTime"
            value={values.maxReadyTime}
            style={{ color: "#1FB137" }}
            className="border-[#1FB137] text-white bg-black border rounded w-full py-2 pl-4 pr-10"
            onChange={handleTimeChange}
          />
        </label>
        <button
          type="button"
          className="mt-10 bg-[#166534] w-[130px] h-[45px]  rounded-3xl text-white text-xl self-right"
          onClick={handleFilterSubmit}
        >
          Filter
        </button>
      </form>
    </div>
  );
};

export default Filters;
