import React from "react";
import { BsCart } from "react-icons/bs";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import useCartStore from "../../store/useCartLocalStorage";


export default function Navbar({ bannerIsHidden }) {
  const { cartItems} = useCartStore();
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="sticky top-0 z-50">
      {" "}
      <div
        className={`  ${
          bannerIsHidden ? "-translate-y-52" : " "
        } bg-black w-full h-10 text-center text-white flex  items-center justify-center  transform transition-transform duration-1000 ease-in-out`}
      >
        {" "}
        FREE 2-DAY SHIPPING FOR ORDERS OF $1000 OR MORE
      </div>
      {/* main navbar */}
      <div
        className={`${
          bannerIsHidden ? "-translate-y-8" : ""
        } w-full h-10 bg-white text-black bg-opacity-80 flex justify-between  mx-auto px-5  items-center   transform transition-transform duration-500 ease-in-out shadow-md`}
      >

        <div className="flex space-x-8 uppercase">
       
        </div>
      </div>
    </div>
  );
}
