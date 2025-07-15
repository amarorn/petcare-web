import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useTheme } from '../../context/ThemeContext';

const Layout: React.FC = () => {
  const { theme } = useTheme();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Desktop Sidebar */}
      <div className="hidden sm:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {showMobileSidebar && (
        <div className="sm:hidden fixed inset-0 z-40">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleMobileSidebar}></div>
          <div className="relative z-50">
            <Sidebar />
          </div>
        </div>
      )}

      <Header toggleMobileSidebar={toggleMobileSidebar} />

      <main className="pt-16 sm:ml-64 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;