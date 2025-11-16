
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-gray-800 border border-gray-700 rounded-xl shadow-lg ${className}`}>
      {title && (
        <div className="px-4 py-3 border-b border-gray-700 sm:px-6">
          <h3 className="text-base font-semibold leading-6 text-white">{title}</h3>
        </div>
      )}
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
};

export default Card;
