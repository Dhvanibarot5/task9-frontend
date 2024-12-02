import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TeacherDashboard from "./TeacherDashboard";
import TeacherSidebar from "./components/TeacherSidebar";
import StudentManagement from "./StudentManagement";
import CourseManagement from "./CourseManagement";
import AssignmentManagement from "./AssignmentManagement";
import GradeManagement from "./GradeManagement";

function TeacherPortal() {
  return (
    <div className="flex">
      <TeacherSidebar />
      <div className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="students" element={<StudentManagement />} />
          <Route path="courses" element={<CourseManagement />} />
          <Route path="assignments" element={<AssignmentManagement />} />
          <Route path="grades" element={<GradeManagement />} />
        </Routes>
      </div>
    </div>
  );
}

export default TeacherPortal;
