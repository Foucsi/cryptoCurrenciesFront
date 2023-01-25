import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: null,
    token: null,
    password: null,
    email: null,
    crypto: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.password = action.payload.password;
      state.value.email = action.payload.email;
    },
    logout: (state) => {
      state.value.username = null;
      state.value.email = null;
      state.value.token = null;
    },
    moreCrypto: (state, action) => {
      state.value.crypto.push(action.payload);
    },
  },
});

export const { login, logout, moreCrypto } = userSlice.actions;
export default userSlice.reducer;
