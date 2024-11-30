import React from 'react'
import SingleOrder from './SingleOrder'

export default function OrdersByDateAndTime({data}) {

    const items = data.items
    const date = new Date(data.createdAt);

  return (
    <div>
        <h2 className='mt-5'>
       <strong>Order Date and Time:</strong>  {date.toLocaleString()}
        </h2>
        <div className='grid gap-2 pt-2'>
        {items?.map((item)=>(<SingleOrder key={item._id} name={item.item_name} quantity={item.quantity}  image={item.image}/>))}
        </div>
        
    </div>
  )
}
