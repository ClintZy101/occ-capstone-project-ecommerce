import React, { useState, useEffect, useRef } from "react";
import { customerData } from "../../data/sampleReviewData";
import { motion } from "framer-motion";

export default function SweetReview() {
  const [inView, setInView] = useState(false); // Track if section is in view
  const sectionRef = useRef(null);

  // Set up Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true); // Trigger animation when section enters the viewport
        } else {
          setInView(false); // Optionally reset if you want it to animate again when it leaves
        }
      },
      { threshold: 0.2 } // Adjust this threshold as needed (e.g., 0.2 means 20% of the element must be visible)
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger children animation by 0.2s
        delayChildren: 0.2,  // Delay the start of the children animation
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      ref={sectionRef}  // Reference the section for intersection observer
      className="p-5"
      initial="hidden"
      animate={inView ? "show" : "hidden"}  // Trigger animation when in view
      variants={containerVariants}
    >
      <h2 className="font-bold text-2xl text-customBrown-darkest mb-10">Our Sweet Review</h2>
      <motion.div
        className="grid lg:gap-2 gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white"
        variants={containerVariants}
      >
        {customerData.map((data, i) => (
          <motion.div
            key={i}
            className="relative bg-cover bg-center  "
            variants={itemVariants}
            style={{
              backgroundImage: `url(${data.bg_src})`
            }}
          >
            {/* Dark Overlay for Each Review Item */}
            <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

            <div className="relative z-10 p-5 ">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-14 h-14 rounded-full overflow-hidden -top-7 left-2 absolute">
                  <img
                    src={data.img_src}
                    alt={data.name}
                    className="w-full h-auto"
                  />
                </div>
                <p className="mt-2 font-semibold">{data.name}'s Review</p>
              </div>
              <p>“{data.review}”</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
