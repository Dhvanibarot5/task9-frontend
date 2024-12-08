import React, { useState, useEffect } from "react";
import { FaBook, FaClipboardList, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

function TeacherDashboard() {
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem("courses");
    return savedCourses ? JSON.parse(savedCourses) : [];
  });

  const [assignments, setAssignments] = useState(() => {
    const savedAssignments = localStorage.getItem("assignments");
    return savedAssignments ? JSON.parse(savedAssignments) : [];
  });

  const [newCourse, setNewCourse] = useState({ id: "", name: "", description: "", duration: "" });
  const [newAssignment, setNewAssignment] = useState({ id: "", title: "", description: "", dueDate: "", course: "" });

  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingAssignment, setEditingAssignment] = useState(null);

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }, [courses, assignments]);

  const handleAddOrEditCourse = (e) => {
    e.preventDefault();
    if (editingCourse) {
      const updatedCourses = courses.map((course) => (course.id === editingCourse.id ? { ...course, ...newCourse } : course));
      setCourses(updatedCourses);
      setEditingCourse(null);
    } else {
      const courseToAdd = { id: Date.now(), ...newCourse };
      setCourses([...courses, courseToAdd]);
    }
    setNewCourse({ id: "", name: "", description: "", duration: "" });
    setIsCourseModalOpen(false);
  };

  const handleAddOrEditAssignment = (e) => {
    e.preventDefault();
    if (editingAssignment) {
      const updatedAssignments = assignments.map((assignment) =>
        assignment.id === editingAssignment.id ? { ...assignment, ...newAssignment } : assignment
      );
      setAssignments(updatedAssignments);
      setEditingAssignment(null);
    } else {
      const assignmentToAdd = { id: Date.now(), ...newAssignment };
      setAssignments([...assignments, assignmentToAdd]);
    }
    setNewAssignment({ id: "", title: "", description: "", dueDate: "", course: "" });
    setIsAssignmentModalOpen(false);
  };

  const handleDeleteCourse = (id) => {
    const updatedCourses = courses.filter((course) => course.id !== id);
    setCourses(updatedCourses);
  };

  const handleDeleteAssignment = (id) => {
    const updatedAssignments = assignments.filter((assignment) => assignment.id !== id);
    setAssignments(updatedAssignments);
  };

  const openEditCourseModal = (course) => {
    setNewCourse(course);
    setEditingCourse(course);
    setIsCourseModalOpen(true);
  };

  const openEditAssignmentModal = (assignment) => {
    setNewAssignment(assignment);
    setEditingAssignment(assignment);
    setIsAssignmentModalOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Teacher Dashboard</h1>

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
              <h3 className="font-semibold">{course.name}</h3>
              <p className="text-gray-600 text-sm mt-2">{course.description}</p>
              <p className="text-gray-500 text-sm mt-2">Duration: {course.duration}</p>
              <div className="flex justify-between mt-4">
                <button onClick={() => openEditCourseModal(course)} className="text-blue-500 hover:underline">
                  <FaEdit /> Edit
                </button>
                <button onClick={() => handleDeleteCourse(course.id)} className="text-red-500 hover:underline">
                  <FaTrash /> Delete
                </button>
              </div>
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
              <h3 className="font-semibold">{assignment.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{assignment.description}</p>
              <p className="text-gray-500 text-sm mt-2">Due: {assignment.dueDate}</p>
              <p className="text-gray-500 text-sm">Course: {assignment.course}</p>
              <div className="flex justify-between mt-4">
                <button onClick={() => openEditAssignmentModal(assignment)} className="text-blue-500 hover:underline">
                  <FaEdit /> Edit
                </button>
                <button onClick={() => handleDeleteAssignment(assignment.id)} className="text-red-500 hover:underline">
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Modal */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">{editingCourse ? "Edit Course" : "Create New Course"}</h2>
            <form onSubmit={handleAddOrEditCourse}>
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
                  {editingCourse ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assignment Modal */}
      {isAssignmentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">{editingAssignment ? "Edit Assignment" : "Create New Assignment"}</h2>
            <form onSubmit={handleAddOrEditAssignment}>
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
                <input
                  type="text"
                  value={newAssignment.course}
                  onChange={(e) => setNewAssignment({ ...newAssignment, course: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsAssignmentModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
                  {editingAssignment ? "Update" : "Create"}
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
