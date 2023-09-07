import { createSlice } from "@reduxjs/toolkit";
import { loginAction } from "../actions/auth";

const initialState = {
  isLoading: false,
  token: null,
  error: null,
  isSuccess: false,
  isError: false
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, () => ({
        ...initialState,
        isLoading: true,
      }))
      .addCase(loginAction.rejected, (state, { payload }) => ({
        ...state,
        error: payload,
        isLoading: false,
        isError: true,
        isSuccess: false
      }))
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        const token = payload.data.token;
        return {
          ...state,
          token: token,
          isLoading: false,
          isSuccess: true,
          isError: false
        };
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;