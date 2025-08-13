import React from 'react'
import PremiumCard from './PremiumCard';
import { DashboardLogo } from './DashboardLogo';
import {Menu, MoreOptions} from './Menu';
import { TitleDivider } from '../TitleDivider';

const Sidebar = () => {
  return (
    <div className=''>
        <div className='p-4 sticky top-0 overflow-y-auto'>
            {/* This will contain the logo only */}
            <DashboardLogo />
            {/* The list of options */}
            <TitleDivider title='Main Menu' />
            <Menu />
            {/* The footer */}
            <TitleDivider title='More Options' />
            <MoreOptions />
            {/* The premium card */}
            <PremiumCard />
        </div>
    </div>
  )
}

export default Sidebar;
