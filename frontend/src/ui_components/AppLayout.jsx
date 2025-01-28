import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const AppLayout = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = () => {
    setDarkMode((curr) => !curr);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="w-full bg-[#FFFFFF] dark:bg-[#181A2A]">
        <NavBar darkMode={darkMode} handleDarkMode={handleDarkMode} />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default AppLayout;
