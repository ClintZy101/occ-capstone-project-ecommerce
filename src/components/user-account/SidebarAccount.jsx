import React from "react";

const Category = ({ category, handleCategory, name, activeCategory }) => {
  const isActive = category === activeCategory;
  return (
    <p
      onClick={() => handleCategory(category)}
      className={`font-semibold cursor-pointer ${isActive ? "text-customBrown" : "text-customBrown-darkest"}`}
    >
      {name}
    </p>
  );
};

const categories = [
  { name: "My Account", category: "myaccount" },
  { name: "My Orders", category: "myorders" },
  { name: "My Reviews", category: "myreviews" },
];

export default function SidebarAccount({ handleCategory, activeCategory }) {
  return (
    <div className="min-w-[250px] px-5 py-5">
      {/* <h2 className="font-bold border-b pb-2">Browse By</h2> */}
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
