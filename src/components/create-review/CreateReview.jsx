import React, { useState, useEffect } from "react";
import { auth } from "../../../firebase";
import axios from "axios";


const createReview = async (reviewData) => {
  const user = auth.currentUser;
  if (!user) {
    alert("You must be logged in to submit a review.");
    return;
  }

  // Get Firebase ID token
  const token = await user.getIdToken();

  try {
    const response = await axios.post(
      "http://localhost:4000/api/reviews",
      reviewData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in request
        },
      }
    );
    console.log("Review created:", response.data);
  } catch (error) {
    console.error("Error creating review:", error);
  }
};



const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    product_id: "",
    product_name: "",
    email: "",
    review: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all reviews
  const fetchReviews = async () => {
    try {
      const response = await axios.get("/api/reviews");
      setReviews(response.data.data);
    } catch (error) {
      console.error("Error fetching reviews:", error.message);
      setError("Failed to load reviews.");
    }
  };

  // Submit a new review
  const handleCreateReview = async () => {
    try {
      const response = await axios.post("/api/reviews", newReview);
      setSuccess("Review added successfully!");
      setError("");
      setNewReview({ product_id: "", product_name: "", email: "", review: "" });
      fetchReviews(); // Refresh the reviews list
    } catch (error) {
      console.error("Error creating review:", error.message);
      setError("Failed to add review.");
      setSuccess("");
    }
  };

  // Delete a review
  const handleDeleteReview = async (id) => {
    try {
      await axios.delete(`/api/reviews/${id}`);
      setSuccess("Review deleted successfully!");
      setError("");
      fetchReviews(); // Refresh the reviews list
    } catch (error) {
      console.error("Error deleting review:", error.message);
      setError("Failed to delete review.");
      setSuccess("");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Reviews</h2>

      {/* Add Review Form */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Add a Review</h3>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <input
          type="text"
          placeholder="Product ID"
          value={newReview.product_id}
          onChange={(e) => setNewReview({ ...newReview, product_id: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Product Name"
          value={newReview.product_name}
          onChange={(e) => setNewReview({ ...newReview, product_name: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={newReview.email}
          onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          placeholder="Review"
          value={newReview.review}
          onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <button onClick={handleCreateReview} className="bg-blue-500 text-white p-2">
          Submit Review
        </button>
      </div>

      {/* Reviews List */}
      <div>
        <h3 className="text-lg font-semibold">All Reviews</h3>
        {reviews.map((review) => (
          <div key={review._id} className="border p-2 mb-2">
            <h4 className="font-bold">{review.product_name}</h4>
            <p>{review.review}</p>
            <p className="text-sm text-gray-500">By: {review.email}</p>
            <button
              onClick={() => handleDeleteReview(review._id)}
              className="bg-red-500 text-white p-1 mt-2"
            >
              Delete Review
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;

