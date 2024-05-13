import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  user: null,
  roles: null,
  tokens: null,
  isLoggedIn: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
};

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const response = await authService.login(data);
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = null;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.tokens = null;
      state.message = "Logged out successfully";
      state.isError = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = payload?.user;
      state.isLoggedIn = true;
      state.message = "Login successful";
      localStorage.setItem("token", payload?.access_token);
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    });
  },
});

export const { reset, logout } = authSlice.actions;

const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
const selectUser = (state) => state.auth.user;

export { selectIsLoggedIn, selectUser };

export default authSlice.reducer;
