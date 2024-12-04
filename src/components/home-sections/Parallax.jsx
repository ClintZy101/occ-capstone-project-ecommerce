import React from "react";

export default function Parallax() {
  const lemon =
    "https://images.pexels.com/photos/29611028/pexels-photo-29611028/free-photo-of-sunlit-lemon-cookies-on-wooden-platter.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  return (
    <div>
      {/* Parallax Container */}
      <div
        className="h-[500px] bg-fixed bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/5522897/pexels-photo-5522897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        }}
      >
        {/* Optional Overlay */}
        <div className="h-full grid justify-center items-center bg-black bg-opacity-50">
          <div>
            {/* <h1 className="text-white text-4xl font-bold">Cookie Lemon</h1> */}

            <p className="text-white text-3xl p-5 md:max-w-[700px] italic font-serif tracking-widest">
              {" "}
              "These perfected cookies deliver a taste that's nothing short of
              heavenly, bringing joy to every bite. Crafted with love, they are
              the perfect treat for families to share and savor together."
            </p>

            {/* <p className="text-white text-lg">
              These sunlit lemon cookies are the perfect blend of tangy and
              sweet! Add this to your favorites and enjoy their refreshing
              flavor anytime.
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
