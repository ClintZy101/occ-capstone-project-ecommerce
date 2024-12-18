import React from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import useCartStore from "../../store/useCartLocalStorage";
import { CiTrash } from "react-icons/ci";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FaPesoSign } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


export default function CartModal({ cartModalIsOpen, setCartModalIsOpen }) {
  const {
    cartItems,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    getTotalPrice,
    getItemTotalPrice,
  } = useCartStore();
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const navigate = useNavigate();
  const handleNavigate = () => {
    setCartModalIsOpen(false);
    navigate("/checkout");
  };
  // console.log(cartItems);
  return (
    <div
      className={`z-50 fixed top-0 right-0 w-screen h-full  flex    transform transition-all duration-300  ${
        cartModalIsOpen
          ? "translate-x-0 opacity-100"
          : "-translate-x-full opacity-0"
      }`}
    >
      {/* Cart Modal */}
      <div className="w-full md:w-1/2 px-5 bg-customBrown-light text-customBrown-darkest relative  ">

        {/* Header */}
        <div className="py-2 h-12 w-full  border-b border-b-customBrown bg-customBrown-dark absolute top-0 left-0  flex justify-between px-5 items-center ">
          <span className="flex space-x-3 items-center">
            <p className="font-semibold text-2xl italic">Cart </p>
            <p className="text-lg font-thin ">({totalQuantity} items)</p>
          </span>

          {/* <MdOutlineShoppingCartCheckout className="text-xl"/> */}

              {/* Close Button */}
          <span
            onClick={() => setCartModalIsOpen(false)}
            className=" z-50 cursor-pointer text-3xl group bg-customBrown-dark text-white rounded-full p-2"
          >
            <RiCloseLargeFill className="transition-transform duration-300 group-hover:rotate-180" />
          </span>
        </div>
        {/* Cart Items */}
        <div className="overflow-y-auto md:max-h-[400px] max-h-[600px] ">
          {cartItems.map((item) => (
            <div
            key={item.id} 
            className="flex items-center  justify-around border-b border-b-customBrown w-full mt-20 pb-4 ">
              {/* Item Image */}

              <div>
                <img src={item.img_src} alt={item.name} className="w-24" />
              </div>

              <div className="grid gap-2">
                <p>{item.name}</p>
                <p className="flex items-center">
                  <FaPesoSign />
                  {item.price}
                </p>
                <div className="flex space-x-10 justify-between items-center  w-full ">
                  {/* Quantity Control */}
                  <div className="flex space-x-4 items-center border-customBrown border w-max ">
                    <span
                      onClick={() => decrementQuantity(item.id)}
                      className="cursor-pointer hover:bg-customBrown-dark  w-10 h-10 grid place-items-center transition duration-300"
                    >
                      <BiMinus />
                    </span>
                    <span>{item.quantity}</span>
                    <span
                      onClick={() => incrementQuantity(item.id)}
                      className="cursor-pointer hover:bg-customBrown-dark  w-10 h-10 grid place-items-center transition duration-300"
                    >
                      <BiPlus />
                    </span>
                  </div>

                  <span className="text-xl flex items-center">
                    <FaPesoSign />
                    {item.price * item.quantity}
                  </span>
                </div>
              </div>
              <span
                onClick={() => removeFromCart(item.id)}
                className="cursor-pointer self-start"
              >
                {" "}
                <CiTrash className="text-2xl hover:text-red-500 " />
              </span>
            </div>
          ))}
        </div>
        {/* Subtotal  */}
        <div className="fixed bottom-0 left-0 w-full  md:w-1/2  bg-customBrown py-4 ">
          <div className="flex items-center space-x-3 mb-2 justify-center w-full">
            <h2 className="font-semibold text-xl">Subtotal: </h2>
            <p className="flex items-center font-thin text-xl">
              <FaPesoSign />
              {getTotalPrice().toFixed(2)}
            </p>
          </div>

          <div 
          onClick={handleNavigate}
          className="w-5/6 bg-white h-10 hover:border border-customBrown-darkest text-center items-center flex justify-center cursor-pointer mx-auto">
            <p> Checkout</p>
          </div>
        </div>
      </div>

      {/* half the page is blank, closes modal onclick */}
      <div
        onClick={() => setCartModalIsOpen(false)}
        className="hidden md:flex md:w-1/2 bg-black opacity-50"
      ></div>
    </div>
  );
}
