import React from "react";
import FavouriteButton from "components/Shared/FavouriteButton";

const RecipeImage = ({ id, image, alt, isFavourite }) => {
  return (
    <div className="w-full md:w-2/4 flex items-center md:border-r border-slate-800 pr-1">
      <div className="flex flex-col relative gap-5">
        <img
          src={image}
          alt={alt}
          className="rounded-lg h-[500px] md:h-[400px] md:w-[550px]"
        />
        <div className="inline-block absolute right-4 top-2 ">
          <FavouriteButton flag={isFavourite} id={id} />
        </div>
      </div>
    </div>
  );
};

export default RecipeImage;
