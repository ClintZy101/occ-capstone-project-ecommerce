import React from "react";



import Hero from "../components/home-sections/Hero";
import TopSeller from "../components/home-sections/TopSeller";
// import Gallery from "../components/gallery/Gallery";
import Crumblite from "../components/home-sections/Crumblite";
import SweetReview from "../components/home-sections/SweetReview";
import Parallax from "../components/home-sections/Parallax";
import CookieImage from "../components/3d-images/ThreeDCookie";
import Hero2 from "../components/home-sections/Hero2";

export default function Home() {
  return (
    <div className="">
      {/* set up loader later on */}
      {/* {loading && <div>Loading</div>} */}
      <Hero />
      {/* <Hero2 /> */}

      <TopSeller />

      {/* <div className="mt-20"></div> */}
      <CookieImage />
      <Parallax/>
      <Crumblite />
      <SweetReview />
    </div>
  );
}
