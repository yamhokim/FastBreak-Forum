import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <main className="w-full bg-[#FFFFFF] dark:bg-[#181A2A]">
      <NavBar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default AppLayout;
