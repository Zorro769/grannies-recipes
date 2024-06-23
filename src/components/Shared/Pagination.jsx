import React from "react";

const Pagination = ({count, page, paginationStyle, handleChange}) => {
  return (
    <Pagination
      count={Number(itemsCount)}
      variant="outlined"
      shape="rounded"
      page={page}
      defaultPage={1}
      sx={paginationStyle}
      onChange={(event, value) => setPage(value)}
    />
  );
};

export default Pagination;
