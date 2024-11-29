import React, { useEffect, useRef, useState } from "react";
import useCartStore from "../store/useCartLocalStorage";

export default function useCheckout() {
  const { getTotalPrice } = useCartStore();
  const [additionalDeliveryFee, setAdditionalDeliveryFee] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [addressStatus, setAddressStatus] = useState({
    message: "Address not yet confirmed",
    success: false,
    data: {},
  });

  const total = (getTotalPrice() + shippingFee + additionalDeliveryFee).toFixed(
    2
  );
  const freeShippingThreshhold = 1000;

  const deliveryOptionsRef = {
    regular: useRef(null),
    fast: useRef(null),
    express: useRef(null),
  };

  const handleAdditionalDeliveryFee = (option) => {
    if (option === "regular") {
      setAdditionalDeliveryFee(
        Number(deliveryOptionsRef.regular.current.value)
      );
    } else if (option === "fast") {
      setAdditionalDeliveryFee(Number(deliveryOptionsRef.fast.current.value));
    } else if (option === "express") {
      setAdditionalDeliveryFee(
        Number(deliveryOptionsRef.express.current.value)
      );
    }
  };

  const [formValue, setFormValue] = useState({
    fullname: "",
    mobile: "",
    region: "",
    province: "",
    cityOrMunicipality: "",
    barangay: "",
    streetAddress: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Full name validation
    if (!formValue.fullname.trim()) {
      newErrors.fullname = "Full name is required.";
    }

    // Mobile validation (example: must be numeric and 10-15 characters)
    if (!formValue.mobile.trim()) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!/^\d{10,15}$/.test(formValue.mobile)) {
      newErrors.mobile = "Invalid mobile number format.";
    }

    // Region validation
    if (!formValue.region.trim()) {
      newErrors.region = "Region is required.";
    }

    // Province validation
    if (!formValue.province.trim()) {
      newErrors.province = "Province is required.";
    }

    // City or Municipality validation
    if (!formValue.cityOrMunicipality.trim()) {
      newErrors.cityOrMunicipality = "City or Municipality is required.";
    }

    // Barangay validation
    if (!formValue.barangay.trim()) {
      newErrors.barangay = "Barangay is required.";
    }

    // Street address validation
    if (!formValue.streetAddress.trim()) {
      newErrors.streetAddress = "Street address is required.";
    }

    // Postal code validation (example: must be numeric and 4-6 characters)
    if (!formValue.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required.";
    } else if (!/^\d{4,6}$/.test(formValue.postalCode)) {
      newErrors.postalCode = "Invalid postal code format.";
    }

    setErrors(newErrors);

    // Return true if no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };


const loadAddressFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("address");
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return {};
  }
};

const addressData = loadAddressFromLocalStorage();

const saveAddressToLocalStorage = (items) => {
  try {
    localStorage.setItem("address", JSON.stringify(items));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

  const handleSubmitAddress = (values) => {
    console.log("submit success:", values);
    setAddressStatus({
      message: "Address Confirmed",
      success: true,
      data: values,
    });
    saveAddressToLocalStorage(values)
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));

    // Clear the error for the updated field
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[name];
      return updatedErrors;
    });
  };

  useEffect(() => {
    if (getTotalPrice() > freeShippingThreshhold) {
      setShippingFee(0);
    } else if (getTotalPrice() < freeShippingThreshhold) {
      setShippingFee(150);
    }
  }, [getTotalPrice()]);

  return {
    handleChange,
    total,
    handleAdditionalDeliveryFee,
    formValue,
    errors,
    validateForm,
    handleSubmitAddress,
    addressData,
    addressStatus,
    shippingFee,
    deliveryOptionsRef,
    additionalDeliveryFee,
    setPaymentMethod,
    paymentMethod,
    errors,
    setErrors,
  };
}
