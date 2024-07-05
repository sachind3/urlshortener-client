//AppLayout.tsx
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const AppLayout = () => {
  return (
    <>
      <Header />
      <section className="min-h-[calc(100dvh-105px)]">
        <div className="container mx-auto px-4">
          <Outlet />
        </div>
      </section>
      <Footer />
    </>
  );
};
export default AppLayout;
