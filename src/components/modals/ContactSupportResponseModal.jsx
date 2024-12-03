import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

export default function ContactSupportResponseModal({
  isOpen,
  handleClose,
  response,
  handleSubmit,
}) {
    
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Modal Content */}
          <div className="bg-white w-[500px] h-max rounded-md shadow-lg relative p-10">
            <h2 className="text-lg font-semibold mb-4 text-center text-customBrown">
            Status
            </h2>

            <div>
              <h2 className="text-customBrown-dark text-xl">{response}</h2>
            </div>


        <div className="w-full flex justify-center">
        <button
                onClick={() => handleSubmit()}
                className="px-5 w-5/6  bg-customBrown hover:bg-customBrown-dark text-white py-2  mt-10  duration-300 hover:font-bold rounded"
              >
                Confirm
              </button>
        </div>
              


            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full p-2"
            >
              <IoCloseOutline className="text-2xl" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
