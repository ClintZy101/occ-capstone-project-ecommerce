import { Routes, Route, useLocation } from "react-router-dom";
import scrollHook from "./utils/scrollHook";
import Navbar from "./components/navbar/Navbar";
// Supports weights 300-800
import "@fontsource-variable/open-sans";
import Sidebar from "./components/navbar/Sidebar";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Checkout from "./pages/Checkout";
import CartModal from "./components/modals/CartModal";
import useCartModal from "./store/useCartModal";
import ContactUs from "./pages/ContactUs";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";
import { AnimatePresence, motion } from "framer-motion";
import UserAccount from "./pages/UserAccount";
import Footer from "./components/footer/Footer";
import ContactSupport from "./components/contact-support/ContactSupport";
import LoginTest from "./components/login/LoginTest";
import StripeCheckout from "./pages/StripeCheckout";

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
    animate: { opacity: 1, y: 0 },
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
            path="/logintest"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <LoginTest />
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
            path="/contactus/support"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <ContactSupport />
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
          <Route
            path="/stripe-checkout"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <StripeCheckout />
              </motion.div>
            }
          />

          {/* path="/account/:id" */}
          <Route
            path="/account/*"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <UserAccount />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
