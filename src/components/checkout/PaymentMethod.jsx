import React from 'react'
import { FaPesoSign } from 'react-icons/fa6'

export default function PaymentMethod({total, paymentMethod, setPaymentMethod, handleCheckout}) {

  return (

    <div className=" bg-customBrown-light p-5 ">
        <p className="font-semibold">3. Select Payment Method</p>
        <div className='w-full grid gap-2 mt-5 text-center p-5 bg-white'>
          <p 
          onClick={()=>setPaymentMethod('Card')}
          className={`${paymentMethod === 'Card' ? 'bg-customBrown' : 'bg-white'} cursor-pointer border-b py-2 hover:bg-customBrown-light`}>Card</p>
          <p 
          onClick={()=>setPaymentMethod('Gcash')}
          className={`${paymentMethod === 'Gcash' ? 'bg-customBrown': 'bg-white'} cursor-pointer border-b py-2 hover:bg-customBrown-light`}>Gcash</p>
          <p 
          onClick={()=>setPaymentMethod('Paypal')}
          className={`${paymentMethod === 'Paypal' ? 'bg-customBrown': 'bg-white'} cursor-pointer border-b py-2 hover:bg-customBrown-light`}>Paypal</p>
        </div>
        <div className='flex items-center justify-between mt-5'>
          <p className='font-semibold'>Order Total:</p>
          <p className='font-semibold flex items-center'><FaPesoSign />{total}</p>
        </div>
        <button type='submit'
        onClick={handleCheckout}
         className='bg-customBrown-darkest hover:bg-customBrown-dark hover:text-customBrown-darkest w-full mt-5 p-2 text-white'>Complete Order</button>
    </div>

  )
}
