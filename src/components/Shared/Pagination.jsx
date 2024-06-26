import React from "react";
import paginationStyle from "helpers/stylePagination";
import { Pagination } from "@mui/material";

const SharedPagination = ({count, page, handleChange}) => {
  return (
    <Pagination
      count={Number(count)}
      variant="outlined"
      shape="rounded"
      page={page}
      defaultPage={1}
      sx={paginationStyle}
      onChange={(event, value) => handleChange(value)}
    />
  );
};

export default SharedPagination;
