import React from 'react'
import SingleOrder from './SingleOrder'

export default function OrdersByDateAndTime({data, handleProductForReview}) {
    const items = data.items
    const date = new Date(data.createdAt);
  
  return (
    <div>
        <h2 className='mt-5'>
       <strong>Order Date and Time:</strong>  {date.toLocaleString()}
        </h2>
        {/* _id is from the database, not the hardcoded id */}
        <div className='grid gap-2 pt-2'>
        {items?.map((item)=>(<SingleOrder handleProductForReview={handleProductForReview} key={item._id} name={item.item_name} quantity={item.quantity}  image={item.image} id={item._id}/>))}
        </div>
        {/* <div className='grid gap-2 pt-2'>
        {items?.map((item)=>(<SingleOrder handleReviewModal={handleReviewModal} key={item._id} item={item}/>))}
        </div> */}
        
    </div>
  )
}
