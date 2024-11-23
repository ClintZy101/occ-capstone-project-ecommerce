import React from "react";
import { FaStar } from "react-icons/fa6";

export default function ReviewStars({cookie}) {
  const Stars = () => {
    const starsArray = Array(cookie.stars).fill(null); // Create an array of length `cookie.stars`
    return starsArray.map((_, index) => (
      <FaStar key={index} className="text-yellow-500" />
    ));
  };
  return (
    <div className="flex items-center space-x-2">
      <Stars />
      <p className="font-thin text-xs">{cookie.review_count} reviews</p>
    </div>
  );
}
