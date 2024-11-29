import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { truncateBeforeChar } from "../utils/helpers";
import Sidebar from "../components/user-account/SidebarAccount";
import AccountSection from "../components/user-account/AccountSection";

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
    <div className="min-h-[100vh] p-5 flex">
      {/* <h1>{userDisplayName}'s Account</h1> */}
      <div className="w-1/5">
        <Sidebar
          handleCategory={handleSection}
          activeCategory={selectedSection}
        />
      </div>
      <div className="w-4/5">
        <AccountSection />
      </div>
    </div>
  );
}
