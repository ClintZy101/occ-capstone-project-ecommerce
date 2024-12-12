import React from "react";
import HeroCTA from "../buttons/HeroCTA";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
export default function Hero() {
  return (
    <div className="relative -mt-10  bg-[url('https://images.pexels.com/photos/12295406/pexels-photo-12295406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] w-screen h-auto  bg-cover grid place-items-center bg-center">
      <div className="w-full h-[90vh]  bg-black bg-opacity-50 text-customBrown-light   p-5  text-center grid place-content-center gap-2 ">
        <div>
          <h1 className="animate-fade-in-delay-3 text-[50px]  md:text-[70px] lg:text-[80px] font-extrabold font-serif">
            Handmade Heavenly <br /> Cookie Boxes
          </h1>
          {/* <p className="md:text-[30px] text-[20px] md:-mt-10  mb-10 font-light">
            Top-quality gadgets designed to elevate your lifestyle
          </p> */}
        </div>
        <div className="animate-scale-up flex justify-center mt-10">
        <HeroCTA text="Shop Now" Icon={IoIosArrowRoundForward} />
        </div>
        
      </div>
    </div>
  );
}
