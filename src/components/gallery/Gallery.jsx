import React from "react";
import { FaPesoSign } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ReviewStars from "../reviews/ReviewStars";


export default function Gallery({ products, bgColor, category }) {

// bg-[#cfad96]
  return (
    <div className=" p-5 pb-20   ">
      <h1 className=" text-customBrown-darkest text-2xl mb-5 font-bold">{category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center items-center ">
        {products.map((product) => (
          <div
            key={product.id}
            className={` overflow-hidden grid relative  mx-auto `}
          >
            <div className=" overflow-hidden  rounded-t ">
              <Link to={`/products/${product.name}`} state={product}>
              <img
                src={product.img_src}
                alt={product.name}
                className="w-full h-full hover:scale-125 duration-300 cursor-pointer  aspect-square"
              />
              </Link>
            </div>
            <div className=" border border-customBrown-light  p-2 rounded-b">
              <p className="text-customBrown-darkest font-thin line-clamp-1 ">{product.name}</p>
              <ReviewStars cookie={product} />
              <p className="text-customBrown-dark flex space-x-2 items-center font-light mt-2">
                <FaPesoSign />
              {product.price.toFixed(2)}</p>
            </div>
            {/* <span
              className={`${
                product.on_sale ? "flex" : "hidden"
              } ml-5 text-black border-black border px-2 rounded absolute top-2`}
            >
              Sale
            </span> */}
          </div>
        ))}
      </div>
    </div>
  );
}
