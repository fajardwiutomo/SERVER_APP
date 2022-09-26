import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";

let store = configureStore({
  reducer: {
    movie: movieReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
