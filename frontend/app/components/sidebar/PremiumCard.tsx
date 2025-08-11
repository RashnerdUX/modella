import React from 'react'

export const PremiumCard = () => {
  return (
    <div className='h-[20%]'>
       <div className='rounded-xl bg-accent w-full px-6 py-6 flex flex-col items-center space-y-4'>
            <h1 className='text-wrap font-bold text-base'>Upgrade to Pro</h1>
            <p className='text-wrap font-normal text-sm text-center leading-5'>Get 1 month free when you join premium</p>
            <button className='rounded-3xl bg-amber-600 px-4 py-3 w-full text-sm text-white font-bold'>Upgrade</button>
        </div> 
    </div>
  )
}

export default PremiumCard
