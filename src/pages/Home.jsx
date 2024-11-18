import React from "react";

import AuthProvider from "../components/auth/AuthProvider";
import { useAuthStore } from "../store/useAuthStore";


export default function Home(){
  const {user, loading} = useAuthStore();
console.log(user, loading)
  return (
    <AuthProvider>
      <div className="mt-[200px]">
        {loading && <div>Loading</div>}
        {user ? <p>Welcome, {user.email}</p> : <p>Please log in</p>}
      </div>
    </AuthProvider>
  );
};