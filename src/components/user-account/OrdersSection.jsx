import React from "react";

const Order = ({
  image = "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  name = "Cookie Product Sample",
  quantity = 1,
}) => {
  return (
    <div className="flex lg:justify-between p-5 bg-gray-100 font-thin text-customBrown-darkest">
      <div className="flex space-x-5">
        <img src={image} alt={name} className="w-20 h-20" />
        <div>
          <p>{name}</p>
          <p>Qty: {quantity}</p>
        </div>
      </div>

      <div className="flex space-x-10 self-end font-thin">
        <button className="bg-customBrown hover:bg-customBrown-dark text-white px-5 py-1">
          Write a Review
        </button>
        <button className="bg-customBrown-darkest hover:bg-customBrown-dark text-white px-5 py-1">
          Order Again
        </button>
      </div>
    </div>
  );
};

export default function OrdersSection() {
  return (
    <div>
      <h2 className="font-semibold text-xl mb-5 text-customBrown-darkest">Order History</h2>
      <div className="grid gap-2">
        <Order />
        <Order />
        <Order />
      </div>
    </div>
  );
}
