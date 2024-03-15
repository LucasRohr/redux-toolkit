import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
