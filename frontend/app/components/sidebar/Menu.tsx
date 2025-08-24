import React from 'react'
import type { IconType } from 'react-icons';
import { useNavigate, useLocation } from 'react-router';
import { Icons } from '../../icons';
import { useAuth } from '~/auth';

const switchPage = (page: string, navigate: (path: string) => void) => {
  navigate(`/dashboard/${page}`);
};

export const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div className='flex flex-col space-y-2'>
        <MenuOption label='Home' icon={Icons.home} onClick={() => navigate('/dashboard')} selected={location.pathname === '/dashboard'} />
        <MenuOption label='Wardrobe' icon={Icons.closet} onClick={() => switchPage('wardrobe', navigate)} selected={location.pathname === '/dashboard/wardrobe'} />
        <MenuOption label='Outfits' icon={Icons.outfits} onClick={() => switchPage('outfit', navigate)} selected={location.pathname === '/dashboard/outfit'} />
        <MenuOption label='Calendar' icon={Icons.calendar} onClick={() => switchPage('calendar', navigate)} selected={location.pathname === '/dashboard/calendar'} />
        <MenuOption label='Store' icon={Icons.store} onClick={() => switchPage('store', navigate)} selected={location.pathname === '/dashboard/store'} />
        <MenuOption label='Profile' icon={Icons.profile} onClick={() => switchPage('profile', navigate)} selected={location.pathname === '/dashboard/profile'} />
    </div>
  )
}

export const MoreOptions = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();
  
  return (
    <div className='flex flex-col space-y-2'>
        <MenuOption label='Settings' icon={Icons.settings} onClick={() => switchPage('settings', navigate)} selected={location.pathname === '/dashboard/settings'} />
        <MenuOption label='Help' icon={Icons.help} onClick={() => switchPage('help', navigate)} selected={location.pathname === '/dashboard/help'} />
        <MenuOption label='Logout' icon={Icons.logout} onClick={() => { logout(); }} selected={false} />
    </div>
  )
}

interface MenuOptionsProps {
    selected: boolean;
  label: string;
  icon: IconType;
  onClick: () => void;
};

export const MenuOption = ({label, icon: Icon, onClick, selected}:MenuOptionsProps) => {
    return <button onClick={onClick} className={`flex items-center gap-2 p-2 w-full text-sm rounded-md hover:bg-gray-100 ${selected ? 'bg-white text-black shadow' : 'text-stone-500'}`}><Icon /> {label}</button>
}
