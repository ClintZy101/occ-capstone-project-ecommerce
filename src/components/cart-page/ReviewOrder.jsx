import React from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { CiTrash } from 'react-icons/ci'
import { FaPesoSign } from 'react-icons/fa6'

export default function ReviewOrder({
    cartItems,
    decrementQuantity,
    incrementQuantity,
    removeFromCart,
    handleAdditionalDeliveryFee,
    additionalDeliveryFee,
    getTotalPrice,
    total,
    shippingFee,
    deliveryOptionsRef
}) {
  return (
    <div className=" bg-customBrown-light p-5 ">
        <p className="font-semibold">1. Review Your Order</p>
        {cartItems.map((item, i) => (
          <div
            key={item.id}
            className="grid grid-cols-10 justify-between items-center px-0 border-b border-b-customBrown py-2 "
          >
            <span
              onClick={() => removeFromCart(item.id)}
              className="cursor-pointer col-span-1"
            >
              <CiTrash className="text-2xl hover:text-red-500 " />
            </span>

            <img src={item.img_src} alt="" className=" w-24 h-24 col-span-4" />

            <div className="grid gap-2 col-span-4">
              <p>{item.name}</p>
              {/* Quantity Control */}
              <div className="flex space-x-4 items-center border-customBrown border w-max ">
                <span
                  onClick={() => decrementQuantity(item.id)}
                  className="cursor-pointer hover:bg-customBrown-dark  w-7 h-7 grid place-items-center transition duration-300"
                >
                  <BiMinus />
                </span>
                <span>{item.quantity}</span>
                <span
                  onClick={() => incrementQuantity(item.id)}
                  className="cursor-pointer hover:bg-customBrown-dark  w-7 h-7 grid place-items-center transition duration-300"
                >
                  <BiPlus />
                </span>
              </div>
              <p className="flex items-center">
                <FaPesoSign />
                {item.price}
              </p>
            </div>
            <div className="flex items-center self-end text-right col-span-1">
              <FaPesoSign />
              {item.price * item.quantity}
            </div>
          </div>
        ))}
        <div className="mt-2 ">
          <div className="flex items-center justify-between">
            <p>Subtotal</p>
            <p>{getTotalPrice().toFixed(2)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Shipping Fee</p>
            <p>{shippingFee}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Delivery Option</p>
            <p>{additionalDeliveryFee}</p>
          </div>
          <div className="flex items-center justify-between border-t border-t-customBrown mt-4">
            <p className='font-semibold'>Total</p>
            <p className='flex items-center'><FaPesoSign />{total}</p>
          </div>
        </div>
        {/* Delivery Options */}
        <div className="mt-5 bg-customBrown p-5">
          <p className="font-semibold text-center mb-2">
            Additional Delivery Option
          </p>

          {/* Options */}
          <div className="flex space-x-2 items-center justify-between my-2">
            <p>FREE</p>
            <div className="grid text-center">
              <p>Regular</p>
              <p className="text-xs">(4-7 business days tracking)</p>
            </div>

            <input
              ref={deliveryOptionsRef.regular}
              onClick={()=>handleAdditionalDeliveryFee('regular')}
              name="deliveryOptions"
              value={0}
              type="radio"
              class="w-4 h-4  cursor-pointer"
            />
          </div>
          <div className="flex space-x-2 items-center justify-between my-2">
            <p className="flex items-center">
              <FaPesoSign /> 90
            </p>
            <div className="grid text-center">
              <p>Fast</p>
              <p className="text-xs">(2-3 business days tracking)</p>
            </div>

            <input
              ref={deliveryOptionsRef.fast}
              onClick={()=>handleAdditionalDeliveryFee('fast')}
              name="deliveryOptions"
              value={90}
              type="radio"
              class="w-4 h-4  cursor-pointer"
            />
          </div>
          <div className="flex space-x-2 items-center justify-between my-2">
            <p className="flex items-center">
              <FaPesoSign /> 120
            </p>
            <div className="grid text-center">
              <p>Express</p>
              <p className="text-xs">(1 business day tracking)</p>
            </div>
            <input
              ref={deliveryOptionsRef.express}
              onClick={()=>handleAdditionalDeliveryFee('express')}
              name="deliveryOptions"
              value={120}
              type="radio"
              class="w-4 h-4  cursor-pointer"
            />
          </div>
        </div>
      </div>
  )
}
