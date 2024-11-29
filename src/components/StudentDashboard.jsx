import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function StudentDashboard() {
  const [stats, setStats] = useState({
    enrolledCourses: [],
    totalCourses: 0,
    completedCourses: 0,
    inProgressCourses: 0
  });

  const [recentActivities] = useState([
    { id: 1, type: 'course', message: 'Started Web Development Fundamentals', time: '2h ago' },
    { id: 2, type: 'assignment', message: 'Submitted React Assignment #3', time: '1d ago' },
    { id: 3, type: 'certificate', message: 'Earned JavaScript Basics Certificate', time: '3d ago' },
  ]);

  useEffect(() => {
 
    const allCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    
    const mockEnrolled = allCourses.slice(0, 3).map(course => ({
      ...course,
      progress: Math.floor(Math.random() * 100),
      status: Math.random() > 0.5 ? 'completed' : 'in-progress'
    }));
    
    setStats({
      enrolledCourses: mockEnrolled,
      totalCourses: mockEnrolled.length,
      completedCourses: mockEnrolled.filter(c => c.status === 'completed').length,
      inProgressCourses: mockEnrolled.filter(c => c.status === 'in-progress').length
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
    
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, Student</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Enrolled Courses"
            value={stats.totalCourses}
            icon="📚"
            bgColor="bg-blue-600"
          />
          <StatCard
            title="Completed"
            value={stats.completedCourses}
            icon="🎓"
            bgColor="bg-green-600"
          />
          <StatCard
            title="In Progress"
            value={stats.inProgressCourses}
            icon="🎯"
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
                to="/courses"
                className="flex items-center justify-center p-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Browse Courses
              </Link>
              <Link
                to="/assignments"
                className="flex items-center justify-center p-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
              >
                My Assignments
              </Link>
              <Link
                to="/certificates"
                className="flex items-center justify-center p-4 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
              >
                Certificates
              </Link>
              <Link
                to="/profile"
                className="flex items-center justify-center p-4 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors"
              >
                My Profile
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
            <Link to="/courses" className="text-blue-600 hover:text-blue-700">
              Browse More Courses →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.enrolledCourses.map((course) => (
              <div key={course.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-12 h-12 rounded object-cover mr-3"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-500">{course.instructor}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <Link
                  to={`/courses/${course.id}`}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Continue Learning →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;