import React from 'react'
import SingleOrder from './SingleOrder'
import { useNavigate } from 'react-router-dom'

export default function OrdersByDateAndTime({data}) {

    const items = data.items
    const date = new Date(data.createdAt);
    const handleNavigate = () => {
      const navigate = useNavigate();
      navigate('/products')
    }
  

  return (
    <div>
        <h2 className='mt-5'>
       <strong>Order Date and Time:</strong>  {date.toLocaleString()}
        </h2>
        <div className='grid gap-2 pt-2'>
        {items?.map((item)=>(<SingleOrder handleNavigate={handleNavigate} key={item._id} name={item.item_name} quantity={item.quantity}  image={item.image}/>))}
        </div>
        
    </div>
  )
}
