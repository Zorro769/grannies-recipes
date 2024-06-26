import FavouritesData from "components/Favourites/FavouritesData";
import Loading from "components/Shared/Loading";
import { Suspense } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import fetchFavouritesResource from "utils/fetchFavouriteRecipes";

const Favourites = () => {
  const axiosPrivate = useAxiosPrivate();
  const initialResource = fetchFavouritesResource(axiosPrivate, 1);

  return (
    <Suspense fallback={<Loading />}>
      <FavouritesData initialResource={initialResource} />
    </Suspense>
  );
};

export default Favourites;
