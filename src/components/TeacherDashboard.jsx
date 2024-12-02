import React, { useState, useEffect } from "react";
import { FaBook, FaUsers, FaClipboardList, FaPlus } from "react-icons/fa";

function TeacherDashboard() {
  // Initialize state with data from localStorage (admin-created data)
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem("courses");
    return savedCourses ? JSON.parse(savedCourses) : [];
  });

  const [assignments, setAssignments] = useState(() => {
    const savedAssignments = localStorage.getItem("assignments");
    return savedAssignments ? JSON.parse(savedAssignments) : [];
  });

  const [teachers, setTeachers] = useState(() => {
    const savedTeachers = localStorage.getItem("teachers");
    return savedTeachers ? JSON.parse(savedTeachers) : [];
  });

  // State for modals
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  // State for new assignment/course
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
    course: "",
  });

  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    duration: "",
  });

  // Listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const savedCourses = localStorage.getItem("courses");
      const savedAssignments = localStorage.getItem("assignments");
      const savedTeachers = localStorage.getItem("teachers");

      if (savedCourses) setCourses(JSON.parse(savedCourses));
      if (savedAssignments) setAssignments(JSON.parse(savedAssignments));
      if (savedTeachers) setTeachers(JSON.parse(savedTeachers));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Handle assignment creation
  const handleAssignmentSubmit = (e) => {
    e.preventDefault();
    const assignment = {
      id: Date.now(),
      ...newAssignment,
      createdBy: "teacher",
    };
    const updatedAssignments = [...assignments, assignment];
    setAssignments(updatedAssignments);
    localStorage.setItem("assignments", JSON.stringify(updatedAssignments));
    setIsAssignmentModalOpen(false);
    setNewAssignment({ title: "", description: "", dueDate: "", course: "" });
  };

  // Handle course creation
  const handleCourseSubmit = (e) => {
    e.preventDefault();
    const course = {
      id: Date.now(),
      ...newCourse,
      createdBy: "teacher",
    };
    const updatedCourses = [...courses, course];
    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
    setIsCourseModalOpen(false);
    setNewCourse({ name: "", description: "", duration: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Teacher Dashboard</h1>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-500 text-white p-4 rounded-lg">
          <h3 className="text-lg">Total Courses</h3>
          <p className="text-2xl font-bold">{courses.length}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg">
          <h3 className="text-lg">Total Assignments</h3>
          <p className="text-2xl font-bold">{assignments.length}</p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded-lg">
          <h3 className="text-lg">Total Teachers</h3>
          <p className="text-2xl font-bold">{teachers.length}</p>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setIsAssignmentModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600"
        >
          <FaPlus /> Create Assignment
        </button>
        <button
          onClick={() => setIsCourseModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600"
        >
          <FaPlus /> Create Course
        </button>
      </div>

      {/* Courses Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">All Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">{course.name}</h3>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">{course.createdBy === "admin" ? "Added by Admin" : "Admin Created"}</span>
              </div>
              <p className="text-gray-600 text-sm mt-2">{course.description}</p>
              <p className="text-gray-500 text-sm mt-2">Duration: {course.duration}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Assignments Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Assignments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">{assignment.title}</h3>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {assignment.createdBy === "admin" ? "Added by Admin" : "Admin Created"}
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-2">{assignment.description}</p>
              <p className="text-gray-500 text-sm mt-2">Due: {assignment.dueDate}</p>
              <p className="text-gray-500 text-sm">Course: {assignment.course}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Assignment Modal */}
      {isAssignmentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create New Assignment</h2>
            <form onSubmit={handleAssignmentSubmit}>
              {/* ... assignment form fields ... */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Due Date</label>
                <input
                  type="date"
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Course</label>
                <select
                  value={newAssignment.course}
                  onChange={(e) => setNewAssignment({ ...newAssignment, course: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.name}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsAssignmentModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course Modal */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create New Course</h2>
            <form onSubmit={handleCourseSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Course Name</label>
                <input
                  type="text"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Duration</label>
                <input
                  type="text"
                  value={newCourse.duration}
                  onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="e.g., 8 weeks"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsCourseModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherDashboard;
