//authSlice.tsx
import { IUser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: IUser | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, setToken, setLogout } = authSlice.actions;
export default authSlice.reducer;
