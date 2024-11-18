import React from 'react'
import Gallery from '../gallery/ProductGallery'
import { cookies } from '../../data/productData'

export default function TopSeller() {
    const topSeller = cookies.filter(prod => prod.categories.includes("bestseller"))
  return (
    <div className='p-5'>
        <h1 className='font-bold text-2xl'>Top Seller</h1>
        <Gallery products={topSeller} />
    </div>
  )
}
