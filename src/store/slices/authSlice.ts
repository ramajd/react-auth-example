import { createSlice } from "@reduxjs/toolkit";
import { UserEntity } from "../../services/UserAPI";
import { loginUser, registerUser } from "../actions/authActions";

const token = localStorage.getItem("token");

export interface AuthState {
  loading: boolean;
  success: boolean;
  error?: string;
  token?: string;
  user?: UserEntity;
}

const initialState: AuthState = {
  loading: false,
  success: false,
  error: undefined,
  token: token ?? undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
    logoutUser: (state) => {
      state.token = undefined;
      state.user = undefined;
      state.success = false;
    },
  },
  extraReducers: {
    // Register user
    [registerUser.pending.type]: (state) => {
      state.loading = true;
      state.error = undefined;
    },
    [registerUser.fulfilled.type]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [registerUser.rejected.type]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Login user
    [loginUser.pending.type]: (state) => {
      state.loading = true;
      state.error = undefined;
    },
    [loginUser.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.token = payload.token;
      state.user = payload.user;
    },
    [loginUser.rejected.type]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    }
  },
});

export const { resetSuccess, logoutUser } = authSlice.actions;
export default authSlice.reducer;
