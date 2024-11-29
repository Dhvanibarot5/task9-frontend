import React, { useState, useEffect } from "react";

function TeacherAssignments({ onClose }) {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "JavaScript Basics Quiz",
      course: "Web Development",
      dueDate: "2024-03-25",
      status: "active",
      submissions: 15,
      totalStudents: 25,
    },
    {
      id: 2,
      title: "React Components Project",
      course: "React Fundamentals",
      dueDate: "2024-03-28",
      status: "draft",
      submissions: 0,
      totalStudents: 30,
    },
  ]);

  const [showNewAssignmentModal, setShowNewAssignmentModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    course: "",
    dueDate: "",
    description: "",
    status: "draft",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get existing assignments from localStorage
      const existingAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');
      
      // Create new assignment object
      const assignment = {
        ...newAssignment,
        id: Date.now(),
        submissions: 0,
        totalStudents: 0,
        status: newAssignment.status || 'draft',
        createdAt: new Date().toISOString()
      };
      
      // Save to localStorage
      localStorage.setItem('assignments', JSON.stringify([...existingAssignments, assignment]));
      
      // Update local state
      setAssignments(prev => [...prev, assignment]);
      
      // Close modal and reset form
      setShowNewAssignmentModal(false);
      setNewAssignment({
        title: '',
        course: '',
        dueDate: '',
        description: '',
        status: 'draft'
      });
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  // Load assignments from localStorage on component mount
  useEffect(() => {
    const savedAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    setAssignments(savedAssignments);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Assignments</h2>
        <button
          onClick={() => setShowNewAssignmentModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Assignment
        </button>
      </div>

      {/* Assignment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="text-blue-600 text-sm font-medium">Total Assignments</div>
          <div className="text-2xl font-bold text-blue-700">{assignments.length}</div>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <div className="text-green-600 text-sm font-medium">Active Assignments</div>
          <div className="text-2xl font-bold text-green-700">{assignments.filter((a) => a.status === "active").length}</div>
        </div>
        <div className="bg-purple-50 rounded-xl p-4">
          <div className="text-purple-600 text-sm font-medium">Pending Reviews</div>
          <div className="text-2xl font-bold text-purple-700">{assignments.reduce((acc, curr) => acc + curr.submissions, 0)}</div>
        </div>
      </div>

      {/* Assignments Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Assignment</th>
              <th className="text-left py-3 px-4">Course</th>
              <th className="text-left py-3 px-4">Due Date</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Submissions</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900">{assignment.title}</div>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">{assignment.course}</span>
                </td>
                <td className="py-3 px-4">{assignment.dueDate}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      assignment.status === "active" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <span className="font-medium">{assignment.submissions}</span>
                    <span className="text-gray-500 ml-1">/ {assignment.totalStudents}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-3">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">View</button>
                    <button className="text-gray-600 hover:text-gray-700 font-medium">Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Assignment Modal */}
      {showNewAssignmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Create New Assignment</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={newAssignment.course}
                  onChange={(e) => setNewAssignment({ ...newAssignment, course: e.target.value })}
                >
                  <option value="">Select Course</option>
                  <option value="Web Development">Web Development</option>
                  <option value="React Fundamentals">React Fundamentals</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewAssignmentModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherAssignments;
