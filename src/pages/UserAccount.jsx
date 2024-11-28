import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { truncateBeforeChar } from "../utils/helpers";
import Sidebar from "../components/user-account/Sidebar";

export default function UserAccount() {
  const { user } = useAuthStore(); // Zustand store for user
  const [userDisplayName, setUserDisplayName] = useState("username"); // Initialize state

  useEffect(() => {
    if (user) {
      const truncatedEmail = truncateBeforeChar(user.email, "@");
      setUserDisplayName(user.displayName || truncatedEmail); // Use displayName or fallback to truncated email
      console.log('user', user.email)
    }
    
  }, [user]);
  

  return <div className="min-h-[100vh]">
    {/* <h1>{userDisplayName}'s Account</h1> */}
    <div className="w-1/5">
  <Sidebar />
  </div>
  <div className="w-4/5">

  </div>
  </div>;
}
