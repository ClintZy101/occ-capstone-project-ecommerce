import React, { useState } from "react";

import { useAuthStore } from "../../store/useAuthStore";
import { CiCamera } from "react-icons/ci";

const Button = ({ title }) => {
  return (
    <button className="bg-customBrown text-white px-5 py-2 rounded hover:bg-customBrown-dark">
      {title}
    </button>
  );
};

export default function AccountSection() {
  const { user } = useAuthStore();

  const [accountDetails, setAccountDetails] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    currentPassword: "",
    newPassWord: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails((prev) => ({ ...prev, [name]: value }));
  };

  console.log(accountDetails)

  return (
    <div>
      <div className="bg-gray-100  text-customBrown-darkest">
        <h1 className="font-semibold text-xl mb-5 text-customBrown-darkest">Account</h1>
        <div className="grid gap-5 lg:flex lg:justify-around lg:mx-20">
          {/* Profile Image */}
          <div className="flex space-x-10 items-center">
            <div className="w-20 h-20 rounded-full bg-gray-200 grid place-items-center cursor-pointer" >
            <CiCamera className="text-2xl"/>
            </div>
            <div>
              <h2>Profile</h2>
              <p>PNG, JPEG, under 15mb</p>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex space-x-10 items-center  ">
            <Button title={"Upload Image"} />
            <Button title={"Delete Image"} />
          </div>
        </div>
        {/* Account Details */}
        <div className="grid lg:justify-center mt-5">
          <h1 className="my-5">Full Name</h1>
          <form className="">
            <div className=" grid gap-5 lg:flex lg:space-x-20 pb-5 border-b border-b-slate-200">
              <div className="grid min-w-[300px]">
                <label htmlFor="firstName" className="text-xs">
                  First Name
                </label>
                <input
                  value={accountDetails.firstName}
                  onChange={handleChange}
                  name="firstName"
                  type="text"
                   className="bg-gray-200 py-1 outline-none px-2 focus:ring-1 ring-customBrown-light rounded"
                />
              </div>
              <div className="grid min-w-[300px]">
                <label htmlFor="firstName" className="text-xs">
                  Last Name
                </label>
                <input
                  value={accountDetails.lastName}
                  onChange={handleChange}
                  name="lastName"
                  type="text"
                   className="bg-gray-200 py-1 outline-none px-2 focus:ring-1 ring-customBrown-light rounded"
                />
              </div>
            </div>
            {/* Contact Email */}
            <div className="pb-5 border-b border-b-slate-200">
              <h1 className="my-5">Contact Email</h1>
              <div className="grid lg:w-[300px]">
                <label htmlFor="email" className="text-xs">
                  Email
                </label>
                <input
                disabled
                  value={accountDetails.email}
                  onChange={handleChange}
                  name="email"
                  type="text"
                    className="bg-gray-200 py-1 outline-none px-2 focus:ring-1 ring-customBrown-light rounded cursor-not-allowed"
                />
              </div>
            </div>
            <div className=" pb-5 border-b border-b-slate-200">
              <h1 className="my-5">Password</h1>
              <div className="lg:flex lg:space-x-20 grid gap-5">
                <div className="grid lg:w-[300px]">
                  <label htmlFor="currentPassword" className="text-xs">
                    Current Password
                  </label>
                  <input
                    value={accountDetails.currentPassword}
                    onChange={handleChange}
                    name="currentPassword"
                    type="text"
                    className="bg-gray-200 py-1 outline-none px-2 focus:ring-1 ring-customBrown-light rounded"
                  />
                </div>
                <div className="grid lg:w-[300px]">
                  <label htmlFor="newPassword" className="text-xs">
                    New Password
                  </label>
                  <input
                    value={accountDetails.newPassWord}
                    onChange={handleChange}
                    name="newPassword"
                    type="text"
                     className="bg-gray-200 py-1 outline-none px-2 focus:ring-1 ring-customBrown-light rounded"
                  />
                </div>
              </div>
            </div>
            {/* Handle Submit */}
            <div className="my-5 text-center">
                <button type="submit" className="py-2 px-5 bg-customBrown text-white rounded hover:bg-customBrown-light hover:text-customBrown-darkest duration-300">Submit Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
