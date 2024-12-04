import React from "react";
import { Tilt } from "react-tilt";

const CookieSection = () => {
  return (
    <section className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-16">
      <div className="text-center px-6">
        <h2 className="text-4xl lg:text-5xl font-bold text-customBrown mb-6">Perfected Cookies</h2>
        <p className="text-lg lg:text-xl text-customBrown-dark mb-12">
          Treat your taste buds to the heavenly experience of our handcrafted cookies.
        </p>
      </div>
      <div className="flex items-center justify-center w-screen md:w-2/3 lg:w-1/2">
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
