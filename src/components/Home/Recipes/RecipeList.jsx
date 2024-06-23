import React, { memo } from "react";
import paginationStyle from "helpers/stylePagination";
import RecipeCard from "../../RecipeCard";
import Pagination from "@mui/material/Pagination";

const RecipeList = ({ recipes, count, page, handlePageChange }) => {
  return recipes?.length > 0 ? (
    <>
      <div className="w-full flex items-start flex-wrap gap-10 py-10">
        {recipes?.map((item, index) => (
          <RecipeCard recipe={item} key={index} flag={item.isFavourite} />
        ))}
        <div className="flex justify-center mt-10 w-full bg-black">
          <Pagination
            count={Number(count)}
            variant="outlined"
            shape="rounded"
            page={page}
            defaultPage={1}
            sx={paginationStyle}
            onChange={(event, value) => handlePageChange(value)}
          />
        </div>
      </div>
    </>
  ) : (
    <div className="text-white w-full items-center justify-center py-10">
      <p className="text-center">No Recipe Found</p>
    </div>
  );
};

export default memo(RecipeList);
