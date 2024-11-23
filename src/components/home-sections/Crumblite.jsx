import React from 'react'
import Gallery from '../gallery/Gallery'
import { cookies } from '../../data/productData'

export default function Crumblite() {
  return (
    <div>
        <Gallery products={cookies} bgColor="bg-customBrown-dark" category="Crumblite"/>
    </div>
  )
}
