import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBook, FaUsers, FaClipboardList, FaCalendarAlt } from "react-icons/fa";

function TeacherDashboard() {
  const [dashboardData, setDashboardData] = useState({
    courses: 0,
    students: 0,
    assignments: 0,
    upcomingClasses: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - replace with actual API call
    const fetchDashboardData = async () => {
      try {
        // Replace with actual API endpoint
        // const response = await axios.get('/api/teacher/dashboard');
        // setDashboardData(response.data);

        // Simulated data
        setDashboardData({
          courses: 5,
          students: 120,
          assignments: 25,
          upcomingClasses: 8,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const dashboardCards = [
    {
      title: "My Courses",
      value: dashboardData.courses,
      icon: <FaBook />,
      color: "bg-blue-500",
      link: "/teacher/courses",
    },
    {
      title: "Students",
      value: dashboardData.students,
      icon: <FaUsers />,
      color: "bg-green-500",
      link: "/teacher/students",
    },
    {
      title: "Assignments",
      value: dashboardData.assignments,
      icon: <FaClipboardList />,
      color: "bg-yellow-500",
      link: "/teacher/assignments",
    },
    {
      title: "Upcoming Classes",
      value: dashboardData.upcomingClasses,
      icon: <FaCalendarAlt />,
      color: "bg-purple-500",
      link: "/teacher/schedule",
    },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Teacher Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardCards.map((card, index) => (
          <Link to={card.link} key={index}>
            <div className={`${card.color} rounded-lg p-6 text-white hover:opacity-90 transition-opacity`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-80">{card.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
                </div>
                <div className="text-3xl opacity-80">{card.icon}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="space-y-4">
            {/* Add recent activities here */}
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
              <div>
                <p className="font-medium">New Assignment Submitted</p>
                <p className="text-sm text-gray-500">John Doe submitted Assignment #3</p>
              </div>
              <span className="text-sm text-gray-400">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
              <div>
                <p className="font-medium">Course Update</p>
                <p className="text-sm text-gray-500">Mathematics 101 schedule updated</p>
              </div>
              <span className="text-sm text-gray-400">5 hours ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <Link to="/teacher/assignments/create" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Create Assignment
          </Link>
          <Link to="/teacher/courses/create" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
            Add New Course
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
