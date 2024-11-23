import React from "react";
import { FiPhone } from "react-icons/fi";

export default function ContactUs() {
  return (
    <div>
      <div className="relative mt-12 grid">
        <div className="bg-customBrown-darkest md:w-5/6 h-[300px] mx-auto  p-5 text-white text-center ">
          <h1 className=" font-bold text-3xl">REACH OUR TEAM</h1>
          <p className="mt-5 text-lg font-extralight">
            We love questions and feedback - and we're always happy to help!{" "}
            <br /> Here are some ways to contact us.
          </p>
        </div>

        <div className="md:flex grid gap-2 justify-center mt-5 md:mt-0 mb-20 md:space-x-10">
          <div className="bg-customBrown-light w-[400px] h-[200px] p-5 text-center grid gap-2 rounded -mt-24">
            <h2 className="font-semibold">Talk to Sales</h2>
            <p className="font-thin">
              Chat with our sales team to discover how our product can work best
              for you.
            </p>
            <p className="flex items-center justify-center cursor-pointer hover:font-semibold">
              <FiPhone />
              123-456
            </p>
          </div>
          <div className="bg-customBrown-light w-[400px] h-[200px] p-5 text-center grid gap-2 rounded md:-mt-24">
            <h2 className="font-semibold">Contact Customer Support</h2>
            <p className="font-thin">
              We are waiting to help you and your team - so don't hesitate to
              reach out!
            </p>
            <button className="bg-customBrown-darkest rounded-md text-white hover:bg-customBrown-dark">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
