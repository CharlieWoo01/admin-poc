
import React from 'react';

interface TableBodyProps {
    children: React.ReactNode;
    isEmpty: boolean;
    colSpan: number;
}

const TableBody: React.FC<TableBodyProps> = ({ children, isEmpty, colSpan }) => {
    return (
        <tbody className="divide-y divide-gray-800 bg-gray-900">
            {isEmpty ? (
                <tr>
                    <td colSpan={colSpan} className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-400">
                        No data available.
                    </td>
                </tr>
            ) : (
                children
            )}
        </tbody>
    );
};

export default TableBody;
