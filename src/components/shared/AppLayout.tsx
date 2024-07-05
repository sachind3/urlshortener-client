//AppLayout.tsx
import { Outlet } from "react-router-dom";
import Header from "./Header";

const AppLayout = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4">
        <Outlet />
      </div>
    </>
  );
};
export default AppLayout;
