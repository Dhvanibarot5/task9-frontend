import React, { useState, useEffect } from 'react';
import { 
  FaUsers, 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaBook,
  FaChartLine 
} from 'react-icons/fa';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

function Analytics() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
    averageGrade: 0,
    courseDistribution: [],
    gradesTrend: [],
    studentPerformance: []
  });

  useEffect(() => {
    calculateStats();
  }, []);

  const calculateStats = () => {
    // Get data from localStorage
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const teachers = JSON.parse(localStorage.getItem('teachers') || '[]');
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');
    const grades = JSON.parse(localStorage.getItem('grades') || '[]');

    // Calculate average grade
    const averageGrade = grades.length 
      ? grades.reduce((acc, curr) => acc + Number(curr.grade), 0) / grades.length 
      : 0;

    // Calculate course distribution
    const courseDistribution = courses.map(course => ({
      name: course.title,
      students: grades.filter(grade => grade.courseId === course.id).length
    }));

    // Calculate grades trend (last 6 months)
    const gradesTrend = calculateGradesTrend(grades);

    // Calculate student performance
    const studentPerformance = calculateStudentPerformance(grades, students);

    setStats({
      totalStudents: students.length,
      totalTeachers: teachers.length,
      totalCourses: courses.length,
      averageGrade: averageGrade.toFixed(1),
      courseDistribution,
      gradesTrend,
      studentPerformance
    });
  };

  const calculateGradesTrend = (grades) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const monthIndex = (currentMonth - i + 12) % 12;
      return months[monthIndex];
    }).reverse();

    return last6Months.map(month => ({
      name: month,
      average: (Math.random() * 30 + 70).toFixed(1) // Simulated data - replace with real calculation
    }));
  };

  const calculateStudentPerformance = (grades, students) => {
    return students.slice(0, 5).map(student => ({
      name: student.name,
      average: (Math.random() * 30 + 70).toFixed(1) // Simulated data - replace with real calculation
    }));
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={<FaUserGraduate />}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Teachers"
          value={stats.totalTeachers}
          icon={<FaChalkboardTeacher />}
          color="bg-green-500"
        />
        <StatCard
          title="Total Courses"
          value={stats.totalCourses}
          icon={<FaBook />}
          color="bg-yellow-500"
        />
        <StatCard
          title="Average Grade"
          value={`${stats.averageGrade}%`}
          icon={<FaChartLine />}
          color="bg-purple-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Grades Trend */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Grades Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.gradesTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="average" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="Average Grade"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Course Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.courseDistribution}
                  dataKey="students"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {stats.courseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Student Performance */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Top Student Performance</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.studentPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="average" 
                fill="#8884d8" 
                name="Average Grade"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, icon, color }) {
  return (
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
}

export default Analytics;
