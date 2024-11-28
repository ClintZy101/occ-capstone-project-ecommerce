import React from "react";



import Hero from "../components/hero/Hero";
import TopSeller from "../components/home-sections/TopSeller";
import Gallery from "../components/gallery/Gallery";
import Crumblite from "../components/home-sections/Crumblite";
import SweetReview from "../components/home-sections/SweetReview";

export default function Home() {
  return (
    <div className="">
      {/* set up loader later on */}
      {/* {loading && <div>Loading</div>} */}
      {/* Hero Landing Page */}
      <Hero />

      <TopSeller />
      <Crumblite />
      <SweetReview />
    </div>
  );
}
