import React from "react";
import useReview from "../../utils/useReview";
import EditReviewModal from "../modals/EditReviewModal";
import DeleteReviewModal from "../modals/DeleteReviewModal";
import Loader from "../loader/Loader";
import { useAuthStore } from "../../store/useAuthStore";

export default function ReviewsSection() {
  const {user} = useAuthStore();
  const {
    handleEditReviewModal,
    handleSubmitReview,
    editReviewModalIsOpen,
    setEditReviewModalIsOpen,
    reviewData,
    fetchedReviewsData,
    deleteModalIsOpen,
    handleDeleteReview,
    handleDeleteReviewModal,
    setDeleteModalIsOpen,
    isLoading,
  } = useReview();

  // console.log(fetchedReviewsData);
  // console.log(reviewData)
  console.log(user)

  const sortedDataToLatest = fetchedReviewsData?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div>
      <h2 className="font-semibold text-xl mb-5 text-customBrown-darkest">
        My Reviews
      </h2>
      <EditReviewModal
        isOpen={editReviewModalIsOpen}
        handleClose={() => setEditReviewModalIsOpen((prevState) => !prevState)}
        data={reviewData}
        handleSubmit={handleSubmitReview}
      />
      <DeleteReviewModal
        isOpen={deleteModalIsOpen}
        handleClose={() => setDeleteModalIsOpen((prevState) => !prevState)}
        data={reviewData}
        handleSubmit={handleDeleteReview}
      />
      <Loader isLoading={isLoading} />
      
      {sortedDataToLatest.length > 0 ? (
        <div className="grid gap-5">
          {sortedDataToLatest?.map((item, i) => {
            const date = new Date(item.createdAt);

            return (
              <div key={i} className="border w-full p-5 bg-gray-200">
                <div className="flex items-center justify-between ">
                  <h2 className="font-semibold text-customBrown text-xl">
                    {item.product_name}
                  </h2>
                  <p className="text-xs font-thin">{date.toLocaleString()}</p>
                </div>
                <p className="text-customBrown-darkest text-lg">
                  "{item.product_review}"
                </p>

                {/* buttons for update and delete  */}
                <div className="md:flex md:space-x-5 space-x-2 justify-self-end font-thin mt-5">
                  <button
                    onClick={() => handleEditReviewModal(item)}
                    className="bg-customBrown hover:bg-customBrown-dark text-white px-5 py-1"
                  >
                    Update Review
                  </button>

                  <button
                    onClick={() => handleDeleteReviewModal(item)}
                    className="bg-customBrown-darkest hover:bg-customBrown-dark text-white px-5 py-1"
                  >
                    Delete Review
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <p>No orders found.</p>
          {user === null && <p>Login to see Order History</p>}
        </>
      )}
    </div>
  );
}
