import React from 'react'
import { StatisticsSection } from '../../components/dashboard/Home/StatsCard';
import Calendar from '../../components/Calendar';
import { QuickActions } from '../../components/dashboard/Home/QuickAction';
import { OufitOfTheDay } from '../../components/dashboard/Home/OufitOfTheDay';
import { TopBar } from '../../components/dashboard/Home/TopBar';
import { StoreRecommendations } from '../../components/dashboard/Home/StoreRecommendations';

export const DashboardHome = () => {
  return (
    <>
        {/* Top of the dashboard */}
        <TopBar />
        {/* Main content */}
        <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2">
            {/* Outfit of the day - Left panel*/}
            <div className='md:col-span-1 min-h-screen'>
              <OufitOfTheDay className="h-full" />
            </div>

            {/* Right panel: quick actions, calendar, statistics */}
            <div className='md:col-span-1 flex flex-col space-y-4'>
              {/* Quick actions */}
              <QuickActions />
              {/* Statistics */}
              <StatisticsSection />
              {/* Calendar */}
              <div>
                <Calendar className='w-full' />
              </div>
            </div>

            {/* Store recommendations - full width below */}
            <div className='md:col-span-2'>
              <StoreRecommendations />
            </div>
        </div>
      </>
  )
}   

export default DashboardHome;
