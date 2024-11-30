// import React, { useEffect, useState } from "react";
// import { useAuthStore } from "../store/useAuthStore";
// import { truncateBeforeChar } from "../utils/helpers";
// import Sidebar from "../components/user-account/SidebarAccount";
// import AccountSection from "../components/user-account/AccountSection";
// import ReviewsSection from "../components/user-account/ReviewsSection";
// import OrdersSection from "../components/user-account/OrdersSection";

// export default function UserAccount() {
//   const { user } = useAuthStore(); // Zustand store for user
//   const [userDisplayName, setUserDisplayName] = useState("username"); // Initialize state
//   const [selectedSection, setSelectedSection] = useState("myaccount");
//   const handleSection = (category) => {
//     setSelectedSection(category);
//   };

//   useEffect(() => {
//     if (user) {
//       const truncatedEmail = truncateBeforeChar(user.email, "@");
//       setUserDisplayName(user.displayName || truncatedEmail); // Use displayName or fallback to truncated email
//       console.log("user", user.email);
//     }
//   }, [user]);

//   return (
//     <div className="min-h-[100vh] p-5 lg:flex">
//       {/* <h1>{userDisplayName}'s Account</h1> */}
//       <div className="md:w-1/5">
//         <Sidebar
//           handleCategory={handleSection}
//           activeCategory={selectedSection}
//         />
//       </div>
//       <div className="md:w-4/5">
//       {selectedSection === 'myaccount' && <AccountSection />}
//       {selectedSection === 'myreviews' && <ReviewsSection />}
//       {selectedSection === 'myorders' && <OrdersSection />}
        
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { truncateBeforeChar } from "../utils/helpers";
import Sidebar from "../components/user-account/SidebarAccount";
import AccountSection from "../components/user-account/AccountSection";
import ReviewsSection from "../components/user-account/ReviewsSection";
import OrdersSection from "../components/user-account/OrdersSection";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function UserAccount() {
  const [userDisplayName, setUserDisplayName] = useState("username");
  const [userId, setUserId] = useState('')
  const [user, setUser] = useState(null); 

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
      const truncatedEmail = truncateBeforeChar(user.email, "@");
      setUserDisplayName(user.displayName || truncatedEmail);
      setUserId(user.uid)
      // console.log("user", user.email);
    }
  }, [user]);

  return (
    <div className="min-h-[100vh] p-5 lg:flex">
      {/* Sidebar for navigation */}
      <div className=" min-w-[200px]">
        <Sidebar user={user}/>
      </div>

      {/* Nested routes */}
      <div className="md:w-4/5">
        <Routes>
          <Route path="/" element={<Navigate to={`${userId}`} />} /> {/* Default */}
          <Route path={`${userId}`} element={<AccountSection />} />
          <Route path="myreviews" element={<ReviewsSection />} />
          <Route path="myorders" element={<OrdersSection />} />
        </Routes>
      </div>
    </div>
  );
}
