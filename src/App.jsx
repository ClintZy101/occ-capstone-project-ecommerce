import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import scrollHook from "./utils/scrollHook";
import Navbar from "./components/navbar/Navbar";
function App() {
  const { bannerIsHidden } = scrollHook();
  return (
    <Router>
      <Navbar bannerIsHidden={bannerIsHidden} />
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer /> */}
    </Router>
  );
}

export default App;
