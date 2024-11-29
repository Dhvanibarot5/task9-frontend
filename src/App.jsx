import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Courses from "./components/Courses";
import NewCourses from "./components/NewCourses";
import Signin from "./components/Signin";
import AdminDashboard from "./components/AdminDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentDashboard from "./components/StudentDashboard";
import ManageTeacher from './components/ManageTeacher';
import ManageStudent from './components/ManageStudent';
import CourseDetails from './components/CourseDetails';
import EditCourse from './components/EditCourse';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/signin" element={<Signin />} />
            <Route
              path="/courses"
              element={
                <ProtectedRoute allowedRoles={["student", "teacher", "admin"]}>
                  <Courses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/new"
              element={
                <ProtectedRoute allowedRoles={["teacher", "admin"]}>
                  <NewCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/dashboard"
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teachers"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ManageTeacher />
                </ProtectedRoute>
              }
            />
            <Route
              path="/students"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ManageStudent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/unauthorized"
              element={
                <div className="text-center py-20">
                  <h2 className="text-2xl font-bold text-gray-900">Unauthorized Access</h2>
                  <p className="text-gray-600 mt-2">You don't have permission to access this page.</p>
                </div>
              }
            />
            <Route
              path="*"
              element={
                <div className="text-center py-20">
                  <h2 className="text-2xl font-bold text-gray-900">404 - Page Not Found</h2>
                  <p className="text-gray-600 mt-2">The page you're looking for doesn't exist.</p>
                </div>
              }
            />
            <Route
              path="/courses/new"
              element={
                <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                  <NewCourses />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/courses/:id" 
              element={
                <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                  <CourseDetails />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/courses/:id/edit" 
              element={
                <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                  <EditCourse />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
