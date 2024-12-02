// import React from "react";

// const Category = ({ category, handleCategory, name, activeCategory }) => {
//   const isActive = category === activeCategory;
//   return (
//     <p
//       onClick={() => handleCategory(category)}
//       className={`font-semibold cursor-pointer ${isActive ? "text-customBrown" : "text-customBrown-darkest"}`}
//     >
//       {name}
//     </p>
//   );
// };

// const categories = [
//   { name: "My Account", category: "myaccount" },
//   { name: "My Orders", category: "myorders" },
//   { name: "My Reviews", category: "myreviews" },
// ];

// export default function SidebarAccount({ handleCategory, activeCategory }) {
//   return (
//     <div className="min-w-[250px] px-5 py-5">
//       {/* <h2 className="font-bold border-b pb-2">Browse By</h2> */}
//       <div className="grid gap-2 mt-5">
//         {categories.map((cat, i) => (
//           <Category
//             key={i}
//             category={cat.category}
//             handleCategory={handleCategory}
//             name={cat.name}
//             activeCategory={activeCategory}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({user}) {


  return (
    <nav className="lg:grid lg:gap-3 mb-5 flex w-full justify-between lg:w-max ">
    
      <NavLink
        to={`${user?.uid}`}
        className={({ isActive }) =>
          isActive ? "text-customBrown font-bold" : "text-gray-700"
        }
      >
        My Account
      </NavLink>
      <NavLink
        to="myorders"
        className={({ isActive }) =>
          isActive ? "text-customBrown font-bold" : "text-gray-700"
        }
      >
        My Orders
      </NavLink>
      <NavLink
        to="myreviews"
        className={({ isActive }) =>
          isActive ? "text-customBrown font-bold" : "text-gray-700"
        }
      >
        My Reviews
      </NavLink>
     
    </nav>
  );
}

