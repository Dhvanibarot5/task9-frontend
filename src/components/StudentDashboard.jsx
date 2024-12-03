import React, { useState, useEffect } from "react";
import { FaBook, FaClipboardList, FaGraduationCap } from "react-icons/fa";

function StudentDashboard() {
  // State for active tab
  const [activeTab, setActiveTab] = useState("dashboard");

  // Initialize states with data from localStorage
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem("courses");
    return savedCourses ? JSON.parse(savedCourses) : [];
  });

  const [assignments, setAssignments] = useState(() => {
    const savedAssignments = localStorage.getItem("assignments");
    return savedAssignments ? JSON.parse(savedAssignments) : [];
  });

  const [grades, setGrades] = useState(() => {
    const savedGrades = localStorage.getItem("grades");
    return savedGrades ? JSON.parse(savedGrades) : [];
  });

  // State for submitted assignments
  const [submittedAssignments, setSubmittedAssignments] = useState(() => {
    const saved = localStorage.getItem("submittedAssignments");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const savedCourses = localStorage.getItem("courses");
      const savedAssignments = localStorage.getItem("assignments");
      const savedGrades = localStorage.getItem("grades");

      if (savedCourses) setCourses(JSON.parse(savedCourses));
      if (savedAssignments) setAssignments(JSON.parse(savedAssignments));
      if (savedGrades) setGrades(JSON.parse(savedGrades));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleSubmitAssignment = (assignmentId) => {
    const newSubmission = {
      assignmentId,
      submittedAt: new Date().toISOString(),
      status: "submitted",
    };

    const updatedSubmissions = [...submittedAssignments, newSubmission];
    setSubmittedAssignments(updatedSubmissions);
    localStorage.setItem("submittedAssignments", JSON.stringify(updatedSubmissions));
  };

  const isAssignmentSubmitted = (assignmentId) => {
    return submittedAssignments.some((sub) => sub.assignmentId === assignmentId);
  };

  // Tab components
  const DashboardContent = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-500 text-white p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg">My Courses</h3>
              <p className="text-2xl font-bold">{courses.length}</p>
            </div>
            <FaBook className="text-3xl opacity-80" />
          </div>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg">Pending Assignments</h3>
              <p className="text-2xl font-bold">{assignments.length - submittedAssignments.length}</p>
            </div>
            <FaClipboardList className="text-3xl opacity-80" />
          </div>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg">Average Grade</h3>
              <p className="text-2xl font-bold">
                {grades.length > 0 ? Math.round(grades.reduce((acc, curr) => acc + curr.score, 0) / grades.length) : "N/A"}
              </p>
            </div>
            <FaGraduationCap className="text-3xl opacity-80" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Recent Assignments</h3>
          {assignments.slice(0, 3).map((assignment) => (
            <div key={assignment.id} className="mb-3 pb-3 border-b">
              <p className="font-medium">{assignment.title}</p>
              <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Recent Grades</h3>
          {grades.slice(0, 3).map((grade) => (
            <div key={grade.id} className="mb-3 pb-3 border-b">
              <p className="font-medium">{grade.assignmentTitle}</p>
              <p className="text-sm text-gray-500">Score: {grade.score}%</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const MyCoursesContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course) => (
        <div key={course.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">{course.name || course.courseName}</h3>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">{course.createdBy || "Admin"}</span>
          </div>
          <p className="text-gray-600 text-sm mt-2">{course.description}</p>
          <p className="text-gray-500 text-sm mt-2">Duration: {course.duration}</p>
          <div className="mt-4">
            <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">View Details</button>
          </div>
        </div>
      ))}
    </div>
  );

  const AssignmentsContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {assignments.map((assignment) => (
        <div key={assignment.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">{assignment.title}</h3>
            <span
              className={`text-xs px-2 py-1 rounded ${
                isAssignmentSubmitted(assignment.id) ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {isAssignmentSubmitted(assignment.id) ? "Submitted" : "Pending"}
            </span>
          </div>
          <p className="text-gray-600 text-sm mt-2">{assignment.description}</p>
          <p className="text-gray-500 text-sm mt-2">Due: {assignment.dueDate}</p>
          <p className="text-gray-500 text-sm">Course: {assignment.course}</p>

          {!isAssignmentSubmitted(assignment.id) && (
            <button
              onClick={() => handleSubmitAssignment(assignment.id)}
              className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Submit Assignment
            </button>
          )}
        </div>
      ))}
    </div>
  );

  const GradesContent = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">My Grades</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Assignment</th>
                <th className="px-4 py-2 text-left">Course</th>
                <th className="px-4 py-2 text-left">Score</th>
                <th className="px-4 py-2 text-left">Grade</th>
                <th className="px-4 py-2 text-left">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade) => (
                <tr key={grade.id} className="border-t">
                  <td className="px-4 py-2">{grade.assignmentTitle}</td>
                  <td className="px-4 py-2">{grade.course}</td>
                  <td className="px-4 py-2">{grade.score}%</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        grade.score >= 90
                          ? "bg-green-100 text-green-800"
                          : grade.score >= 80
                          ? "bg-blue-100 text-blue-800"
                          : grade.score >= 70
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {grade.score >= 90 ? "A" : grade.score >= 80 ? "B" : grade.score >= 70 ? "C" : "D"}
                    </span>
                  </td>
                  <td className="px-4 py-2">{grade.feedback || "No feedback yet"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`px-4 py-2 rounded-lg ${activeTab === "dashboard" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab("courses")}
          className={`px-4 py-2 rounded-lg ${activeTab === "courses" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
        >
          My Courses
        </button>
        <button
          onClick={() => setActiveTab("assignments")}
          className={`px-4 py-2 rounded-lg ${activeTab === "assignments" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
        >
          Assignments
        </button>
        <button
          onClick={() => setActiveTab("grades")}
          className={`px-4 py-2 rounded-lg ${activeTab === "grades" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
        >
          Grades
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === "dashboard" && <DashboardContent />}
      {activeTab === "courses" && <MyCoursesContent />}
      {activeTab === "assignments" && <AssignmentsContent />}
      {activeTab === "grades" && <GradesContent />}
    </div>
  );
}

export default StudentDashboard;
