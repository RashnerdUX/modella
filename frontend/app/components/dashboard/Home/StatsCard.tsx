import type { IconType } from 'react-icons';
import { Icons } from '../../../icons';

interface StatsCardProps {
            title: string;
            icon: IconType;
            value: string | number;
            className?: string;
}

export const StatisticsSection: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatsCard title="Clothing Items" icon={Icons.shirt} value={10} />
            <StatsCard title="Outfits" icon={Icons.outfits} value={4} />
            <StatsCard title="Favourites" icon={Icons.heart} value={89} />
            <StatsCard title="Categories" icon={Icons.category} value={12} />
        </div>
    );
};

const StatsCard: React.FC<StatsCardProps> = ({ title, icon: Icon, value, className }) => {
    return (
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                <div className={`w-12 h-12 ${className} rounded-full flex items-center justify-center mb-3`}>
                    <Icon />
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        );
    };

export default StatsCard;
