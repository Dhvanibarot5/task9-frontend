import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
    recentCourses: []
  });

  useEffect(() => {
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');
    const teachers = JSON.parse(localStorage.getItem('teachers') || '[]');
    const students = JSON.parse(localStorage.getItem('students') || '[]');

    const sortedCourses = [...courses].sort((a, b) => {
      const dateA = a.joinDate ? new Date(a.joinDate) : new Date(0);
      const dateB = b.joinDate ? new Date(b.joinDate) : new Date(0);
      return dateB - dateA;
    });

    const formattedRecentCourses = sortedCourses.slice(0, 5).map(course => ({
      id: course.id,
      title: course.title,
      instructor: course.instructor,
      category: course.category.charAt(0).toUpperCase() + course.category.slice(1),
      price: course.price.startsWith('$') ? course.price : `$${course.price}`,
      joinDate: course.joinDate
    }));

    setStats({
      totalStudents: students.length || 156,
      totalTeachers: teachers.length || 12,
      totalCourses: courses.length,
      recentCourses: formattedRecentCourses
    });
  }, []);

  const StatCard = ({ title, value, icon, bgColor, increase }) => (
    <div className={`${bgColor} rounded-2xl p-6 text-white transform transition-transform duration-300 hover:scale-105 hover:shadow-xl`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80 font-medium">{title}</p>
          <h3 className="text-3xl font-bold mt-2">{value}</h3>
          <p className="text-sm mt-2 opacity-80">
            <span className="text-green-300">↑ {increase}%</span> vs last month
          </p>
        </div>
        <div className="text-4xl opacity-90 bg-white/20 p-4 rounded-xl">{icon}</div>
      </div>
    </div>
  );

  const QuickActionCard = ({ title, icon, bgColor, to }) => (
    <Link
      to={to}
      className={`${bgColor} p-6 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg`}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header with Greeting */}
        <div className="mb-8 bg-white rounded-2xl p-6 shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, Admin! 👋
          </h1>
          <p className="text-gray-600">Here's what's happening with your platform today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            icon="👥"
            bgColor="bg-gradient-to-br from-blue-500 to-blue-700"
            increase="12"
          />
          <StatCard
            title="Total Teachers"
            value={stats.totalTeachers}
            icon="👨‍🏫"
            bgColor="bg-gradient-to-br from-green-500 to-green-700"
            increase="8"
          />
          <StatCard
            title="Total Courses"
            value={stats.totalCourses}
            icon="📚"
            bgColor="bg-gradient-to-br from-purple-500 to-purple-700"
            increase="15"
          />
          <StatCard
            title="Active Users"
            value="45"
            icon="🟢"
            bgColor="bg-gradient-to-br from-orange-500 to-orange-700"
            increase="5"
          />
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <QuickActionCard
                title="Add Course"
                icon="📝"
                bgColor="bg-blue-50 text-blue-700"
                to="/courses/new"
              />
              <QuickActionCard
                title="Manage Teachers"
                icon="👥"
                bgColor="bg-green-50 text-green-700"
                to="/teachers"
              />
              <QuickActionCard
                title="Manage Students"
                icon="🎓"
                bgColor="bg-purple-50 text-purple-700"
                to="/students"
              />
              <QuickActionCard
                title="Settings"
                icon="⚙️"
                bgColor="bg-gray-50 text-gray-700"
                to="/settings"
              />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Recent Activity</h2>
            <div className="space-y-6">
              {[
                { color: 'green', text: 'New student registration', time: '2m ago' },
                { color: 'blue', text: 'Course updated: Web Development', time: '1h ago' },
                { color: 'purple', text: 'New teacher approved', time: '3h ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className={`w-3 h-3 bg-${activity.color}-500 rounded-full mr-3`}></span>
                  <span className="text-gray-700 flex-grow">{activity.text}</span>
                  <span className="text-sm text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Courses */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Courses</h2>
            <Link 
              to="/courses" 
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              View all 
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-600">Course Name</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-600">Instructor</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-600">Category</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-600">Price</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentCourses.length > 0 ? (
                  stats.recentCourses.map((course) => (
                    <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">{course.title}</div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{course.instructor}</td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {course.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-900 font-medium">{course.price}</td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-3">
                          <Link
                            to={`/courses/${course.id}`}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            View
                          </Link>
                          <Link
                            to={`/courses/${course.id}/edit`}
                            className="text-gray-600 hover:text-gray-700 font-medium"
                          >
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p>No courses available yet</p>
                        <Link 
                          to="/courses/new" 
                          className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Add your first course
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;