import React from "react";
import { Link } from "react-router-dom";

export default function HeroCTA({ text = "Shop Now", Icon }) {
  return (
    <Link to={"/products"}>
      <button className="group inline-flex  items-center justify-center font-mono h-[50px]  bg-customBrown-dark rounded-full text-white px-5  hover:scale-105  transition-all duration-500 uppercase cursor-pointer place-self-center w-[200px]">
        <p className="group-hover:scale-75 transition-all duration-500">
          {text}
        </p>
        {
          <Icon className="  text-3xl  group-hover:rotate-45 group-hover:scale-150 group-hover:-translate-x-2  transition duration-500" />
        }
      </button>
    </Link>
  );
}
