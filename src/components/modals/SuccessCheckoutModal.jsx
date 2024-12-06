import React, { useEffect, useState } from "react";
import { FaPesoSign } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../../store/useAuthStore";


export default function SuccessCheckoutModal({ checkoutSummary }) {
  const [isOpen, setIsOpen] = useState(false);
 
  useEffect(() => {
    if (checkoutSummary?.success?.status) {
      setIsOpen(true);
    }
  }, [checkoutSummary]);

  const navigate = useNavigate();

  const handleClose = () => {
    let total = Number(checkoutSummary.total)
    localStorage.setItem("total", total);
    setIsOpen(false);
    navigate(`/stripe-checkout`)
  };

  function getDetailedAddress(address) {
    if (!address) {
      return "Address not available.";
    }

    const {
      streetAddress,
      barangay,
      cityOrMunicipality,
      province,
      region,
      postalCode,
    } = address;

    // Concatenate the fields into a detailed address string
    return [
      streetAddress,
      barangay,
      cityOrMunicipality,
      province,
      region,
      postalCode,
    ]
      .filter((field) => field && field.trim() !== "") // Remove empty or undefined fields
      .join(", "); // Join fields with commas
  }

  const detailedAddress = getDetailedAddress(
    checkoutSummary?.addressStatus?.data
  );

  console.log(checkoutSummary)
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Modal Content */}
          <div className="bg-white w-[500px] min-h-[300px] rounded-md shadow-lg relative p-10">
            <h2 className="text-lg font-semibold mb-4 text-center">
              {checkoutSummary.success.message}
            </h2>

            <div className="text-sm space-y-3">
              <p className="flex items-center space-x-2 text-xl">
                <strong>Total Amount:</strong> <FaPesoSign />
                {checkoutSummary.total}
              </p>
              {/* <p className="flex items-center space-x-2">
                <strong>Shipping Fee:</strong>   <FaPesoSign />{checkoutSummary.shippingFee || 0}
              </p> */}
              <p>
                <strong>Payment Method:</strong>{" "}
                {checkoutSummary.paymentMethod || "Select Payment Method."}
              </p>
              <p>
                <strong>Delivery Address:</strong>{" "}
                {detailedAddress.toLocaleUpperCase() || "Confirm Address."}
              </p>

              <div className="w-full flex justify-center">
                {!checkoutSummary.paymentMethod || !detailedAddress ? (
                  <p className=" text-red-500">
                    "Please Provide Necessary Fields to proceed..."{" "}
                  </p>
                ) : (
                  <button
                    onClick={handleClose}
                    type="submit"
                    className="flex  space-x-5 justify-center  items-center mt-4 bg-customBrown-darkest hover:bg-customBrown-dark text-white px-10 py-2 rounded"
                  >
                    Confirm!
                  </button>
                )}
              </div>
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
