import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { setTokenInCookies, removeTokenFromCookies } from '../../utils/auth';

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    setTokenInCookies(response.data.token);
    return response.data;
  }
);

export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
  const response = await api.post('/auth/refresh');
  setTokenInCookies(response.data.token);
  return response.data.token;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  removeTokenFromCookies();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.token = null;
    });
  },
});

export default authSlice.reducer;
