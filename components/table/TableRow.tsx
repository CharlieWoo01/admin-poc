
import React from 'react';

interface TableRowProps {
    children: React.ReactNode;
    isSelected?: boolean;
}

const TableRow: React.FC<TableRowProps> = ({ children, isSelected = false }) => {
    return (
        <tr className={isSelected ? 'bg-primary-950' : ''}>
            {children}
        </tr>
    );
};

export default TableRow;
