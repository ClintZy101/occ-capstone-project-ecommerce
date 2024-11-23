import React from "react";

import AuthProvider from "../components/auth/AuthProvider";
import { useAuthStore } from "../store/useAuthStore";

import Hero from "../components/hero/Hero";
import TopSeller from "../components/home-sections/TopSeller";
import Gallery from "../components/gallery/Gallery";
import Crumblite from "../components/home-sections/Crumblite";
import SweetReview from "../components/home-sections/SweetReview";


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
      <TopSeller />
      <Crumblite />
      <SweetReview />

    </AuthProvider>
  );
};