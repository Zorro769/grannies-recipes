const paginationStyle = {
    color: "green",
    backgroundColor: "black",
    padding: 5 + "px",
    border: "none ",
    "& .MuiPaginationItem-page": {
      border: "2px solid green",
      color: "green !important",
      "&:hover": {
        backgroundColor: "darkgreen",
        color: "white !important",
      },
      "&.Mui-selected": {
        backgroundColor: "darkgreen",
        color: "white !important",
      },
    },
  };

export default paginationStyle;