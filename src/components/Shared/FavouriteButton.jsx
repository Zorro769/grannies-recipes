import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartBorder } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { addRecipeToFavourite } from "utils/services";

const FavouriteButton = ({ id, flag, handleFavouriteClick }) => {
  const [isFavourite, setIsFavourite] = useState(flag || false);

  const handleClick = () => {
    handleFavouriteClick();
    setIsFavourite(!isFavourite);
  };

  return (
    <button onClick={handleClick} key={id + flag}>
      {isFavourite ? (
        <span className="fa-layers">
          <FontAwesomeIcon
            icon={faHeartSolid}
            color="#9c1616"
            fontSize={"30px"}
          />
        </span>
      ) : (
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
      )}
    </button>
  );
};

export default FavouriteButton;
