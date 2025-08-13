import React from 'react'
import type { IconType } from 'react-icons';
import {Icons} from '../icons';


export const FeaturesCardSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <FeaturesCard
        title="Digital Wardrobe"
        icon={Icons.closet}
        className="border-r-2 border-r-gray-200"
        description="Keep track of all your clothes in one place. Never forget what you own again."
      />
      <FeaturesCard
        title="AI Stylist"
        className="border-r-2 border-r-gray-200"
        icon={Icons.style}
        description="Get personalized outfit recommendations based on your style and preferences."
      />
      <FeaturesCard
        title="Outfit Planning"
        icon={Icons.calendar}
        description="Plan your outfits ahead of time. Save time and reduce stress in the morning."
      />
    </div>
  );
};

interface FeaturesCardProps {
  title: string;
  icon: IconType;   
  className?: string;   
  description: string;
}

export const FeaturesCard = ({ title, icon: Icon, description, className }: FeaturesCardProps) => {
  return (
        <div className={`bg-white ${className} p-6 text-center`}>
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon className='size-8'/>
            </div>
            <h3 className="font-semibold text-xl mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
  )
}
