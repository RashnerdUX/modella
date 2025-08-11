import React from 'react'
import type { IconType } from 'react-icons';
import { FaHome, FaHeart, FaRegSun} from "react-icons/fa";

export const Menu = () => {
  return (
    <div className='flex flex-col space-y-2'>
        <MenuOption label='Option 1' icon={FaHome} onClick={() => {}} selected={true} />
        <MenuOption label='Option 2' icon={FaHeart} onClick={() => {}} selected={false} />
        <MenuOption label='Option 3' icon={FaRegSun} onClick={() => {}} selected={false} />
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
