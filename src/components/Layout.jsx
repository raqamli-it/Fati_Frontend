import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";
import { Footer } from "./Footer/Footer";

export const Layout = () => {
  return (
    <div className="layout">
      <Navbar />

      <div style={{ minHeight: "58vh" }}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
