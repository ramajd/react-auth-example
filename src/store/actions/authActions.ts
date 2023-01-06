import { createAsyncThunk } from "@reduxjs/toolkit";
import UserAPI, { LoginParams, RegisterParams } from "../../services/UserAPI";

export const registerUser = createAsyncThunk<
  void,
  RegisterParams,
  {
    rejectValue: string;
  }
>("auth/register", async (user: RegisterParams, { rejectWithValue }) => {
  const api = new UserAPI();
  try {
    await api.register(user);
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginParams, { rejectWithValue }) => {
    const api = new UserAPI();
    try {
      const response = await api.login(email, password);
      localStorage.setItem("token", response.token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
