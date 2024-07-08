import wrapPromise from "./suspender";

const fetchFavouritesResource = (axiosPrivate, page = 1) => {
  return wrapPromise(axiosPrivate.get(`/recipes/favourite?page=${page}&size=${20}&language=en`));
};

export default fetchFavouritesResource;