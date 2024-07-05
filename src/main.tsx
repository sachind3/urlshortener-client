//main.tsx
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import { store } from "./app/store";
import { ThemeProvider } from "./components/shared/theme-provide";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <Routes>
          <Route element={<App />} path="/*" />
        </Routes>
      </Provider>
      <Toaster />
    </ThemeProvider>
  </BrowserRouter>
);
