import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


export default function FormikAddress({ handleSubmitAddress, addressStatus }) {
  // Define the validation schema with Yup
  const validationSchema = Yup.object({
    fullname: Yup.string().required("Full Name is required."),
    mobile: Yup.string()
      .matches(/^(09|\+639)\d{9}$/, "Invalid mobile number format.")
      .required("Mobile Number is required."),
    region: Yup.string().required("Region is required."),
    province: Yup.string().required("Province is required."),
    cityOrMunicipality: Yup.string().required(
      "City or Municipality is required."
    ),
    barangay: Yup.string().required("Barangay is required."),
    streetAddress: Yup.string().required("Street Address is required."),
    postalCode: Yup.string()
      .matches(/^\d{4,6}$/, "Postal Code must be 4 to 6 digits.")
      .required("Postal Code is required."),
  });

  // Initial values for the form fields
  const initialValues = {
    fullname: "",
    mobile: "",
    region: "",
    province: "",
    cityOrMunicipality: "",
    barangay: "",
    streetAddress: "",
    postalCode: "",
    sameBillingAddress: false,
  };

  return (
    <div className="bg-customBrown-light p-5">
      <p className="font-semibold">2. Delivery Address</p>
      <p className="text-center text-sm">All Fields Required</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmitAddress}
      >
        {() => (
          <Form className="grid gap-2">
            {/* Full Name */}
            <div className="grid">
              <label htmlFor="fullname">Full Name *</label>
              <Field
                type="text"
                name="fullname"
                placeholder="Enter Full Name"
                className="w-full bg-customBrown outline-none py-1 px-2 placeholder:text-customBrown-dark"
              />
              <ErrorMessage
                name="fullname"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Mobile */}
            <div className="grid">
              <label htmlFor="mobile">Mobile Number *</label>
              <Field
                type="tel"
                name="mobile"
                placeholder="09XXXXXXXXX"
                className="w-full bg-customBrown outline-none py-1 px-2 placeholder:text-customBrown-dark"
              />
              <ErrorMessage
                name="mobile"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Region */}
            <div className="grid">
              <label htmlFor="region">Region *</label>
              <Field
                type="text"
                name="region"
                placeholder="Enter Region"
                className="w-full bg-customBrown outline-none py-1 px-2 placeholder:text-customBrown-dark"
              />
              <ErrorMessage
                name="region"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Province */}
            <div className="grid">
              <label htmlFor="province">Province *</label>
              <Field
                type="text"
                name="province"
                placeholder="Enter Province"
                className="w-full bg-customBrown outline-none py-1 px-2 placeholder:text-customBrown-dark"
              />
              <ErrorMessage
                name="province"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Municipality or City */}
            <div className="grid">
              <label htmlFor="cityOrMunicipality">Municipality or City *</label>
              <Field
                type="text"
                name="cityOrMunicipality"
                placeholder="Enter City or Municipality"
                className="w-full bg-customBrown outline-none py-1 px-2 placeholder:text-customBrown-dark"
              />
              <ErrorMessage
                name="cityOrMunicipality"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Barangay */}
            <div className="grid">
              <label htmlFor="barangay">Barangay *</label>
              <Field
                type="text"
                name="barangay"
                placeholder="Enter Barangay"
                className="w-full bg-customBrown outline-none py-1 px-2 placeholder:text-customBrown-dark"
              />
              <ErrorMessage
                name="barangay"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Street Address */}
            <div className="grid">
              <label htmlFor="streetAddress">Street Address *</label>
              <Field
                type="text"
                name="streetAddress"
                placeholder="Enter Street Address"
                className="w-full bg-customBrown outline-none py-1 px-2 placeholder:text-customBrown-dark"
              />
              <ErrorMessage
                name="streetAddress"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Postal Code */}
            <div className="grid">
              <label htmlFor="postalCode">Postal Code *</label>
              <Field
                type="text"
                name="postalCode"
                placeholder="Enter Postal Code"
                className="w-full bg-customBrown outline-none py-1 px-2 placeholder:text-customBrown-dark"
              />
              <ErrorMessage
                name="postalCode"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Same Billing Address */}
            <div className="flex items-center space-x-2">
              <Field type="checkbox" name="sameBillingAddress" />
              <label htmlFor="sameBillingAddress">Same Billing Address</label>
            </div>

            {/* Submit Button */}
              <button
                type="submit"
                className="flex space-x-5 justify-center  items-center mt-4 bg-customBrown-darkest hover:bg-customBrown-dark text-white px-4 py-2 rounded"
              >
                Confirm Address
              </button>

          </Form>
        )}
      </Formik>
    </div>
  );
}
