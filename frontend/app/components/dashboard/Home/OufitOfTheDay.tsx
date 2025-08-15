import React from 'react'

interface OufitOfTheDayProps {
  className?: string;
}

export const OufitOfTheDay = ({ className }: OufitOfTheDayProps) => {
  return (
        <div className={`bg-gray-50 rounded-xl p-6 flex flex-col justify-between h-64 md:h-full relative ${className}`}>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800">Outfit of the day</h3>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              {/* Outfit content goes here */}
            </div>
            
            <div className="absolute bottom-4 right-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
        </div>
  )
}

export default OufitOfTheDay;
