import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../../store/useCartLocalStorage";

import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { useAuthStore } from "../../store/useAuthStore";
import { handleLogout } from "../../utils/useAuthHook";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { truncateBeforeChar } from "../../utils/helpers";

export default function Navbar({ bannerIsHidden, handleSidebar }) {
  const { cartItems } = useCartStore();
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const signOut = () => {
    handleLogout();
    window.location.reload();
  };
  const[truncatedEmail, setTruncatedEmail] = useState(null)


useEffect(()=>{
if(user){
  let result =truncateBeforeChar(user.email, "@")
  setTruncatedEmail(result)
 
}
console.log(truncatedEmail)
},[])
 

  return (
    <div className="sticky top-0 z-50">
      {" "}
      <div
        className={`  ${
          bannerIsHidden ? "-translate-y-52" : " "
        } bg-customBrown-dark w-full h-10 text-center text-white flex  items-center justify-center  transform transition-transform duration-1000 ease-in-out font-thin`}
      >
        {" "}
        FREE SHIPPING FOR ORDERS OVER &#8369;150
      </div>
      {/* main navbar */}
      <div
        className={`${
          bannerIsHidden ? "-translate-y-8" : ""
        } w-full py-2 bg-white text-customBrown-darkest flex justify-between  mx-auto px-5  items-center   transform transition-transform duration-500 ease-in-out shadow-md `}
      >
        <Link to={"/"}>
          <span className="flex items-center space-x-2">
            <img src="/cookie.png" alt="" className="w-10 h-10" />
            <p className="font-bold">Crumblite</p>
          </span>
        </Link>
        {/* onclick  open sidebar menu */}
        <div onClick={handleSidebar} className="md:hidden cursor-pointer">
          <HiOutlineMenuAlt4 className="text-2xl " />
        </div>

        <div className="space-x-10 md:flex hidden">
          <Link to={"/"}>
            <span className="">Home</span>
          </Link>
          <Link to={"/shopboxes"}>
            <span className="">ShopBoxes</span>
          </Link>
          <Link to={"/giftcard"}>
            <span className="">Gift Card</span>
          </Link>
          <Link to={"/contactus"}>
            <span className="">Contact Us</span>
          </Link>
        </div>
        <div className="space-x-5 items-center flex ">
          {/* <span className="w-[50px] overflow-hidden text-ellipsis"> {user.email} </span> */}
          <Link to={"/cart"}>
            <PiShoppingCartSimpleThin className="text-2xl" />
          </Link>
          {user ? (
            <div  className="relative group flex ">
              {/* Dropdown */}
              <div className="hidden group-hover:grid gap-5 absolute -bottom-32 right-0 p-4  rounded-lg bg-customBrown-light text-customBrown-darkest">
                <p>Signed In as:
                <br />
                {user.email}</p>
                <span 
                onClick={signOut}
                className="cursor-pointer bg-customBrown text-white px-5 py-1 rounded-full font-semibold hover:scale-105 duration-300 text-center">
                Logout
              </span>
              </div>
              
              <div className="cursor-pointer text-center flex items-center space-x-2 border border-customBrown-dark rounded-md pr-2">
                <img
                  src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <p className="text-xs">Welcome, <br /> {truncatedEmail}</p>
                
              </div>
            </div>
          ) : (
            <Link to={"/login"}>
              <span className="cursor-pointer bg-customBrown text-white px-5 py-1 rounded-full font-semibold hover:scale-105 duration-300">
                Login
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
