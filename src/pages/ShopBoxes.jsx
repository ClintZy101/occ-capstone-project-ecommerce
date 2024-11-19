import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../components/sidebar-shopboxes/Sidebar'
import Gallery from '../components/gallery/Gallery'
import { cookies } from '../data/productData'

export default function ShopBoxes() {
    const [selectedCategory, setSelectedCategory] = useState("allproducts")
    const [categoryName, setCategoryName] = useState("All Products")
    const [productsInCategory, setProductsInCategory] = useState(cookies)


    const handleCategory = (category) => {
        setSelectedCategory(category);
    };
    useEffect(() => {
        let filteredProducts;
        let name;
        switch (selectedCategory) {
            case 'allproducts':
                filteredProducts = cookies;
                name = "All Products"
                break;
            case 'bestseller':
                filteredProducts = cookies.filter((c) => c.categories.includes('bestseller'));
               name = "Best Seller"
                break;
            case 'comboboxes':
                filteredProducts = cookies.filter((c) => c.categories.includes('comboboxes'));
                name= "Combo Boxes"
                break;
            case 'crumblite':
                filteredProducts = cookies.filter((c) => c.categories.includes('crumblite'));
                name="Crumblite Cookies"
                break;
            default:
                filteredProducts = cookies;
                name= "All Products"
        }
        setProductsInCategory(filteredProducts);
        setCategoryName(name)
    }, [selectedCategory]);
console.log(productsInCategory)
  return (
    <div className='flex'>
        <Sidebar handleCategory={handleCategory} activeCategory={selectedCategory}/>
        <div>
            <Gallery products={productsInCategory}  bgColor={"bg-customBrown"} category={categoryName} />
        </div>
    </div>
  )
}
