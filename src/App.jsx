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
import Checkout from "./pages/Checkout";
import CartModal from "./components/cart-modal/CartModal";
import useCartModal from "./store/useCartModal";

function App() {
  const { bannerIsHidden } = scrollHook();
  const [sidebarIsShown, setSideBarIsShown] = useState(false);
  const handleSidebar = () => {
    setSideBarIsShown(!sidebarIsShown);
  };
  const location = useLocation();
  const shouldShowNavbar = location.pathname !== "/login";
  const {cartModalIsOpen, setCartModalIsOpen} = useCartModal();
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
      <CartModal
        cartModalIsOpen={cartModalIsOpen}
        setCartModalIsOpen={setCartModalIsOpen}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ShopBoxes />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
