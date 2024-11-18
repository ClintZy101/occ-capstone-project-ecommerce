import React from "react";
import { FaPesoSign } from "react-icons/fa6";
// import useProduct from "../../store/useProduct";
import { Link } from "react-router-dom";


export default function Gallery({ products }) {
//   const{product, setProduct} =useProduct()

console.log(products)
  return (
    <div className=" p-5 pb-20 min-h-[700px] text-customBrown-light">
      {/* <h1 className="uppercase text-customBrown-light text-lg mb-5">{category}</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 place-items-center w-full relative">
        {products.map((product, index) => (
          <div
            key={product.id}
            className=" overflow-hidden bg-customBrown-dark p-4 grid max-h-[500px] max-w-[300px] relative"
          >
            <div className="max-h-[270px] overflow-hidden rounded ">
              <Link to={`/shopboxes/${product.name}`}>
              <img
                src={product.img_src}
                alt={product.name}
                className="w-full h-full rounded hover:scale-125 duration-300 cursor-pointer min-h-[300px] aspect-square"
              />
              </Link>
            </div>
            <div className="my-4">
              <p className="text-white line-clamp-1">{product.name}</p>
              <p className="text-customBrown-light flex space-x-2 items-center">
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
