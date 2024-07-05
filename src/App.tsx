//App.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { RootState } from "./app/store";
import AppLayout from "./components/shared/AppLayout";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import { setLogout, setToken, setUser } from "./features/auth/authSlice";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import LinkPage from "./pages/LinkPage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Redirect from "./pages/Redirect";
import Register from "./pages/Register";
import { useLazyGetUserQuery, useRefreshTokenMutation } from "./services/auth";

const useAuth = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const [getUser, userResult] = useLazyGetUserQuery();
  const [refreshToken, refreshTokenResult] = useRefreshTokenMutation();

  useEffect(() => {
    if (token) {
      getUser("");
    }
  }, [token, getUser]);

  useEffect(() => {
    if (
      userResult.isError &&
      (userResult.error as any)?.data.message === "Not authorized, token failed"
    ) {
      refreshToken("");
    } else if (userResult.isSuccess) {
      dispatch(setUser(userResult.data));
    }
  }, [userResult, refreshToken, dispatch]);

  useEffect(() => {
    if (refreshTokenResult.isSuccess) {
      dispatch(setToken(refreshTokenResult.data.token));
    } else if (refreshTokenResult.isError) {
      dispatch(setLogout());
    }
  }, [refreshTokenResult, dispatch]);
};

const App = () => {
  useAuth();

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/link/:id" element={<LinkPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
      <Route path="/:id" element={<Redirect />} />
    </Routes>
  );
};

export default App;
