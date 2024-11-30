import axios from "axios";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import OrdersByDateAndTime from "./order-section/OrdersByDateAndTime";

export default function OrdersSection() {
  const [loading, setIsLoading] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);

  useEffect(() => {
    const fetchCheckoutHistory = async () => {
      setIsLoading(true);
      try {
        const auth = getAuth(); // Initialize Firebase Auth
        const user = auth.currentUser;
        if (!user) {
          throw new Error("User not authenticated.");
        }
        const idToken = await user.getIdToken();
        const response = await axios.get(
          "http://localhost:5555/api/checkout", // Replace with your actual backend endpoint

          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        setCheckoutData(response.data.data);
      } catch (error) {
        console.error("Checkout failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCheckoutHistory();
  }, []);
  // console.log(checkoutData);
  const sortedDataToLatest =checkoutData?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <div>
      <h2 className="font-semibold text-xl mb-5 text-customBrown-darkest">
        Order History
      </h2>
      <div className="grid gap-2">
        {/* separate by each checkout group*/}
        {sortedDataToLatest?.map((data, i) => (
          <OrdersByDateAndTime key={i} data={data}/>
        ))}
      </div>
    </div>
  );
}
