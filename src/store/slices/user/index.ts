import { Action, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { logar as loginService } from "src/services/usuarios";
import {
  LoginUserPayloadInterface,
  UserInitialStateInterface,
} from "./interfaces";

const initialState: UserInitialStateInterface = {
  loggedUser: undefined,
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    login: (state, action: PayloadAction<LoginUserPayloadInterface>) => {
      const payload = action.payload;

      if (payload) {
        const user = loginService(payload?.emailOrCpf, payload?.password);

        if (!user) {
          throw Error("Invalid Email/CPF or password");
        }

        state.loggedUser = user;
      } else {
        state.loggedUser = undefined;
      }
    },
    logout: (state) => {
      state.loggedUser = undefined;
    },
  },
});

const userReducer = userSlice.reducer;

export { userReducer };
export const { login, logout } = userSlice.actions;
