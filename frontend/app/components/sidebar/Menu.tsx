import React from 'react'
import type { IconType } from 'react-icons';
import { Icons } from '../../icons';
import { FaRegSun } from "react-icons/fa";

export const Menu = () => {
  return (
    <div className='flex flex-col space-y-2'>
        <MenuOption label='Home' icon={Icons.home} onClick={() => {}} selected={true} />
        <MenuOption label='Wardrobe' icon={Icons.closet} onClick={() => {}} selected={false} />
        <MenuOption label='Outfits' icon={Icons.outfits} onClick={() => {}} selected={false} />
        <MenuOption label='Calendar' icon={Icons.calendar} onClick={() => {}} selected={false} />
        <MenuOption label='Store' icon={Icons.store} onClick={() => {}} selected={false} />
        <MenuOption label='Profile' icon={Icons.profile} onClick={() => {}} selected={false} />
    </div>
  )
}

export const MoreOptions = () => {
  return (
    <div className='flex flex-col space-y-2'>
        <MenuOption label='Settings' icon={Icons.settings} onClick={() => {}} selected={false} />
        <MenuOption label='Help' icon={Icons.help} onClick={() => {}} selected={false} />
        <MenuOption label='Logout' icon={Icons.logout} onClick={() => {}} selected={false} />
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
