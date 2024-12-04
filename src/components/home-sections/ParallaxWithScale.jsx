import React, { useEffect, useState } from "react";

export default function ParallaxWithScale() {
  const [scale, setScale] = useState(1); // Initial scale value

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY; // Get vertical scroll position
      const scaleValue = 1 + scrollTop * 0.0005; // Adjust scale incrementally
      setScale(scaleValue); // Update scale state
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="overflow-hidden ">
      {/* Parallax Container */}
      <div
        className="relative h-[500px] bg-fixed bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          transform: `scale(${scale})`, // Apply scale based on scroll
        }}
      >
        {/* Optional Overlay and Text */}
        <div className="h-full flex items-center justify-center bg-black bg-opacity-50 p-5">
            <h2></h2>
          {/* <p className="text-white text-xs p-5 md:max-w-[700px] italic font-serif tracking-widest">
            "Indulge in the irresistible charm of freshly baked cookies, where
            every bite is a journey into warm, buttery perfection. Let the
            sweetness of these treats brighten your day, one delicious moment at
            a time."
          </p> */}
        </div>
      </div>
    </div>
  );
}
