import React from 'react';
import { FaBook, FaUsers, FaClipboardList, FaCalendarAlt } from 'react-icons/fa';

function TeacherDashboard() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome, {currentUser?.fullName}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="My Courses"
          value="5"
          icon={<FaBook />}
          color="bg-blue-500"
        />
        <DashboardCard
          title="Students"
          value="120"
          icon={<FaUsers />}
          color="bg-green-500"
        />
        <DashboardCard
          title="Assignments"
          value="25"
          icon={<FaClipboardList />}
          color="bg-yellow-500"
        />
        <DashboardCard
          title="Schedule"
          value="8"
          icon={<FaCalendarAlt />}
          color="bg-purple-500"
        />
      </div>
    </div>
  );
}

const DashboardCard = ({ title, value, icon, color }) => (
  <div className={`${color} rounded-lg p-6 text-white`}>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm opacity-80">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div className="text-3xl opacity-80">{icon}</div>
    </div>
  </div>
);

export default TeacherDashboard;
