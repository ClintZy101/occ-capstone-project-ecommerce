import { div } from "framer-motion/client";
import React from "react";

export default function SweetReview() {
  const customerData = [
    {
      name: "Jake",
      img_src:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
      review: "Soft and crumbly—just how I like them! Totally yum!",
    },
    {
      name: "Emma",
      img_src:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800",
      review: "Best cookies ever. Ate five before I realized it!",
    },
    {
      name: "Sophie",
      img_src:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
      review: "Sweet, buttery, and gone in seconds. Need more!",
    },
  ];
  return (
    <div className="p-5">
        <h2 className="font-bold text-2xl text-customBrown-darkest mb-10">Our Sweet Review</h2>
    <div className="grid md:gap-2 gap-10  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white ">
      {customerData.map((data, i) => (
        <div key={i} className="bg-customBrown-darkest p-5 rounded mx-auto relative">
          <div  className="flex items-center space-x-2 mb-2">
            <div className="w-14 h-14 rounded-full overflow-hidden -top-7 left-2 absolute">
            <img src={data.img_src} alt={data.name} className="w-full h-auto rouded-full " />
            </div>
            
            <p className="mt-2 font-semibold">{data.name}'s Review</p>
          </div>
          <p>“{data.review}”</p>
        </div>
      ))}
    </div>
    </div>
  );
}
