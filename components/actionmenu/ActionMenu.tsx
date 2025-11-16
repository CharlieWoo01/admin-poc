
import React, { useState, useRef, useEffect } from 'react';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import Guard from '../../auth/Guard';
import type { Role } from '../../types';

export interface ActionItem {
  label: string;
  icon: 'edit' | 'delete' | 'view' | 'ban' | 'external-link';
  onClick: () => void;
  roles?: Role[];
  isDanger?: boolean;
}

interface ActionMenuProps {
  items: ActionItem[];
}

const ActionMenu: React.FC<ActionMenuProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleActionClick = (onClick: () => void) => {
    onClick();
    setIsOpen(false);
  };

  const visibleItems = items.filter(item => item.roles ? true : true); // Simplified, Guard handles visibility
  if (visibleItems.length === 0) return null;

  return (
    <div className="relative" ref={menuRef}>
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} aria-label="Open actions menu">
        <Icon name="dots" className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-700">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {items.map((item, index) => (
              <Guard key={index} roles={item.roles || []}>
                <button
                  onClick={() => handleActionClick(item.onClick)}
                  className={`flex items-center w-full px-4 py-2 text-sm text-left transition-colors ${
                    item.isDanger
                      ? 'text-red-400 hover:bg-red-900/50 hover:text-red-300'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  role="menuitem"
                >
                  <Icon name={item.icon} className="mr-3 h-5 w-5" />
                  {item.label}
                </button>
              </Guard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
