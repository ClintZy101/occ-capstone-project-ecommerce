import React from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'

export default function QuantityButtons({handleDecrement, handleIncrement, quantity}) {
  return (
    <div className="flex space-x-4 items-center  border w-max ">
              <span
                onClick={handleDecrement}
                className="cursor-pointer  w-10 h-10 grid place-items-center transition duration-300 hover:bg-customBrown"
              >
                <BiMinus />
              </span>
              <span>{quantity}</span>
              <span
                onClick={handleIncrement}
                className="cursor-pointer w-10 h-10 grid place-items-center transition duration-300 hover:bg-customBrown"
              >
                <BiPlus />
              </span>
            </div>
  )
}
