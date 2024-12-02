import axios from "axios";
import React, { useEffect, useState } from "react";
import OrdersByDateAndTime from "./order-section/OrdersByDateAndTime";
import ReviewModal from "../modals/ReviewModal";
import useReview from "../../utils/useReview";

export default function OrdersSection() {
  const [loading, setIsLoading] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);
  const {
    isLoading,
    reviewData,
    productForReview,
    user,
    reviewModalIsOpen,
    setReviewModalIsOpen,
    setReviewData,
    handleProductForReview,
    handleSubmitReview,
  } = useReview();

  useEffect(() => {
    const fetchCheckoutHistory = async () => {
      setIsLoading(true);
      try {
        if (!user) {
          throw new Error("User not authenticated.");
        }
        const idToken = await user.getIdToken(); // Get the ID token from the authenticated user
        const response = await axios.get(
          "http://localhost:5555/api/checkout", // Replace with your actual backend endpoint
          {
            headers: {
              Authorization: `Bearer ${idToken}`, // Include the ID token in the Authorization header
            },
          }
        );
        setCheckoutData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch checkout history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchCheckoutHistory();
    }
  }, [user]); // Trigger data fetch whenever `user` changes

  const sortedDataToLatest = checkoutData?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );


  return (
    <div>
      <ReviewModal
        isOpen={reviewModalIsOpen}
        handleClose={() => setReviewModalIsOpen(false)}
        productForReview={productForReview}
        handleSubmit={handleSubmitReview}
      />
      <h2 className="font-semibold text-xl mb-5 text-customBrown-darkest">
        Order History
      </h2>
      {loading ? (
        <p>Loading...</p> // Display loading state
      ) : sortedDataToLatest?.length > 0 ? (
        <div className="grid gap-2">
          {sortedDataToLatest.map((data, i) => (
            <OrdersByDateAndTime
              key={i}
              data={data}
              handleProductForReview={handleProductForReview}
            />
          ))}
        </div>
      ) : (
        <p>No orders found.</p> // Handle empty state
      )}
    </div>
  );
}
