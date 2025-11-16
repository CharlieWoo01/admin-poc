
import React from 'react';
import Icon from '../ui/Icon';
import type { IconName } from '../ui/Icon';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: IconName;
  iconBgColor?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  iconBgColor = 'bg-primary-600',
}) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-5 flex items-center space-x-4">
      <div className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg ${iconBgColor}`}>
        <Icon name={icon} className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-400 truncate">{title}</p>
        <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
