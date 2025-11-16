
import React from 'react';
import type { ColumnDefinition } from '../../types';
import TableCheckbox from './TableCheckbox';

interface TableHeadProps<T> {
  columns: ColumnDefinition<T>[];
  onSelectAll?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isAllSelected?: boolean;
  numSelected?: number;
  rowCount?: number;
  withSelect?: boolean;
}

const TableHead = <T,>({ columns, onSelectAll, isAllSelected, numSelected, rowCount, withSelect = false }: TableHeadProps<T>) => {
  const indeterminate = numSelected > 0 && numSelected < rowCount;

  return (
    <thead className="bg-gray-800">
      <tr>
        {withSelect && onSelectAll && (
          <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
            <TableCheckbox
              checked={isAllSelected}
              onChange={onSelectAll}
              indeterminate={indeterminate}
              aria-label="Select all"
            />
          </th>
        )}
        {columns.map((col, index) => (
          <th
            key={String(col.key) || index}
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
          >
            {col.header}
          </th>
        ))}
        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
          <span className="sr-only">Actions</span>
        </th>
      </tr>
    </thead>
  );
};

export default TableHead;
