import React from "react";
import { FaCheck } from "react-icons/fa6";

export default function ConfirmedAddress({ addressData, handleChangeAddress }) {
  const AddressDiv = ({ title, data }) => {
    return (
      <div>
        <p className="font-semibold">{title}:</p>
        <p className="font-thin">{data}</p>
      </div>
    );
  };

  console.log("localStorage", addressData);
  return (
    <div className="bg-customBrown-light p-5">
      <AddressDiv title={"Name"} data={addressData.fullname} />
      <AddressDiv title={"Mobile"} data={addressData.mobile} />
      <AddressDiv title={"Region"} data={addressData.region} />
      <AddressDiv title={"Province"} data={addressData.province} />
      <AddressDiv
        title={"City/Municipality"}
        data={addressData.cityOrMunicipality}
      />
      <AddressDiv title={"Barangay"} data={addressData.barangay} />
      <AddressDiv title={"Street Address"} data={addressData.streetAddress} />
      <AddressDiv title={"Postal Code"} data={addressData.postalCode} />
      <AddressDiv
        title={"Billing Address"}
        data={addressData.sameBillingAddress ? "Same Address" : ""}
      />
      <div className="mt-5 border-t border-t-customBrown flex space-x-10 items-center py-2 justify-center font-bold">
        <p>Address Confirmed</p> <FaCheck className="text-xl" />
      </div>
      <div className="justify-center flex">
        <button 
        onClick={handleChangeAddress}
        className="flex space-x-5 justify-center  items-center mt-4 bg-customBrown-darkest hover:bg-customBrown-dark text-white px-4 py-2 rounded">
          Change Address
        </button>
      </div>
    </div>
  );
}
