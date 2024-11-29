import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter } from "react-icons/fa";

function GradeManagement() {
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [formData, setFormData] = useState({
    id: '',
    studentId: '',
    courseId: '',
    grade: '',
    remarks: '',
    submissionDate: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Load data when component mounts
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const savedGrades = JSON.parse(localStorage.getItem('grades') || '[]');
    const savedStudents = JSON.parse(localStorage.getItem('students') || '[]');
    const savedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    setGrades(savedGrades);
    setStudents(savedStudents);
    setCourses(savedCourses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      const newGrade = {
        ...formData,
        id: isEditing ? formData.id : Date.now().toString(),
        submissionDate: new Date().toISOString()
      };

      let updatedGrades;
      if (isEditing) {
        updatedGrades = grades.map(grade => 
          grade.id === formData.id ? newGrade : grade
        );
      } else {
        updatedGrades = [...grades, newGrade];
      }
      
      localStorage.setItem('grades', JSON.stringify(updatedGrades));
      setGrades(updatedGrades);
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving grade:', error);
      alert('Error saving grade. Please try again.');
    }
  };

  const handleEdit = (grade) => {
    setFormData(grade);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this grade?')) {
      try {
        const updatedGrades = grades.filter(grade => grade.id !== id);
        localStorage.setItem('grades', JSON.stringify(updatedGrades));
        setGrades(updatedGrades);
      } catch (error) {
        console.error('Error deleting grade:', error);
        alert('Error deleting grade. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      studentId: '',
      courseId: '',
      grade: '',
      remarks: '',
      submissionDate: ''
    });
    setIsEditing(false);
  };

  const getStudentName = (studentId) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.name : 'Unknown Student';
  };

  const getCourseName = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.title : 'Unknown Course';
  };

  const getGradeColor = (grade) => {
    const numGrade = parseFloat(grade);
    if (numGrade >= 90) return 'text-green-600';
    if (numGrade >= 80) return 'text-blue-600';
    if (numGrade >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredGrades = grades.filter(grade => {
    const studentName = getStudentName(grade.studentId).toLowerCase();
    const courseName = getCourseName(grade.courseId).toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    
    return (
      (studentName.includes(searchLower) || courseName.includes(searchLower)) &&
      (filterCourse === "" || grade.courseId === filterCourse)
    );
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Grade Management</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <FaPlus /> Add Grade
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by student or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="sm:w-64">
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All Courses</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grades Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredGrades.map((grade) => (
              <tr key={grade.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{getStudentName(grade.studentId)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getCourseName(grade.courseId)}</td>
                <td className={`px-6 py-4 whitespace-nowrap font-semibold ${getGradeColor(grade.grade)}`}>
                  {grade.grade}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{grade.remarks}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(grade.submissionDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(grade)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(grade.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? 'Edit Grade' : 'Add New Grade'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Student</label>
                <select
                  value={formData.studentId}
                  onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Student</option>
                  {students.map(student => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Course</label>
                <select
                  value={formData.courseId}
                  onChange={(e) => setFormData({...formData, courseId: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Grade (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.grade}
                  onChange={(e) => setFormData({...formData, grade: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Remarks</label>
                <textarea
                  value={formData.remarks}
                  onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  rows="3"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {isEditing ? 'Update' : 'Add'} Grade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GradeManagement;
