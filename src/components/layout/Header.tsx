import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { MoonIcon, SunIcon, BellIcon, UserCircleIcon, MenuIcon } from '@heroicons/react/outline';

interface HeaderProps {
  toggleMobileSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMobileSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  
  const isDark = theme === 'dark';
  
  return (
    <header className={`fixed top-0 right-0 left-0 h-16 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} shadow z-10 ml-0 sm:ml-64`}>
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center">
          <button 
            onClick={toggleMobileSidebar}
            className="block sm:hidden p-2 rounded-md mr-2"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold">Pet Shop Management</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
          
          <button 
            className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
            aria-label="Notifications"
          >
            <BellIcon className="h-5 w-5" />
          </button>
          
          <div className="relative">
            <div className="group inline-block">
              <button className="flex items-center space-x-2 focus:outline-none">
                <UserCircleIcon className="h-6 w-6" />
                <span className="hidden md:block">{user?.name || 'User'}</span>
              </button>
              <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-10 hidden group-hover:block
                              ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <a href="/profile" className={`block px-4 py-2 text-sm ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                  Your Profile
                </a>
                <a href="/settings" className={`block px-4 py-2 text-sm ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                  Settings
                </a>
                <button 
                  onClick={logout}
                  className={`block w-full text-left px-4 py-2 text-sm ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;