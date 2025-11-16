
import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../ui/Icon';
import type { IconName } from '../ui/Icon';

interface NavItemProps {
  to: string;
  icon: IconName;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
        isActive
          ? 'bg-primary-600 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`
    }
  >
    <Icon name={icon} className="mr-3 h-5 w-5" />
    <span>{label}</span>
  </NavLink>
);

const SidebarContent: React.FC = () => (
  <>
    <div className="flex items-center justify-center h-16 border-b border-gray-700 flex-shrink-0 px-4">
      <h1 className="text-2xl font-bold text-white tracking-wider">
        <span className="text-primary-400">MISSION</span>CTRL
      </h1>
    </div>
    <div className="flex-1 overflow-y-auto p-4">
      <nav className="flex flex-col space-y-2">
        <NavItem to="/dashboard" icon="dashboard" label="Dashboard" />
        <NavItem to="/users" icon="users" label="Users" />
        <NavItem to="/awards" icon="awards" label="Awards" />
        <NavItem to="/bans" icon="ban" label="Bans" />
        <NavItem to="/fixtures" icon="fixtures" label="Fixtures" />
        <NavItem to="/fixture-generation" icon="generate-fixtures" label="Generate Fixtures" />
        <NavItem to="/stats" icon="stats" label="Stats" />
      </nav>
    </div>
  </>
);

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Sidebar (Overlay) */}
      <div className={`fixed inset-0 z-40 flex lg:hidden transition-opacity ease-linear duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/60" aria-hidden="true" onClick={onClose}></div>
        
        {/* Panel */}
        <div className={`relative flex w-64 max-w-xs flex-1 flex-col bg-gray-800 border-r border-gray-700 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <Icon name="close" className="h-6 w-6" />
            </button>
          </div>
          <SidebarContent />
        </div>
      </div>

      {/* Desktop Sidebar (Static) */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex w-64 flex-col bg-gray-800 border-r border-gray-700">
           <SidebarContent />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
