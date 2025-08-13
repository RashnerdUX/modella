import React from 'react'
import { ProductCard } from '~/components/store/ProductCard'
import { SectionHead } from '../SectionHead'

export const StoreRecommendations = () => {
  return (
    <div>
      <SectionHead title='Recommended for you' />
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <ProductCard
          title='Stylish Outfit'
          designer='Dior'
          price={79.99}
          imageUrl='/images/pants.jpg'
        />
        <ProductCard
          title='Casual Wear'
          designer='Chanel'
          price={49.99}
          imageUrl='/images/pants.jpg'
        />
        <ProductCard
          title='Casual Wear'
          designer='Chanel'
          price={49.99}
          imageUrl='/images/pants.jpg'
        />
        <ProductCard
          title='Casual Wear'
          designer='Chanel'
          price={49.99}
          imageUrl='/images/pants.jpg'
        />
      </div>
    </div>
  )
}
