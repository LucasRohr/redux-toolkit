import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  initialState: {
    loggedUser: {},
  },
  name: "user",
  reducers: {
    login: (state, action) => {
      state.loggedUser = action.payload;
    },
  },
});

const userReducer = userSlice.reducer;

export { userReducer };
export const { login } = userSlice.actions;
