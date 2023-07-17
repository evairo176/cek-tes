import { globalAction } from "../slices/globalSlices";

const setLoading = (value) => {
  return globalAction({ type: "SET_LOADING", value });
};

const setData = (value) => {
  return globalAction({ type: "SET_DATA", value });
};

const setBreed = (value) => {
  console.log(value);
  return globalAction({ type: "SET_BREED", value });
};

export { setLoading, setData, setBreed };
