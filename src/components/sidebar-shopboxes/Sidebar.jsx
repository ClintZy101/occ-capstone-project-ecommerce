import React, { useState } from "react";

const Category = ({ category, handleCategory, name, isClicked,setIsClicked}) => (
  <p   onClick={()=>{handleCategory(category)}} className={`${category === category ? "font-extrabold": ""} font-semibold cursor-pointer`}>
    {name}
  </p>
);
const categories = [
  { name: "All Products",category:"allproducts" },
  { name: "Best Seller", category:"bestseller"},
  { name: "Combo Boxes",category:"comboboxes" },
  { name: "Crumblite ",category:"crumblite" },
];

export default function Sidebar({handleCategory}) {
    const [isClicked, setIsClicked] = useState(false)
  return (
    <div className="min-w-[250px]  bg-customBrown-dark text-white px-5 py-5 ">
      <h2 className="font-bold border-b pb-2">Browse By</h2>
      <div className="grid gap-2 mt-5">
        {categories.map((cat,i) => (
            <Category  key={i}   category={cat.category} name={cat.name}  handleCategory={handleCategory} isClicked={isClicked} setIsClicked={setIsClicked}/>
        ))}
        
      </div>
    </div>
  );
}
