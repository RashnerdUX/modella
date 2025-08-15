import React from 'react'
import { StepCards } from './StepCard'

export const HowItWorks = () => {
  return (
        <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-primary-50 text-primary-700 border border-primary-200">
            <span aria-hidden>✨</span> Powered by AI</span>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight uppercase">
            How It <br/>
            <span className="text-primary-600">works</span>
            </h2>
            <p className="text-gray-600 max-w-md">
                      Capture your wardrobe, plan outfits effortlessly, and shop smarter with intelligent recommendations tuned to your unique style.
            </p>
            <div className="pt-4">
                <StepCards />
            </div>
        </div>
  )
}
