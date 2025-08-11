import React from 'react'
import {Search} from "./SearchBar";

export const DashboardHome = () => {
  return (
    <div className="bg-white rounded-2xl h-[200px]">
        {/* Top of the dashboard */}
        <div className="border-b border-stone-500 w-full">
            <Search />
          <div>

          </div>
        </div>
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
        <p className="mb-2">Welcome</p>
    </div>
  )
}   

export default DashboardHome;
