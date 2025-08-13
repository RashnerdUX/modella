import React from 'react'
import { Search } from './SearchBar'
import { Icons } from '../../../icons'

export const TopBar = () => {
  return (
        <div className="border-b-2 border-border w-full flex justify-between p-4">
          {/* Left section */}
          <div className='flex items-center w-1/2'>
            <h1 className="text-lg font-bold">Dashboard</h1>
          </div>
          {/* Right Section */}
          <div className="flex items-center space-x-4 w-1/2">
              {/* Search bar */}
              <div className="flex-1">
                <Search />
              </div>
              <div className="flex items-center space-x-4 px-4">
                <div className="relative">
                  <Icons.notification className="text-gray-600 w-6 h-6 cursor-pointer" />
                  {/* The number of pending notifications */}
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-[6px] w-3 h-3 flex items-center justify-center">3</span>
                </div>
                <img
                  src="/avatars/monad.png"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
          </div>
        </div>
  )
}
