import React from "react";
import {Link} from "react-router-dom";


const LinksSection = () => {
  return (
    <>
      <ul className="hidden md:flex text-white gap-9">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/favourites">Favourites</Link>
        </li>
        <li>
          <Link to="/myrecipes">My recipes</Link>
        </li>
      </ul>
    </>
  );
};

export default LinksSection;
