import React, { useState, useEffect, useRef } from "react";
import { FaPesoSign } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReviewStars from "../reviews/ReviewStars";

export default function Gallery({ products, bgColor, category }) {
  const [inView, setInView] = useState(false);  // Track if section is in view
  const sectionRef = useRef(null);

  // Set up Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);  
        } else {
          // setInView(false);  // Optionally reset if you want it to animate again when it leaves
        }
      },
      { threshold: 0.05 }  // Adjust this threshold as needed (e.g., 0.2 means 20% of the element must be visible)
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
      className="p-5 pb-20"
      initial="hidden"
      animate={inView ? "show" : "hidden"}  // Trigger animation when in view
      variants={containerVariants}
    >
      <h1 className="text-customBrown-darkest text-2xl mb-5 font-bold">
        {category}
      </h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center items-center"
        variants={containerVariants}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="overflow-hidden grid relative mx-auto"
            variants={itemVariants}
          >
            <div className="overflow-hidden rounded-t">
              <Link to={`/products/${product.name}`} state={product}>
                <img
                  src={product.img_src}
                  alt={product.name}
                  className="w-full h-full hover:scale-125 duration-300 cursor-pointer aspect-square"
                />
              </Link>
            </div>
            <div className="border border-customBrown-light p-2 rounded-b">
              <p className="text-customBrown-darkest font-thin line-clamp-1">
                {product.name}
              </p>
              <ReviewStars cookie={product} />
              <p className="text-customBrown-dark flex space-x-2 items-center font-light mt-2">
                <FaPesoSign />
                {product.price.toFixed(2)}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
