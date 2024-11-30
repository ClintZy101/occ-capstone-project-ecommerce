import React, { useEffect, useRef, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import useCartStore from "../../store/useCartLocalStorage";

import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { useAuthStore } from "../../store/useAuthStore";
import { handleLogout } from "../../utils/useAuthHook";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { truncateBeforeChar } from "../../utils/helpers";
import useCartModal from "../../store/useCartModal";
import useOutsideAlerter from "../../utils/useOutsideAlerter";
import AccountDropdown from "./AccountDropdown";

export default function Navbar({ bannerIsHidden, handleSidebar }) {
  const { cartItems } = useCartStore();
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const { setCartModalIsOpen } = useCartModal();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  // console.log('user id',user.uid)
  const signOut = () => {
    handleLogout();
    window.location.reload();
  };
  const [truncatedEmail, setTruncatedEmail] = useState(null);

  const location = useLocation();
  const pathname = location.pathname;
  const [isActive, setIsActive] = useState("");

  const [accountDropdownIsActive, setAccountDropdownIsActive] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(
    wrapperRef,
    setAccountDropdownIsActive,
    accountDropdownIsActive
  );

  useEffect(() => {
    if (user) {
      let result = truncateBeforeChar(user.email, "@");
      setTruncatedEmail(result);
    }

  }, [user]);

  useEffect(() => {
    switch (pathname) {
      case "/":
        setIsActive("/");
        break;
      case "/products":
        setIsActive("/products");
        break;
      case "/contactus":
        setIsActive("/contactus");
        break;
      case "/checkout":
        setIsActive("/checkout");
        break
        default:
          if (pathname.startsWith(`/account`)) {
            setIsActive(`/account`);
          }
    }
  }, [pathname]);

  // console.log(pathname, isActive);

  return (
    <div className="sticky top-0 z-50">
      {" "}
      <div
        className={`  ${
          bannerIsHidden ? "-translate-y-52" : " "
        } bg-customBrown-dark w-full h-10 text-center text-white flex  items-center justify-center  transform transition-transform duration-1000 ease-in-out font-thin`}
      >
        {" "}
        FREE SHIPPING FOR ORDERS OVER &#8369;1000
      </div>
      {/* main navbar */}
      <div
        className={`${
          bannerIsHidden ? "-translate-y-10" : ""
        } w-full py-2 bg-white text-customBrown-darkest flex justify-between  mx-auto px-5  items-center   transform transition-transform duration-500 ease-in-out shadow-md `}
      >
        <Link to={"/"}>
          <span className="flex items-center space-x-2">
            <img src="/logo.png" alt="crumbly" className="w-14 h-14" />
            <p className="font-bold">Crumbly</p>
          </span>
        </Link>
        {/* onclick  open sidebar menu */}
        <div onClick={handleSidebar} className="lg:hidden cursor-pointer">
          <HiOutlineMenuAlt4 className="text-2xl " />
        </div>

        <div className=" lg:flex hidden lg:ml-20">
          <Link to={"/"}>
            <span
              className={`border-r px-5 ${isActive === "/" && "font-bold"}`}
            >
              Home
            </span>
          </Link>
          <Link to={"/products"}>
            <span
              className={`border-r px-5 ${
                isActive === "/products" && "font-bold"
              }`}
            >
              Products
            </span>
          </Link>
          {/* <Link to={"/giftcard"}>
            <span className="">Gift Card</span>
          </Link> */}
          <Link to={"/contactus"}>
            <span
              className={`border-r px-5 ${
                isActive === "/contactus" && "font-bold"
              }`}
            >
              Contact Us
            </span>
          </Link>
          <Link to={"/checkout"}>
            <span
              className={`border-r px-5 ${isActive === "/checkout" && "font-bold"}`}
            >
              Checkout
            </span>
          </Link>
          <Link to={"/account/"}>
            <span
              className={` px-5 ${isActive === "/account" && "font-bold"}`}
            >
              Account
            </span>
          </Link>
        </div>
        <div className="space-x-5 items-center flex ">
          {/* <span className="w-[50px] overflow-hidden text-ellipsis"> {user.email} </span> */}
          <span
            className="cursor-pointer relative"
            onClick={() => setCartModalIsOpen(true)}
          >
            <PiShoppingCartSimpleThin className="text-2xl" />
            <span className="w-6 h-6 absolute -top-2 -right-3 bg-yellow-400 rounded-full grid place-items-center">
              <p>{totalQuantity}</p>
            </span>
          </span>

          {user ? (
            <div className={` relative group flex `}>
              {/* Dropdown */}
              <AccountDropdown
                wrapperRef={wrapperRef}
                signOut={signOut}
                user={user}
                accountDropdownIsActive={accountDropdownIsActive}
                setAccountDropdownIsActive={setAccountDropdownIsActive}
              />

              {/* Avatar and Welcome User */}
              <div
                onClick={() =>
                  setAccountDropdownIsActive(!accountDropdownIsActive)
                }
                className="cursor-pointer text-center flex items-center space-x-2  rounded-md pr-2"
              >
                <img
                  src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                  alt=""
                  className="w-10 h-10 rounded-full "
                />
                <p className="text-xs hidden md:flex">
                  Welcome, <br /> {user.displayName || truncatedEmail}
                </p>
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
