import FavouritesData from "components/Favourites/FavouritesData";
import Loading from "components/Shared/Loading";
import { Suspense, useState, useEffect } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import fetchFavouritesResource from "utils/fetchFavouriteRecipes";

const Favourites = () => {
  const axiosPrivate = useAxiosPrivate();
  const [initialResource, setInitialResource] = useState();

  useEffect(() => {
    const resource = fetchFavouritesResource(axiosPrivate, 1);
    setInitialResource(resource);
  }, [axiosPrivate]);

  if (!initialResource) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <FavouritesData initialResource={initialResource} />
    </Suspense>
  );
};

export default Favourites;
