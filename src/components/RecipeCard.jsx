import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import InfoDialog from "./InfoDialog";
import Dialog from "@mui/material/Dialog";
import defaultImage from "../images/default_recipe.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartBorder } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

const RecipeCard = ({
  recipe,
  flag = false,
  favouriteFlag = true,
  onClose,
  shouldCallOnClose = false,
}) => {
  const { id, image, title, readyInMinutes, dishTypes, cuisines, diets } = recipe;
  const [flagFavourite, setFlag] = useState(flag);
  const axiosPrivate = useAxiosPrivate();
  const [infoDialog, setInfoDialog] = useState(false);

  const closeDialog = () => {
    setInfoDialog(false);
  };
  const handleFavouriteClick = async () => {
    try {
      setFlag(!flagFavourite);
      flag = !flagFavourite;
      console.log(flag);
      await axiosPrivate.get(`/recipes/favourite/${id}`);
      if (shouldCallOnClose) {
        onClose();
      }
    } catch (err) {
      setInfoDialog(true);
      setFlag(false);
    }
  };
  return (
    <div
      className="bg-_gradient shadow md:w-[220px] rounded-lg relative single-item"
      onClick={onClose}
    >
      <div className="bg-_gradient shadow w-full rounded-lg relative ">
        <Link to={`/recipes/${recipe?._id || id}`} className="w-full md:w-full">
          <div className="relative">
            <img
              src={image || defaultImage}
              alt={title}
              className="rounded-lg h-[200px] md:h-[150px] w-full"
            />
            <div className="absolute content flex gap-2 flex-wrap justify-center">
              <span className="px-2 py-1 text-[12px] capitalize bg-black shadow-xl rounded-full text-green-500">
                {readyInMinutes}
              </span>
              {dishTypes?.length > 0 ? (
                <span
                  key={0}
                  className="px-2 py-1 text-[12px] capitalize bg-black shadow-xl rounded-full text-green-500"
                >
                  {dishTypes[0]}
                </span>
              ) : (
                cuisines?.length > 0 ? (
                  <span
                  key={0}
                  className="px-2 py-1 text-[12px] capitalize bg-black shadow-xl rounded-full text-green-500"
                >
                  {cuisines[0]}
                </span>
                ) :
               diets?.length > 0 && (
                <span
                  key={0}
                  className="px-2 py-1 text-[12px] capitalize bg-black shadow-xl rounded-full text-green-500"
                >
                  {diets[0]}
                </span>
               )
              )}
            </div>
          </div>

          <div className="p-3">
            <p className="font-semibold text-[#1FB137]">{title}</p>
          </div>
        </Link>
      </div>
      <div className="inline-block absolute right-4 top-2 ">
        {favouriteFlag ? (
          flagFavourite ? (
            <button onClick={handleFavouriteClick}>
              <span className="fa-layers">
                <FontAwesomeIcon
                  icon={faHeartSolid}
                  color="#9c1616"
                  fontSize={"30px"}
                />
              </span>
            </button>
          ) : (
            <button onClick={handleFavouriteClick}>
              <span className="fa-layers text-center">
                <FontAwesomeIcon
                  icon={faHeartSolid}
                  color={"white"}
                  fontSize={"28px"}
                  style={{ left: 1 + "px" }}
                />
                <FontAwesomeIcon
                  icon={faHeartBorder}
                  color={"red"}
                  fontSize={"30px"}
                />
              </span>
            </button>
          )
        ) : (
          console.log()
        )}
      </div>
      <Dialog
        open={infoDialog}
        onClose={closeDialog}
        fullWidth
        maxWidth="xs"
        PaperProps={{ style: { height: "100px", borderradius: "50%" } }}
      >
        <InfoDialog
          info={"You need to be logged in first"}
          onClose={closeDialog}
        />
      </Dialog>
    </div>
  );
};

export default RecipeCard;
