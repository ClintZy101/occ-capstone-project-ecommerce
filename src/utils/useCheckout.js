import React, { useEffect, useRef, useState } from "react";
import useCartStore from "../store/useCartLocalStorage";
import axios from "axios";
import { getAuth } from "firebase/auth";

export default function useCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const { getTotalPrice, cartItems } = useCartStore();
  const [additionalDeliveryFee, setAdditionalDeliveryFee] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [addressStatus, setAddressStatus] = useState({
    message: "Address not yet confirmed",
    success: false,
    data: {},
  });

  const [checkoutSummary, setCheckoutSummary] = useState({});

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
    saveAddressToLocalStorage(values);
    setAddressStatus({
      message: "Address Confirmed",
      success: true,
      data: addressData,
    });
  };

  const handleChangeAddress = () => {
    setAddressStatus({
      message: "Change Address",
      success: false,
      data: addressData,
    });
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



  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const auth = getAuth(); // Initialize Firebase Auth
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not authenticated.");
      }

      const idToken = await user.getIdToken(); // Get Firebase auth token


      await axios.post(
        "http://localhost:5555/api/checkout", // Replace with your actual backend endpoint
        {
          user_email: user.email,
          items: cartItems.map((item) => ({
            item_id: item.id,
            item_name: item.name,
            quantity: item.quantity,
            price: item.price,
            image:item.img_src,
          })),
          total,
          shippingFee,
          addressStatus,
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      console.log('cartItems: ', cartItems)

      // setCheckoutSummary({
      //   ...response.data,
      //   success: { status: true, message: "Here is your checkout summary!" },
      // });

      setCheckoutSummary({
        cartItems,
        total,
        shippingFee,
        addressStatus,
        paymentMethod,
        success: { status: true, message: "Here is your checkout summary: " },
      });

      alert("Checkout successful!");
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (getTotalPrice() > freeShippingThreshhold) {
      setShippingFee(0);
    } else if (getTotalPrice() < freeShippingThreshhold) {
      setShippingFee(150);
    }
  }, [getTotalPrice()]);

  return {
    handleCheckout,
    checkoutSummary,
    handleChange,
    total,
    handleAdditionalDeliveryFee,
    formValue,
    errors,
    validateForm,
    handleSubmitAddress,
    handleChangeAddress,
    addressData,
    addressStatus,
    shippingFee,
    deliveryOptionsRef,
    additionalDeliveryFee,
    setPaymentMethod,
    paymentMethod,
    errors,
    setErrors,
    saveAddressToLocalStorage,
  };
}
