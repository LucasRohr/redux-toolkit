import { Middleware, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices";
import createDebugger from "redux-flipper";

const middlewares: Middleware[] = [];

if (__DEV__) {
  middlewares.push(createDebugger());
}

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(...middlewares), // Apply default middlewares and add custom ones
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
