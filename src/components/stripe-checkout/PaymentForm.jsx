import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import useCartStore from "../../store/useCartLocalStorage";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../api/api-url";


const PaymentFormStripe = () => {
  const [amountTotal, setAmountTotal] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    const total = localStorage.getItem("total");
    const num = parseFloat(total); // Convert the stored string to a number
    setAmountTotal(!isNaN(num) ? num : 0);
    console.log('total from localstorage', total)
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const amountInCents = Math.floor(amountTotal * 100); // Convert to cents

      const response = await axios.post(
        `${API_URL}/api/stripe/create-payment-intent`,
        {
          amount: amountInCents,
          currency: "usd",
        }
      );

      const { clientSecret } = response.data;
      const cardElement = elements.getElement(CardElement);

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (paymentResult.error) {
        alert(`Payment failed: ${paymentResult.error.message}`);
      } else {
        alert("Payment successful!");
        navigate("/");
        clearCart();
        cardElement.clear();
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200 mb-20">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Payment Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Amount (PHP)
          </label>
          <p className="text-xl">Php{amountTotal.toFixed(2)}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2 border-b">
            Card Details
          </label>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#333",
                  backgroundColor:'#f1f5f9',
                  padding: "10px",
                  margin:"25px"
                },
              },
            }}
          />
        </div>
        <button
          type="submit"
          disabled={isProcessing || !stripe || amountTotal <= 0}
          className="w-full py-3 bg-customBrown text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        >
          {isProcessing ? "Processing..." : `Pay Php${amountTotal.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
};

export default PaymentFormStripe;
