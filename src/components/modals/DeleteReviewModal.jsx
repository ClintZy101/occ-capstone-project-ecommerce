import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

export default function DeleteReviewModal({
  isOpen,
  handleClose,
    data,
  handleSubmit,
}) {

console.log(data)
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Modal Content */}
          <div className="bg-white w-[500px] h-max rounded-md shadow-lg relative p-10">
            <h2 className="text-lg font-semibold mb-4 text-center text-customBrown-dark">
             Are you sure to Delete this Review?
            </h2>

            <div>
                <h2 className="text-customBrown text-lg">{data.product_name}</h2>
                <p className="text-customBrown-darkest">"{data.product_review}"</p>
             
            </div>
            
            <div className="flex space-x-5 justify-end">
            <button
              onClick={handleClose}
              className="px-5 bg-customBrown text-white py-2  mt-10 hover:bg-customBrown-dark duration-300 hover:font-bold rounded"
            >
             No
            </button>
            <button
              onClick={() => handleSubmit()}
              className="px-5 bg-customBrown text-white py-2  mt-10 hover:bg-red-500 duration-300 hover:font-bold rounded"
            >
             Yes
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

