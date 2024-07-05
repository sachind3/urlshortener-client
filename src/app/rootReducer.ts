// rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";

import authReducer, { setLogout } from "@/features/auth/authSlice";
import { authApi } from "@/services/auth";
import { clickApi } from "@/services/click";
import { urlApi } from "@/services/url";

const appReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [clickApi.reducerPath]: clickApi.reducer,
  [urlApi.reducerPath]: urlApi.reducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === setLogout.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
