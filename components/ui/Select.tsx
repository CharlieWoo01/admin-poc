
import React from 'react';
import Icon from './Icon';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className = '', children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={`block w-full appearance-none rounded-md border-0 bg-white/5 py-1.5 pl-3 pr-10 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6 ${className}`}
          {...props}
        >
            {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <Icon name="chevron-down" className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
