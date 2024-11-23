import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import QuantityButtons from "../components/buttons/QuantityButtons";
import useCartStore from "../store/useCartLocalStorage";
import AddToCartButton from "../components/buttons/AddToCartButton";
import CartModal from "../components/cart-modal/CartModal";
import useCartModal from "../store/useCartModal";
import ReviewStars from "../components/reviews/ReviewStars";

export default function SingleProduct() {
  const location = useLocation();
  const cookie = location.state;
  const [quantity,setQuantity] = useState(1)
  // const [cartModalIsOpen, setCartModalIsOpen] = useState(false)
  const {cartModalIsOpen, addToCart} = useCartStore();
  const { setCartModalIsOpen} = useCartModal();

   // Handle quantity increment and decrement
   const handleDecrement = () => {
    setQuantity((prevQty) => Math.max(prevQty - 1, 1));
  };

  const handleIncrement = () => {
    setQuantity((prevQty) => prevQty + 1);
  };

  // Prepare updated product and add it to cart
  const handleAddToCart = () => {
    const updatedProduct = { ...cookie, quantity };
    addToCart(updatedProduct);
    setCartModalIsOpen(true)
    // console.log(updatedProduct, cartModalIsOpen)
  };


  const Stars = () => {
    const starsArray = Array(cookie.stars).fill(null); // Create an array of length `cookie.stars`
    return starsArray.map((_, index) => <FaStar key={index} className="text-yellow-500" />);
  };
  return (
    <div className="p-5 flex text-customBrown-dark space-x-2">

      {/* image */}
      <div className="w-1/2">
        <img src={cookie.img_src} alt="" className="w-2/3 mx-auto" />
      </div>
      {/* details */}
      <div className="w-1/2">
        <h2 className="text-3xl font-bold">{cookie.name}</h2>
        {/* <div className="flex items-center space-x-2">
          <Stars />
          <p className="font-thin text-xs">{cookie.review_count} reviews</p>
        </div> */}
        <ReviewStars cookie={cookie} />
        <p className="mt-5">{cookie.prod_desc}</p>
        <div className="mt-5">
          <p className="mb-2">Quantity</p>
          <QuantityButtons handleDecrement={handleDecrement} handleIncrement={handleIncrement} quantity={quantity} />
        </div>
        <div className="mt-5">
        <AddToCartButton  handleClick={handleAddToCart}/>
        </div>
        
      </div>
    </div>
  );
}
