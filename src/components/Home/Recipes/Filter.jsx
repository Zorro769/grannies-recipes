import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { axiosPrivate } from "../../../api/axios";
import Filters from "components/Shared/Filters";

const Filter = ({
  onClose,
  values,
  handleFilterSubmit,
  handleTimeChange,
  handleFilterChange,
}) => {
  // const [uploadedData, setUploadedData] = useState([]);

  // const uploadingDietsDishTypesCuisines = async () => {
  //   const data = await axiosPrivate.get("/recipes/data");
  //   setUploadedData(data.data);
  // };
  // useEffect(() => {
  //   uploadingDietsDishTypesCuisines();
  // }, []);
  return (
    <div className="bg-black text-left h-full px-10">
      <div className="flex justify-end">
        <IoMdClose
          className="cursor-pointer text-gray-600 text-xl"
          onClick={() => onClose()}
        />
      </div>
      <Filters
        values={values}
        handleTimeChange={handleTimeChange}
        handleFilterChange={handleFilterChange}
        handleFilterSubmit={handleFilterSubmit}
      />
      <button
        type="button"
        className="mt-20 bg-[#166534] w-[130px] h-[45px]  rounded-3xl text-white text-xl self-right"
        onClick={(e) => {
          handleFilterSubmit(e);
          onClose();
        }}
      >
        Filter
      </button>
    </div>
  );
};

export default Filter;
