import React, { useEffect, useRef, useState } from "react";
import useCartStore from "../store/useCartLocalStorage";
import axios from "axios";
import { API_URL } from "../api/api-url";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function useCheckout() {
  const [user, setUser] = useState(null);
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
  const [errorInHadleCheckout, setErrorInHanldeCheckout] = useState({
    success: null,
    message: "",
  });
  const [checkoutSummary, setCheckoutSummary] = useState({});
  const [checkoutData, setCheckoutData] = useState(null);
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

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const auth = getAuth(); // Initialize Firebase Auth
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not authenticated.");
      }

      const idToken = await user.getIdToken(); // Get Firebase auth token

      if (addressStatus.success === true && paymentMethod) {
        await axios.post(
          `${API_URL}/api/checkout` || "http://localhost:5555/api/checkout", // Replace with your actual backend endpoint
          {
            user_email: user.email,
            items: cartItems.map((item) => ({
              item_id: item.id,
              item_name: item.name,
              quantity: item.quantity,
              price: item.price,
              image: item.img_src,
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
        setCheckoutSummary({
          cartItems,
          total,
          shippingFee,
          addressStatus,
          paymentMethod,
          success: {
            status: true,
            message:
              "Here is your summary... Click Confirm! to proceed to Checkout. ",
          },
        });

        fetchCheckoutHistory();
      } else if (addressStatus.success === false || paymentMethod === "") {
        setErrorInHanldeCheckout({
          success: false,
          message:
            "Please make sure to Confirm Address and choose a Payment Method.",
        });
      }

      console.log("cartItems: ", cartItems);
      console.log("checkout error", errorInHadleCheckout);
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCheckoutHistory = async () => {
    setIsLoading(true);
    try {
      if (!user) {
        throw new Error("User not authenticated.");
      }
      const idToken = await user.getIdToken();
      const response = await axios.get(
        `${API_URL}/api/checkout`, // Replace with your actual backend endpoint
        {
          headers: {
            Authorization: `Bearer ${idToken}`, // Include the ID token in the Authorization header
          },
        }
      );
      setCheckoutData(response.data.data);
      console.log("checkout success");
    } catch (error) {
      console.error("Failed to fetch checkout history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the authenticated user
      } else {
        setUser(null); // Clear the user state if not authenticated
      }
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  useEffect(() => {
    if (user) {
      fetchCheckoutHistory();
    }
  }, [user]);

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
    errorInHadleCheckout,
    isLoading,
    setIsLoading,
    checkoutData,
  };
}
