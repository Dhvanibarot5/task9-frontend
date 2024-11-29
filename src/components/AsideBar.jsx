import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaBook, 
  FaUsers, 
  FaChalkboardTeacher, 
  FaGraduationCap,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChartLine,
  FaUserGraduate
} from 'react-icons/fa';

function AsideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  
  const menuItems = [
    { path: '/admin/dashboard', name: 'Dashboard', icon: <FaHome /> },
    { path: '/admin/teachers', name: 'Manage Teachers', icon: <FaChalkboardTeacher /> },
    { path: '/admin/students', name: 'Manage Students', icon: <FaUserGraduate /> },
    { path: '/admin/courses', name: 'Manage Courses', icon: <FaBook /> },
    { path: '/admin/grades', name: 'Grade Management', icon: <FaGraduationCap /> },
    { path: '/admin/analytics', name: 'Analytics', icon: <FaChartLine /> },
    { path: '/admin/settings', name: 'Settings', icon: <FaCog /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  };

  return (
    <aside 
      className={`bg-gradient-to-b from-blue-600 to-blue-800 h-screen shadow-lg transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      } fixed left-0 top-0 z-50`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-blue-700">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-blue-700 text-white"
        >
          {isCollapsed ? <FaBars /> : <FaTimes />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="py-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 text-white hover:bg-blue-700 transition-colors ${
                  location.pathname === item.path ? 'bg-blue-700' : ''
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {!isCollapsed && (
                  <span className="ml-3">{item.name}</span>
                )}
                {location.pathname === item.path && !isCollapsed && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-700">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
          {!isCollapsed && (
            <div>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <FaUsers className="text-blue-600" />
              </div>
            </div>
          )}
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-blue-200">admin@example.com</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
            title="Logout"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default AsideBar;