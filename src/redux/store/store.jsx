import { configureStore } from "@reduxjs/toolkit";
import globalSlices from "../slices/globalSlices";

const store = configureStore({
  reducer: {
    global: globalSlices,
  },
});

export default store;
