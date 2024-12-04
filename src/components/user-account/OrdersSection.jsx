import axios from "axios";
import React, { useEffect, useState } from "react";
import OrdersByDateAndTime from "./order-section/OrdersByDateAndTime";
import ReviewModal from "../modals/ReviewModal";
import useReview from "../../utils/useReview";
import { API_URL } from "../../api/api-url";
import useCheckout from '../../utils/useCheckout'
import Loader from '../../components/loader/Loader'

export default function OrdersSection() {

  const {
    productForReview,
    user,
    reviewModalIsOpen,
    setReviewModalIsOpen,
    handleProductForReview,
    handleSubmitReview,
  } = useReview();

  const {checkoutData, isLoading} = useCheckout()

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
      {isLoading && <Loader />}
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
        <p>No orders found. Login to see your Order History.</p> // Handle empty state
      )}
    </div>
  );
}
