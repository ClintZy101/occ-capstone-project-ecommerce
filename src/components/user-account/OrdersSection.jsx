// import axios from "axios";
// import { getAuth } from "firebase/auth";
// import React, { useEffect, useState } from "react";
// import OrdersByDateAndTime from "./order-section/OrdersByDateAndTime";

// export default function OrdersSection() {
//   const [loading, setIsLoading] = useState(false);
//   const [checkoutData, setCheckoutData] = useState(null);

//   useEffect(() => {
   
//     const fetchCheckoutHistory = async () => {
//       setIsLoading(true);
//       try {
//         const auth = getAuth(); // Initialize Firebase Auth
//         const user = auth.currentUser;
//         if (!user) {
//           throw new Error("User not authenticated.");
//         }
//         const idToken = await user.getIdToken();
//         const response = await axios.get(
//           "http://localhost:5555/api/checkout", // Replace with your actual backend endpoint

//           {
//             headers: {
//               Authorization: `Bearer ${idToken}`,
//             },
//           }
//         );
//         setCheckoutData(response.data.data);
//       } catch (error) {
//         console.error("Checkout failed:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     if(user){
//       fetchCheckoutHistory();
//     }
    
//   }, []);
//   // console.log(checkoutData);
//   const sortedDataToLatest =checkoutData?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

//   return (
//     <div>
//       <h2 className="font-semibold text-xl mb-5 text-customBrown-darkest">
//         Order History
//       </h2>
//       <div className="grid gap-2">
//         {/* separate by each checkout group*/}
//         {sortedDataToLatest?.map((data, i) => (
//           <OrdersByDateAndTime key={i} data={data}/>
//         ))}
//       </div>
//     </div>
//   );
// }

import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import OrdersByDateAndTime from "./order-section/OrdersByDateAndTime";

export default function OrdersSection() {
  const [loading, setIsLoading] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);
  const [user, setUser] = useState(null); // Track the authenticated user

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
      <h2 className="font-semibold text-xl mb-5 text-customBrown-darkest">
        Order History
      </h2>
      {loading ? (
        <p>Loading...</p> // Display loading state
      ) : sortedDataToLatest?.length > 0 ? (
        <div className="grid gap-2">
          {sortedDataToLatest.map((data, i) => (
            <OrdersByDateAndTime key={i} data={data} />
          ))}
        </div>
      ) : (
        <p>No orders found.</p> // Handle empty state
      )}
    </div>
  );
}

