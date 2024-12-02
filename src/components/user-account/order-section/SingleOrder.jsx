import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";

export default function SingleOrder({
  handleProductForReview,
  image = "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  name = "Cookie Product Sample",
  quantity = 1,
  id
}) {
  // const {user} = useAuthStore();
  // console.log(user?.email)
  return (
    <div className=" grid gap-5 lg:flex lg:justify-between p-5 bg-gray-200 font-thin text-customBrown-darkest">
      <div className="flex space-x-5">
        <img src={image} alt={name} className="w-20 h-20" />
        <div>
          <p>{name}</p>
          <p>Qty: {quantity}</p>
        </div>
      </div>

      <div className="flex md:space-x-5 space-x-2 md:self-end  font-thin">
        <button 
        onClick={()=>handleProductForReview(name, id)}
        className="bg-customBrown hover:bg-customBrown-dark text-white px-5 py-1">
          Write a Review
        </button>
        <Link to={`/products`}>
          <button
            className="bg-customBrown-darkest hover:bg-customBrown-dark text-white px-5 py-1"
          >
            Order Again
          </button>
        </Link>
      </div>
    </div>
  );
}
