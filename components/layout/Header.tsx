
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useRBAC } from '../../hooks/useRBAC';
import { ALL_USERS } from '../../auth/AuthContext';
import Select from '../ui/Select';
import Icon from '../ui/Icon';

interface HeaderProps {
  onOpenSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSidebar }) => {
  const { user, setUser } = useRBAC();
  const location = useLocation();

  const pageTitle = location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.slice(2);

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserKey = event.target.value;
    const selectedUser = ALL_USERS[selectedUserKey];
    if (selectedUser) {
      setUser(selectedUser);
    }
  };
  
  const currentUserKey = Object.keys(ALL_USERS).find(key => ALL_USERS[key].username === user.username);

  return (
    <header className="relative z-10 flex items-center justify-between h-16 px-4 sm:px-6 bg-gray-800 border-b border-gray-700 shrink-0">
      <div className="flex items-center">
        <button
          type="button"
          className="p-2 -ml-2 mr-2 text-gray-400 hover:text-white lg:hidden"
          onClick={onOpenSidebar}
          aria-label="Open sidebar"
        >
          <Icon name="menu" className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-semibold text-white hidden sm:block">{pageTitle}</h2>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <span className="text-sm text-gray-400 hidden md:block">Viewing as:</span>
        <Select value={currentUserKey || ''} onChange={handleRoleChange} className="w-36 sm:w-48">
            {Object.entries(ALL_USERS).map(([key, u]) => (
                <option key={key} value={key}>{u.username} ({u.roles[0]})</option>
            ))}
        </Select>
        <div className="text-sm">
          <div className="font-medium text-white">{user.username}</div>
          <div className="text-gray-400 hidden sm:block">{user.roles.join(', ')}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
