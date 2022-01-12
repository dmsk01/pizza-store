import axios from "axios";

export const setLoaded = ({ type, order }) => ({
  type: "SET_LOADED",
  payload: { type, order },
});

export const fetchPizzas = (category, sortBy) => (dispatch) => {
  dispatch(setLoaded(false));

  const categoryQuery = category !== null ? `category=${category}` : "";

  axios.get(`/pizzas?${categoryQuery}&_sort=${sortBy.type}&_order=${sortBy.order}`).then(({ data }) => {
    dispatch(setPizzas(data));
  });
};

export const setPizzas = (items) => {
  return {
    type: "SET_PIZZAS",
    payload: items,
  };
};
