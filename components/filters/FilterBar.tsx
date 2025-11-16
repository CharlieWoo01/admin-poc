
import React from 'react';

interface FilterBarProps {
  children: React.ReactNode;
}

const FilterBar: React.FC<FilterBarProps> = ({ children }) => {
  return (
    <div className="mb-4 p-4 bg-gray-800 border border-gray-700 rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  );
};

export default FilterBar;
