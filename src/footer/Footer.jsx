import React from 'react'

export default function Footer() {
  return (
    <div className='p-5 flex space-x-20 bg-customBrown-light text-customBrown-darkest justify-center items-center h-[300px] '>
        <div className='grid gap-5'>
        <h2 className='font-bold text-xl'>Product Info</h2>
        <p>About Crumblite</p>
        <p>Careers</p>
        </div>
        <div className='grid gap-5'>
            <h2 className='font-bold text-xl'>Help & Support</h2>
            <p>Shipping Info</p>
            <p>Returns</p>
        </div>
       
    </div>
  )
}
