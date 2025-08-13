import React from 'react'
import { Icons } from '../../icons';

export const ProductList = () => {
  return (
    <div>ProductList</div>
  )
}

interface ProductCardProps {
  title: string;
  designer: string;
  price: number;
  imageUrl: string;
}

export const ProductCard = ({ title, designer, price, imageUrl }: ProductCardProps) => {
  return (
    <div className='flex flex-col items-start border-2 border-gray-200 p-2 rounded-lg'>
        {/* Image */}
      <img src={imageUrl} alt={title} className='w-full h-60 object-cover rounded-md' />
      {/* Caption */}
      <div className='mt-2 flex items-baseline flex-row justify-between w-full mb-4'>
        <div>
            <p className='text-[10px] text-gray-500 uppercase'>{designer}</p>
            <h2 className='text-lg font-normal'>{title}</h2>
            <p className='text-lg font-bold'>${price}</p>
        </div>
    <div className='size-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200 cursor-pointer p-2 self-baseline-last'>
      <Icons.bag />
        </div>
      </div>
    </div>
  )
}

export default ProductCard;
