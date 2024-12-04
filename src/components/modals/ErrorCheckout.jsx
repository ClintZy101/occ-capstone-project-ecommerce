import React, { useEffect, useState } from "react";
import { FaPesoSign } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";



export default function ErrorCheckoutModal({ errorInCheckout }) {
  const [isOpen, setIsOpen] = useState(false);
 
  useEffect(() => {
   if(errorInCheckout?.success === false){
    setIsOpen(true)
   }
  }, [errorInCheckout]);


  const handleClose = () => {
    setIsOpen(false);
  };



  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Modal Content */}
          <div className="bg-white flex items-center justify-center w-[500px] min-h-[200px] rounded-md shadow-lg relative p-10">
            <h2 className="text-lg font-semibold mb-4 text-center text-red-500">
              {errorInCheckout.message}
            </h2>

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
