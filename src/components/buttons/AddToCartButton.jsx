import React from 'react'

export default function AddToCartButton({handleClick}) {
  return (
    <button 
    onClick={handleClick}
    className=' tracking-wide h-12 w-full sm:w-1/2 bg-customBrown-light hover:bg-customBrown-dark hover:text-white   '>Add To Cart</button>
  )
}
