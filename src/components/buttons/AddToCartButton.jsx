import React from 'react'

export default function AddToCartButton({handleClick}) {
  return (
    <button 
    onClick={handleClick}
    className=' tracking-wide h-12 w-full sm:w-1/2 hover:bg-customBrown-light bg-customBrown-dark text-white hover:text-customBrown-darkest   font-bold'>Add To Cart</button>
  )
}
