import type { IconType } from "react-icons";
import { FiArrowUpRight } from "react-icons/fi";
import { Icons } from "../../../icons";

interface QuickAction {
    id: string;
    label: string;
    icon: IconType;
    backgroundColor?: string; // Optional background color
    color: string;
    onClick?: () => void;
}

export const QuickActions: React.FC = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <QuickAction id="1" label="Upload Clothing" icon={Icons.add_clothing} color="text-blue-500" backgroundColor='bg-blue-100' onClick={() => console.log('Action 1 clicked')} />
            <QuickAction id="2" label="Create Outfit" icon={Icons.outfits} color="text-red-500" backgroundColor='bg-red-100' onClick={() => console.log('Action 2 clicked')} />
            <QuickAction id="3" label="View Wardrobe" icon={Icons.closet} color="text-yellow-500" backgroundColor='bg-yellow-100' onClick={() => console.log('Action 3 clicked')} />
            <QuickAction id="4" label="Enter Store" icon={Icons.store} color="text-green-500" backgroundColor='bg-green-100' onClick={() => console.log('Action 4 clicked')} />
        </div>
    )
}

const QuickAction: React.FC<QuickAction> = ({ id, label, icon: Icon, backgroundColor, color, onClick }) => {
    return (
        <button key={id} onClick={onClick} className="flex flex-row space-x-2 items-center justify-between p-4 bg-white rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
            <div className="flex flex-row items-center space-x-2">
                <div className={`size-8 rounded-2xl ${backgroundColor} flex justify-center items-center`}>
                <Icon className={`${color}`} />
                </div>
                <span className="text-sm font-medium text-gray-700">{label}</span>
            </div>
            <FiArrowUpRight className="text-gray-400 w-4 h-4" />
        </button>
    );
};

export default QuickAction;
