import React from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import useCartStore from "../../store/useCartLocalStorage";

export default function CartModal({ cartModalIsOpen, setCartModalIsOpen }) {
    const {} = useCartStore();
  return (
    <div
      className={`z-50 fixed top-0 right-0 w-screen h-full  flex   text-white transform transition-all duration-300  ${
        cartModalIsOpen
          ? "translate-x-0 opacity-100"
          : "-translate-x-full opacity-0"
      }`}
    >
      <span
        onClick={() => setCartModalIsOpen(false)}
        className="absolute top-5 left-5 cursor-pointer text-3xl group"
      >
        <RiCloseLargeFill className="transition-transform duration-300 group-hover:rotate-180" />
      </span>
      <div className="grid place-items-center w-1/2 bg-customBrown-light">
        cart modal
      </div>
      <div 
      onClick={()=>setCartModalIsOpen(false)}
      className="w-1/2 bg-customBrown-darkest opacity-50"></div>
    </div>
  );
}
