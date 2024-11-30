import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { truncateBeforeChar } from "../utils/helpers";
import Sidebar from "../components/user-account/SidebarAccount";
import AccountSection from "../components/user-account/AccountSection";
import ReviewsSection from "../components/user-account/ReviewsSection";
import OrdersSection from "../components/user-account/OrdersSection";

export default function UserAccount() {
  const { user } = useAuthStore(); // Zustand store for user
  const [userDisplayName, setUserDisplayName] = useState("username"); // Initialize state
  const [selectedSection, setSelectedSection] = useState("myaccount");
  const handleSection = (category) => {
    setSelectedSection(category);
  };

  useEffect(() => {
    if (user) {
      const truncatedEmail = truncateBeforeChar(user.email, "@");
      setUserDisplayName(user.displayName || truncatedEmail); // Use displayName or fallback to truncated email
      console.log("user", user.email);
    }
  }, [user]);

  return (
    <div className="min-h-[100vh] p-5 lg:flex">
      {/* <h1>{userDisplayName}'s Account</h1> */}
      <div className="md:w-1/5">
        <Sidebar
          handleCategory={handleSection}
          activeCategory={selectedSection}
        />
      </div>
      <div className="md:w-4/5">
      {selectedSection === 'myaccount' && <AccountSection />}
      {selectedSection === 'myreviews' && <ReviewsSection />}
      {selectedSection === 'myorders' && <OrdersSection />}
        
      </div>
    </div>
  );
}
