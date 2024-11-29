import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/Signin";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./components/AdminDashboard";
import TeacherManagement from "./components/TeacherManagement";
import StudentManagement from "./components/StudentManagement";
import TeacherLayout from "./components/TeacherLayout";
import StudentLayout from "./components/StudentLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import CourseManagement from "./components/CourseManagement";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="teachers" element={<TeacherManagement />} />
          <Route path="students" element={<StudentManagement />} />
          <Route path="courses" element={<CourseManagement />} />
        </Route>

        {/* Teacher Routes */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute role="teacher">
              <TeacherLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
        </Route>

        {/* Student Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
        </Route>

        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;
