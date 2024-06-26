import wrapPromise from "./suspender";

const fetchFavouritesResource = (axiosPrivate, page = 1) => {
  console.log(axiosPrivate)
    return wrapPromise(
      axiosPrivate
        .get(`/recipes/favourite?page=${page}&size=1`)
        .then(({ data: { totalItems } }) => {
          const pageSize = Math.min(totalItems, 20);
          return axiosPrivate.get(
            `/recipes/favourite?page=${page}&size=${pageSize}&language=en&usd`
          );
        })
    );
  };

export default fetchFavouritesResource;