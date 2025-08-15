import React from 'react'

interface SectionHeadProps {
  title: string;
}

export const SectionHead = ({ title }: SectionHeadProps) => {
  return (
    <div className='flex items-center justify-between mb-4'>
      <h2 className='text-lg font-bold'>{title}</h2>
      <button className='text-sm text-gray-500'>See All</button>
    </div>
  )
}
