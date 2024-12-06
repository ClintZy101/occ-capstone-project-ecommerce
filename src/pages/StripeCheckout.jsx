import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentFormStripe from "../components/stripe-checkout/PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51IydHXGUe6psHH9kBb7xAroiUpv60q0SEFJuJ59JwM3zMPaf1IS7VLJY6lbwxFvuO9emoSUtBvsJGGe1n47tIelB00QqdZEn94"
);

function StripeCheckout() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 pb-12 pt-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Stripe Checkout
        </h1>
        <p className="w-full text-center my-2 italic">
          This is for test purposes only
        </p>

        <Elements stripe={stripePromise}>
          <PaymentFormStripe />
        </Elements>

        <p className="-mt-10">
          <strong> Here are some common Stripe test card details:</strong>
          <br /> Successful Payment (All countries):
          <br />
          <strong>Card number: </strong> 4242 4242 4242 4242
          <br />
          <strong> Expiration: </strong>Any future date (e.g., 12/34)
          <br />
          <strong>CVC:</strong> Any 3 digits (e.g., 123)
          <br />
          <strong>ZIP Code:</strong>
          Any valid format (e.g., 12345)
        </p>
      </div>
    </div>
  );
}

export default StripeCheckout;
