
import React from 'react';

interface TableCellProps {
    children: React.ReactNode;
    className?: string;
    isPrimary?: boolean;
}

const TableCell: React.FC<TableCellProps> = ({ children, className = '', isPrimary = false }) => {
    const primaryClasses = isPrimary ? 'font-medium text-white' : 'text-gray-400';
    return (
        <td className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0 ${primaryClasses} ${className}`}>
            {children}
        </td>
    );
};

export default TableCell;
