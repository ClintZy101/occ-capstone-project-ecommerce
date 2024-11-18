import React from "react";
import HeroCTA from "../buttons/HeroCTA";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
export default function Hero() {
  return (
    <div className="relative -mt-10  bg-[url('https://static.wixstatic.com/media/c837a6_00e3407ad707421e91f915620bb3699d~mv2.jpeg/v1/fill/w_724,h_724,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c837a6_00e3407ad707421e91f915620bb3699d~mv2.jpeg')] w-screen h-full  bg-cover grid place-items-center bg-center">
      <div className="w-full h-full bg-black bg-opacity-50 text-customBrown-light   p-5  text-center grid gap-2 ">
        <div>
          <h1 className=" mt-[50px] text-[40px]  md:text-[70px] lg:text-[100px] sm:mt-[70px]  md:mt-[70px] lg:mt-[70px]  font-extrabold font-serif">
            Handmade Heavenly Cookie Boxes
          </h1>
          {/* <p className="md:text-[30px] text-[20px] md:-mt-10  mb-10 font-light">
            Top-quality gadgets designed to elevate your lifestyle
          </p> */}
        </div>
        <div className="flex justify-center">
        <HeroCTA text="Shop Now" Icon={IoIosArrowRoundForward} />
        </div>
        
      </div>
    </div>
  );
}
