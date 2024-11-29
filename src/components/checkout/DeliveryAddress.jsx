import React, { useEffect, useState } from "react";


export default function DeliveryAddress({handleChange, errors, formValue,}) {
  

// console.log(formValue, errors)
  return (
    <div className="bg-customBrown-light p-5">
      <p className="font-semibold">2. Delivery Address</p>
      <p className="text-center text-sm">All Fields Required</p>
      <div
      // onSubmit={handleSubmit}
      className="grid gap-2">
        {/* Full Name */}
        <div className="grid">
          <label htmlFor="fullname" className={`${errors.fullname ? ' text-red-500': ''}`}>Full Name *</label>
          <input
            type="text"
            name="fullname"
            value={formValue.fullname}
            onChange={handleChange}
            placeholder={`${errors.fullname? 'Please enter Fullname':'Enter Full Name'}`}
            className={`w-full bg-customBrown outline-none py-1 px-2 placeholder:text-customBrown-dark`}
          />
        </div>

        {/* Mobile */}
        <div className="grid">
          <label htmlFor="mobile">Mobile Number *</label>
          <input
            type="tel"
            name="mobile"
            value={formValue.mobile}
            onChange={handleChange}
            placeholder="09XXXXXXXXX"
            pattern="^(09|\\+639)\\d{9}$"
            maxLength={11}
            className="w-full bg-customBrown outline-none py-1 px-2 placeholder:text-customBrown-dark"
          />
        </div>

        {/* Region */}
        <div className="grid">
          <label htmlFor="region">Region *</label>
          <input
            type="text"
            name="region"
            value={formValue.region}
            onChange={handleChange}
            placeholder="Enter Region"
            className="w-full bg-customBrown outline-none py-1 px-2 placeholder:text-customBrown-dark"
          />
        </div>

        {/* Province */}
          <div className="grid">
            <label htmlFor="province">Province *</label>
            <input
            type="text"
            name="province"
            value={formValue.province}
            onChange={handleChange}
            placeholder="Enter province"
            className="w-full bg-customBrown outline-none py-1 px-2 placeholder:text-customBrown-dark"
          />
          </div>

        {/* Municipality or City */}
     
        <div className="grid">
          <label htmlFor="municipality">Municipality or City *</label>
          <input
            type="text"
            name="cityOrMunicipality"
            value={formValue.cityOrMunicipality}
            onChange={handleChange}
            placeholder="Enter City or Municipality"
            className="w-full bg-customBrown outline-none py-1 px-2 placeholder:text-customBrown-dark"
          />
        </div>

        {/* Barangay */}
        <div className="grid">
          <label htmlFor="barangay">Barangay *</label>
          <input
            type="text"
            name="barangay"
            value={formValue.barangay}
            onChange={handleChange}
            placeholder="Enter Barangay"
            className="w-full bg-customBrown outline-none py-1 px-2 placeholder:text-customBrown-dark"
          />
        </div>
        {/* Street Address */}
        <div className="grid">
          <label htmlFor="streetAddress">Street Address *</label>
          <input
            type="text"
            name="streetAddress"
            value={formValue.streetAddress}
            onChange={handleChange}
            placeholder="Enter Street Address"
            className="w-full bg-customBrown outline-none py-1 px-2 placeholder:text-customBrown-dark"
          />
        </div>
        {/* Postal Code */}
        <div className="grid">
          <label htmlFor="postalCode">Postal Code *</label>
          <input
            type="number"
            name="postalCode"
            value={formValue.postalCode}
            onChange={handleChange}
            placeholder="Enter Postal Code"
            className="w-full bg-customBrown outline-none py-1 px-2 placeholder:text-customBrown-dark"
          />
        </div>

        <div className="flex items-center space-x-2">
            <input type="checkbox" />
            <p>Same Billing Address</p>
        </div>

        {/* Error Display */}
        {/* {errors && <p className="text-red-500 text-sm">{errors}</p>} */}

        {/* Loading Spinner */}
        {/* {loading && <p>Loading...</p>} */}
        {/* <button type="submit">submit</button> */}
      </div>
    </div>
  );
}
