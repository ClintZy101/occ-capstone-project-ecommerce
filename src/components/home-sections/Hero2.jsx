import React, { useState, useEffect } from "react";
import HeroCTA from "../buttons/HeroCTA";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function Hero2() {
  const [text, setText] = useState("Heavenly");

  useEffect(() => {
    const interval = setInterval(() => {
      setText((prevText) =>
        prevText === "Heavenly" ? "Perfected" : "Heavenly"
      );
    }, 5000); // Change text every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="relative -mt-10 bg-[url('https://img.freepik.com/free-photo/different-cookies-top-view-dark-surface-with-copy-space_176474-536.jpg?t=st=1732332592~exp=1732336192~hmac=cfac24b0e017dfc93061abf844b57bf48de0ebe500303ff0cd4e52a0eb3abb4e&w=1060')] w-screen h-auto bg-cover grid place-items-center bg-center">
      <div className="w-full h-[90vh] bg-black bg-opacity-50 text-customBrown-light p-5 text-center grid place-content-center gap-2">
        <div>
          <h1 className="text-[50px] md:text-[70px] lg:text-[80px] font-extrabold font-serif">
            Handmade{" "}
            <span className="overflow-hidden border-r-[0.15em] border-orange-500 whitespace-nowrap text-customBrown-light tracking-[0.15em]  ">
              {text}
            </span>
          </h1>
        </div>
        <div className="flex justify-center mt-10">
          <HeroCTA text="Shop Now" Icon={IoIosArrowRoundForward} />
        </div>
      </div>
    </div>
  );
}
