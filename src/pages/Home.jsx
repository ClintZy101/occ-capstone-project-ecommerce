import React from "react";

import AuthProvider from "../components/auth/AuthProvider";
import { useAuthStore } from "../store/useAuthStore";

import Hero from "../components/hero/Hero";
import TopSeller from "../components/sections/TopSeller";


export default function Home(){
  const {user, loading} = useAuthStore();
// console.log(user, loading)
  return (
    <AuthProvider>
      <div className="">
        {/* set up loader later on */}
        {/* {loading && <div>Loading</div>} */}
        {/* Hero Landing Page */}
      <Hero />
      </div>
      {/* Top Seller */}
      {/* <div className="h-[50px]"></div> */}
      <TopSeller />
    </AuthProvider>
  );
};