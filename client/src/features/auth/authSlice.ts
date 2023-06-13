import { User } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../app/services/auth";
import { RootState } from "../../app/store";

interface InitialState {
  user: (User & { token: string }) | null;
  isAuth: boolean;
}

const initialState: InitialState = {
  user: null,
  isAuth: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
        .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
        })
        .addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
        })
        .addMatcher(authApi.endpoints.current.matchFulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
        })
  }
});

export const { logout } = slice.actions;

export default slice.reducer;

export const  selectIsAuth = (state: RootState) => state.auth.isAuth

export const selectUser = (state: RootState) => state.auth.user