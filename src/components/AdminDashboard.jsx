import React from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaBook, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";

function AdminDashboard() {
  // Get counts from localStorage
  const teacherCount = JSON.parse(localStorage.getItem("teachers"))?.length || 0;
  const studentCount = JSON.parse(localStorage.getItem("students"))?.length || 0;
  const courseCount = JSON.parse(localStorage.getItem("courses"))?.length || 0;

  const stats = [
    {
      title: "Total Teachers",
      value: teacherCount,
      icon: <FaChalkboardTeacher className="text-3xl" />,
      color: "bg-blue-500",
      link: "/admin/teachers",
    },
    {
      title: "Total Students",
      value: studentCount,
      icon: <FaUserGraduate className="text-3xl" />,
      color: "bg-green-500",
      link: "/admin/students",
    },
    {
      title: "Total Courses",
      value: courseCount,
      icon: <FaBook className="text-3xl" />,
      color: "bg-yellow-500",
      link: "/admin/courses",
    },
    {
      title: "Analytics",
      value: "View",
      icon: <FaChartLine className="text-3xl" />,
      color: "bg-purple-500",
      link: "/admin/analytics",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link to={stat.link} key={index}>
            <div className={`${stat.color} rounded-lg p-6 text-white transition-transform hover:scale-105`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-80">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className="opacity-80">{stat.icon}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activities Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4">
            <p className="text-gray-600">No recent activities to display.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
