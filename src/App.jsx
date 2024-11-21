import { Routes, Route, useLocation } from "react-router-dom";
import scrollHook from "./utils/scrollHook";
import Navbar from "./components/navbar/Navbar";
// Supports weights 300-800
import "@fontsource-variable/open-sans";
import Sidebar from "./components/navbar/Sidebar";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./footer/Footer";
import ShopBoxes from "./pages/ShopBoxes";
import SingleProduct from "./pages/SingleProduct";
import CartPage from "./pages/CartPage";

function App() {
  const { bannerIsHidden } = scrollHook();
  const [sidebarIsShown, setSideBarIsShown] = useState(false);
  const handleSidebar = () => {
    setSideBarIsShown(!sidebarIsShown);
  };
  const location = useLocation();
  const shouldShowNavbar = location.pathname !== "/login";
  return (
    <>
      {shouldShowNavbar && (
        <>
          <Navbar
            bannerIsHidden={bannerIsHidden}
            sidebarIsShown={sidebarIsShown}
            handleSidebar={handleSidebar}
          />
          <Sidebar
            sidebarIsShown={sidebarIsShown}
            handleSidebar={handleSidebar}
          />
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shopboxes" element={<ShopBoxes />} />
        <Route path="/shopboxes/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
