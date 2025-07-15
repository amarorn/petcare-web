import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  UsersIcon,
  CalendarIcon,
  ShoppingBagIcon,
  CubeIcon,
  ClipboardListIcon,
  CogIcon,
  TruckIcon,
  UserGroupIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/outline';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';


const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useTheme();
  const { user } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: HomeIcon, access: ['ADMIN', 'STAFF'] },
    { name: 'Customers', path: '/customers', icon: UsersIcon, access: ['ADMIN', 'STAFF'] },
    { name: 'Pets', path: '/pets', icon: CubeIcon, access: ['ADMIN', 'STAFF'] },
    { name: 'Appointments', path: '/appointments', icon: CalendarIcon, access: ['ADMIN', 'STAFF'] },
    { name: 'Products', path: '/products', icon: ShoppingBagIcon, access: ['ADMIN', 'STAFF'] },
    { name: 'Services', path: '/services', icon: ClipboardListIcon, access: ['ADMIN', 'STAFF'] },
    { name: 'Orders', path: '/orders', icon: ShoppingBagIcon, access: ['ADMIN', 'STAFF'] },
    { name: 'Inventory', path: '/inventory', icon: CubeIcon, access: ['ADMIN'] },
    { name: 'Suppliers', path: '/suppliers', icon: TruckIcon, access: ['ADMIN'] },
    { name: 'Staff', path: '/staff', icon: UserGroupIcon, access: ['ADMIN'] },
    { name: 'Settings', path: '/settings', icon: CogIcon, access: ['ADMIN'] },
  ];

  return (
    <div 
      className={`${collapsed ? 'w-20' : 'w-64'} h-screen fixed top-0 left-0 transition-all duration-300 ease-in-out
                 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && (
          <h1 className="text-xl font-bold">Pet Shop</h1>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className={`p-2 rounded-full hover:bg-opacity-20 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
        >
          {collapsed ? <ChevronRightIcon className="h-5 w-5" /> : <ChevronLeftIcon className="h-5 w-5" />}
        </button>
      </div>
      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          {navItems
            .filter(item => !user || item.access.includes(user.role))
            .map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center p-3 rounded-lg transition-all duration-200
                    ${isActive ? 
                      (theme === 'dark' ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-800') : 
                      (theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100')
                    }
                  `}
                >
                  <item.icon className={`h-5 w-5 ${collapsed ? 'mx-auto' : 'mr-3'}`} />
                  {!collapsed && <span>{item.name}</span>}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;