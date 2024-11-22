import React from "react";

const Category = ({ category, handleCategory, name, activeCategory }) => {
  const isActive = category === activeCategory;
  return (
    <p
      onClick={() => handleCategory(category)}
      className={`font-semibold cursor-pointer ${isActive ? "text-customBrown-light" : "text-white"}`}
    >
      {name}
    </p>
  );
};

const categories = [
  { name: "All Products", category: "allproducts" },
  { name: "Best Seller", category: "bestseller" },
  { name: "Combo Boxes", category: "comboboxes" },
  { name: "Crumblite", category: "crumblite" },
];

export default function Sidebar({ handleCategory, activeCategory }) {
  return (
    <div className="min-w-[250px] bg-customBrown-dark text-white px-5 py-5">
      <h2 className="font-bold border-b pb-2">Browse By</h2>
      <div className="grid gap-2 mt-5">
        {categories.map((cat, i) => (
          <Category
            key={i}
            category={cat.category}
            handleCategory={handleCategory}
            name={cat.name}
            activeCategory={activeCategory}
          />
        ))}
      </div>
    </div>
  );
}
