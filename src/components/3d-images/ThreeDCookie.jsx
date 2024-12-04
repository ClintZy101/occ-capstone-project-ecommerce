import React, { useState, useEffect, useRef } from "react";
import { Tilt } from "react-tilt";

const CookieSection = () => {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true); // Trigger animation when the element is in view
        } else {
          setAnimate(false); // Optional: reset when out of view (if desired)
        }
      },
      { threshold: 0.5 } // 50% of the element must be in the viewport
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-16"
    >
      {/* Text Section */}
      <div
        className={`text-center px-6 ${
          animate ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        <h2
          className={`text-4xl lg:text-5xl font-bold text-customBrown mb-6 ${
            animate ? "animate-fade-in-delay" : "opacity-0"
          }`}
        >
          Perfected Cookies
        </h2>
        <p
          className={`text-lg lg:text-xl text-customBrown-dark mb-12 ${
            animate ? "animate-fade-in-delay-2" : "opacity-0"
          }`}
        >
          Treat your taste buds to the heavenly experience of our handcrafted
          cookies.
        </p>
      </div>

      {/* Image Section */}
      <div
        className={`flex items-center justify-center w-screen md:w-2/3 lg:w-1/2 ${
          animate ? "animate-scale-up" : "opacity-0"
        }`}
      >
        <Tilt
          options={{ max: 25, speed: 10 }}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1607975218250-7faaf3e36bbf?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Cookie"
            className="w-full h-full object-cover"
          />
        </Tilt>
      </div>
    </section>
  );
};

export default CookieSection;
