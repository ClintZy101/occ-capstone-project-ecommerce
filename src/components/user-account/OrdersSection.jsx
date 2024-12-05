import axios from "axios";
import React, { useEffect, useState } from "react";
import OrdersByDateAndTime from "./order-section/OrdersByDateAndTime";
import ReviewModal from "../modals/ReviewModal";
import useReview from "../../utils/useReview";
import { API_URL } from "../../api/api-url";
import useCheckout from "../../utils/useCheckout";
import Loader from "../../components/loader/Loader";
import { useAuthStore } from "../../store/useAuthStore";

export default function OrdersSection() {
  const {user, token} = useAuthStore()
  const {
    productForReview,
    reviewModalIsOpen,
    setReviewModalIsOpen,
    handleProductForReview,
    handleSubmitReview,
  } = useReview();

  const { checkoutData, isLoading } = useCheckout();

  const sortedDataToLatest = checkoutData?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // console.log("checkoutData", checkoutData);
  // console.log('user and token', user, token)
  return (
    <div>
      <ReviewModal
        isOpen={reviewModalIsOpen}
        handleClose={() => setReviewModalIsOpen(false)}
        productForReview={productForReview}
        handleSubmit={handleSubmitReview}
      />
      <Loader isLoading={isLoading} />

      <h2 className="font-semibold text-xl mb-5 text-customBrown-darkest">
        Order History
      </h2>
      {sortedDataToLatest?.length > 0 ? (
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
        <>
          <p>No orders found.</p>
          {!user && <p>Login to see Order History</p>}
        </> 
      )}
    </div>
  );
}
