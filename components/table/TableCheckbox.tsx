
import React, { useRef, useEffect } from 'react';

interface TableCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean;
}

const TableCheckbox = React.forwardRef<HTMLInputElement, TableCheckboxProps>(
  ({ indeterminate, className, ...rest }, ref) => {
    const defaultRef = useRef<HTMLInputElement>(null);
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      if (typeof resolvedRef === 'object' && resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate ?? false;
      }
    }, [resolvedRef, indeterminate]);

    return (
      <input
        type="checkbox"
        ref={resolvedRef}
        className={`h-4 w-4 rounded bg-gray-700 border-gray-600 text-primary-600 focus:ring-primary-600 focus:ring-offset-gray-900 ${className}`}
        {...rest}
      />
    );
  }
);

TableCheckbox.displayName = 'TableCheckbox';

export default TableCheckbox;
