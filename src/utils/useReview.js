import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { API_URL, LOCALHOST } from "../api/api-url";

export default function useReview() {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [reviewData, setReviewData] = useState({});
  const [productForReview, setProductForReview] = useState({});
  const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [fetchedReviewsData, setFetchedReviewsData] = useState([]);
  const [editReviewModalIsOpen, setEditReviewModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)


  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      if (!user) {
        throw new Error("User not authenticated.");
      }
      const idToken = await user.getIdToken(); // Get the ID token from the authenticated user
      const response = await axios.get(
        `${API_URL}/api/reviews`, // Replace with your actual backend endpoint
        {
          headers: {
            Authorization: `Bearer ${idToken}`, // Include the ID token in the Authorization header
          },
        }
      );
      setFetchedReviewsData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch checkout history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditReviewModal = (data) => {
    setReviewData(data);
    setEditReviewModalIsOpen((prevState) => !prevState);
  };

  const handleDeleteReviewModal = (data) =>{
    setReviewData(data);
    setDeleteModalIsOpen((prevState) => !prevState);
  }

  const handleProductForReview = (name, id) => {
    setProductForReview({
      product_id: id,
      product_name: name,
    });
    setReviewModalIsOpen((prevState) => !prevState);
  };

  const handleDeleteReview = async() =>{

    const auth = getAuth(); 
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not authenticated.");
    }

    const idToken = await user.getIdToken();

    await axios.delete(
      `${API_URL}/api/reviews/${reviewData._id}`, 
      // `${LOCALHOST}/api/reviews/${reviewData._id}`, 
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    fetchReviews();
    setDeleteModalIsOpen(false)
  }

  const handleUpdateReview = async (idToken, review ) => {

    await axios.put(
      `${API_URL}/api/reviews/${reviewData._id}`, // Replace with your actual backend endpoint
      {
        product_id: reviewData.product_id,
        product_name: reviewData.product_name,
        user_email: reviewData.user_email,
        product_review: review,
        // product_rating: reviewData.rating,
      },
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    fetchReviews();
    setEditReviewModalIsOpen(false);
  };

  const handleCreateReview = async (idToken, review, rating,) => {

    await axios.post(
      `${API_URL}/api/reviews`, // Replace with your actual backend endpoint
      {
        product_id: productForReview.product_id,
        product_name: productForReview.product_name,
        user_email: user.email,
        product_review: review,
        product_rating: rating,
      },
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    console.log("review submitted as create review", API_URL);
    setReviewModalIsOpen((prevState) => !prevState);
    fetchReviews();
  };

  const handleSubmitReview = async (review, rating) => {
    setIsLoading(true);
 
    try {
      const auth = getAuth(); // Initialize Firebase Auth
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not authenticated.");
      }

      const idToken = await user.getIdToken(); // Get Firebase auth token

      if (editReviewModalIsOpen) {
        handleUpdateReview(idToken, review);
      } else {
        handleCreateReview(idToken, review, rating);
      }

      alert("Review Submitted!");
    
    } catch (error) {
      console.error("Create Review failed:", error);
      alert("Create Review failed. Please try again.");
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
      fetchReviews();
    }
  }, [user]);

  return {
    isLoading,
    reviewData,
    productForReview,
    user,
    reviewModalIsOpen,
    setReviewModalIsOpen,
    setReviewData,
    handleProductForReview,
    handleSubmitReview,
    fetchedReviewsData,
    handleUpdateReview,
    handleEditReviewModal,
    editReviewModalIsOpen,
    setEditReviewModalIsOpen,
    deleteModalIsOpen,
    handleDeleteReview,
    handleDeleteReviewModal,
    setDeleteModalIsOpen
  };
}
