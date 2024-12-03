import React from "react";
import HeroCTA from "../buttons/HeroCTA";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
export default function Hero() {
  return (
    <div className="relative -mt-10  bg-[url('https://img.freepik.com/free-photo/different-cookies-top-view-dark-surface-with-copy-space_176474-536.jpg?t=st=1732332592~exp=1732336192~hmac=cfac24b0e017dfc93061abf844b57bf48de0ebe500303ff0cd4e52a0eb3abb4e&w=1060')] w-screen h-auto  bg-cover grid place-items-center bg-center">
      <div className="w-full h-[90vh]  bg-black bg-opacity-50 text-customBrown-light   p-5  text-center grid place-content-center gap-2 ">
        <div>
          <h1 className=" text-[50px]  md:text-[70px] lg:text-[80px]   font-extrabold font-serif">
            Handmade Heavenly <br /> Cookie Boxes
          </h1>
          {/* <p className="md:text-[30px] text-[20px] md:-mt-10  mb-10 font-light">
            Top-quality gadgets designed to elevate your lifestyle
          </p> */}
        </div>
        <div className="flex justify-center mt-10">
        <HeroCTA text="Shop Now" Icon={IoIosArrowRoundForward} />
        </div>
        
      </div>
    </div>
  );
}
