import React from "react";
import { useState, useRef } from "react";
import { fetchUserRecipes } from "utils/services";
import { useScroll } from "hooks/useScroll";

import Pagination from "@mui/material/Pagination";
import RecipeCard from "../components/Shared/RecipeCard";
import Header from "components/Shared/Header";
import { useQuery } from "react-query";

const MyRecipes = ({ onClose }) => {
  const [page, setPage] = useState(1);
  const recipesRef = useRef(null);
  const scroll = useScroll(recipesRef);
  const { data } = useQuery(
    ["userRecipes", page],
    () => fetchUserRecipes({ page }),
    {
      staleTime: Infinity,
      onSuccess: () => {
        scroll();
      },
    }
  );
  const handlePageChange = (event, value) => {
    setPage(value);
    setTimeout(() => {
      scroll();
    }, 500);
  };

  return (
    <div className="w-full">
      <Header label={"My Recipes"}  />
      <div className="flex-grow overflow-y-auto p-20" ref={recipesRef}>
        {data?.results.length > 0 ? (
          <>
            <div className="w-full justify-center flex flex-wrap gap-10 px-0 lg:px-10 py-10">
              {data?.results.map((item, index) => (
                <RecipeCard
                  recipe={item}
                  key={index}
                  favouriteFlag={false}
                  onClose={onClose}
                />
              ))}
              <div className="flex justify-center mt-10 w-full bg-black">
                <Pagination
                  count={data.totalPages}
                  variant="outlined"
                  shape="rounded"
                  defaultPage={1}
                  sx={{
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
                  }}
                  onChange={handlePageChange}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="text-white w-full items-center justify-center py-10">
            <p className="text-center">No Recipe Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRecipes;
