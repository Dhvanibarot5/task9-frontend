import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TeacherDashboard() {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    activeClasses: 0,
    myCourses: []
  });

  const [recentActivities] = useState([
    { id: 1, type: 'assignment', message: 'New assignment submission in Web Development', time: '5m ago' },
    { id: 2, type: 'comment', message: 'Student question in React Basics', time: '30m ago' },
    { id: 3, type: 'enrollment', message: 'New student enrolled in JavaScript Course', time: '1h ago' },
  ]);

  useEffect(() => {
 
    const allCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    
    const teacherCourses = allCourses.filter(course => course.instructor === user.email);
    
    setStats({
      totalCourses: teacherCourses.length,
      totalStudents: teacherCourses.reduce((acc, course) => acc + course.students, 0),
      activeClasses: teacherCourses.length,
      myCourses: teacherCourses
    });
  }, []);

  const StatCard = ({ title, value, icon, bgColor }) => (
    <div className={`${bgColor} rounded-xl p-6 text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="text-3xl opacity-80">{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, Teacher</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="My Courses"
            value={stats.totalCourses}
            icon="📚"
            bgColor="bg-blue-600"
          />
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            icon="👥"
            bgColor="bg-green-600"
          />
          <StatCard
            title="Active Classes"
            value={stats.activeClasses}
            icon="🎓"
            bgColor="bg-purple-600"
          />
        </div>

        {/* Quick Actions and Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/courses/new"
                className="flex items-center justify-center p-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Create Course
              </Link>
              <Link
                to="/assignments"
                className="flex items-center justify-center p-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
              >
                Assignments
              </Link>
              <Link
                to="/grades"
                className="flex items-center justify-center p-4 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
              >
                Grade Center
              </Link>
              <Link
                to="/messages"
                className="flex items-center justify-center p-4 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors"
              >
                Messages
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-gray-600">{activity.message}</span>
                  <span className="ml-auto text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* My Courses */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">My Courses</h2>
            <Link to="/courses/new" className="text-blue-600 hover:text-blue-700">
              Create New Course →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Course Name</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Students</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stats.myCourses.map((course) => (
                  <tr key={course.id} className="border-b">
                    <td className="py-3 px-4">{course.title}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                        {course.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">{course.students}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                        Active
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Link
                          to={`/courses/${course.id}`}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => {/* Handle edit */}}
                          className="text-gray-600 hover:text-gray-700"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
