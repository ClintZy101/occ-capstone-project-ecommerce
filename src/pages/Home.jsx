import React from "react";



import Hero from "../components/hero/Hero";
import TopSeller from "../components/home-sections/TopSeller";
// import Gallery from "../components/gallery/Gallery";
import Crumblite from "../components/home-sections/Crumblite";
import SweetReview from "../components/home-sections/SweetReview";
import Parallax from "../components/home-sections/Parallax";
import ParallaxWithScale from "../components/home-sections/ParallaxWithScale";
import CookieImage from "../components/3d-images/ThreeDCookie";

export default function Home() {
  return (
    <div className="">
      {/* set up loader later on */}
      {/* {loading && <div>Loading</div>} */}
      {/* Hero Landing Page */}
      <Hero />

      <TopSeller />
      {/* <ParallaxWithScale /> */}
      {/* <div className="mt-20"></div> */}
      <CookieImage />
      <Parallax/>
      <Crumblite />
      <SweetReview />
    </div>
  );
}
