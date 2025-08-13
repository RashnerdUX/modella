import type { IconType } from "react-icons";
import { FaHome, FaHeart, FaThList, FaTshirt, FaCloudUploadAlt, FaStoreAlt, FaCalendarAlt, FaUser } from "react-icons/fa";
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { FaBell } from 'react-icons/fa6'
import { FiCommand, FiSearch, FiArrowUpRight } from "react-icons/fi";
import { PiShirtFoldedFill } from "react-icons/pi";
import { BiCloset } from "react-icons/bi";
import { IoSettings } from "react-icons/io5";
import { IoIosHelpCircle } from "react-icons/io";
import { TbLogout } from "react-icons/tb";

// Central Icon registry for consistency

export const Icons: Record<string, IconType> = {
    home: FaHome,
    heart: FaHeart,
    bag: HiOutlineShoppingBag,
    notification: FaBell,
    command: FiCommand,
    search: FiSearch,
    arrowUpRight: FiArrowUpRight,
    outfits: PiShirtFoldedFill,
    closet: BiCloset,
    add_clothing: FaCloudUploadAlt,
    store: FaStoreAlt,
    shirt: FaTshirt,
    category: FaThList,
    calendar: FaCalendarAlt,
    profile: FaUser,
    settings: IoSettings,
    help: IoIosHelpCircle,
    logout: TbLogout,
};

// Type for icon names (for autocompletion & validation)
export type IconName = keyof typeof Icons;

// Type for any icon component
export type IconComponentType = IconType;