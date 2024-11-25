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
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Checkout from "./pages/Checkout";
import CartModal from "./components/cart-modal/CartModal";
import useCartModal from "./store/useCartModal";
import Dashboard from "./pages/Dashboard";
import ContactUs from "./pages/ContactUs";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";
import { AnimatePresence, motion, transform } from "framer-motion";


function App() {
  const { bannerIsHidden } = scrollHook();
  const [sidebarIsShown, setSideBarIsShown] = useState(false);
  const handleSidebar = () => {
    setSideBarIsShown(!sidebarIsShown);
  };
  const location = useLocation();
  const shouldShowNavbar = location.pathname !== "/login";
  const { cartModalIsOpen, setCartModalIsOpen } = useCartModal();

  const pageVariants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0, },
    exit: { opacity: 0, y: 50 },
  };
  return (
    <>
      <ScrollToTop />
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
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* <Route path="/" element={<Home />} /> */}
          <Route
            path="/"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/login"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <Login />
              </motion.div>
            }
          />
          <Route
            path="/products"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <Products />
              </motion.div>
            }
          />
          <Route
            path="/products/:id"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <SingleProduct />
              </motion.div>
            }
          />
          <Route
            path="/contactus"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <ContactUs />
              </motion.div>
            }
          />
          <Route
            path="/checkout"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <Checkout />
              </motion.div>
            }
          />

          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/products" element={<Products />} /> */}
          {/* <Route path="/products/:id" element={<SingleProduct />} /> */}
          {/* <Route path="/contactus" element={<ContactUs />} /> */}
          {/* <Route path="/checkout" element={<Checkout />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
