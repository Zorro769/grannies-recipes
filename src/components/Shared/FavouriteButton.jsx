import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartBorder } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { addRecipeToFavourite } from "utils/services";

const FavouriteButton = ({ id, flag }) => {
  const [isFavourite, setIsFavourite] = useState(flag);

  const handleClick = () => {
    addRecipeToFavourite({ id });
    setIsFavourite(!isFavourite);
  };
  return (
    <>
      {isFavourite ? (
        <button onClick={handleClick}>
          <span className="fa-layers">
            <FontAwesomeIcon
              icon={faHeartSolid}
              color="#9c1616"
              fontSize={"30px"}
            />
          </span>
        </button>
      ) : (
        <button onClick={handleClick}>
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
      )}
    </>
  );
};

export default FavouriteButton;
