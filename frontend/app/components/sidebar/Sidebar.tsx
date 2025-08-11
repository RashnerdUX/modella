import React from 'react'
import PremiumCard from './PremiumCard';
import { DashboardLogo } from './DashboardLogo';
import {Menu} from './Menu';

const Sidebar = () => {
  return (
    <div className=''>
        <div className='p-4 sticky'>
            {/* This will contain the logo only */}
            <DashboardLogo />
            {/* The list of options */}
            <Menu />
            {/* The premium card */}
            {/* The footer */}
        </div>
    </div>
  )
}

export default Sidebar;
