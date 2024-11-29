import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaBook, FaUser, FaClock } from "react-icons/fa";

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    instructor: '',
    duration: '',
    capacity: '',
    startDate: '',
    category: '',
    status: 'active'
  });
  const [isEditing, setIsEditing] = useState(false);

  // Load courses when component mounts
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    const savedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    setCourses(savedCourses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      const newCourse = {
        ...formData,
        id: isEditing ? formData.id : Date.now().toString(),
        enrolledStudents: isEditing ? formData.enrolledStudents : 0,
        createdAt: isEditing ? formData.createdAt : new Date().toISOString()
      };

      let updatedCourses;
      if (isEditing) {
        updatedCourses = courses.map(course => 
          course.id === formData.id ? newCourse : course
        );
      } else {
        updatedCourses = [...courses, newCourse];
      }
      
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      setCourses(updatedCourses);
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Error saving course. Please try again.');
    }
  };

  const handleEdit = (course) => {
    setFormData({
      ...course,
      startDate: course.startDate ? course.startDate.split('T')[0] : ''
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        const updatedCourses = courses.filter(course => course.id !== id);
        localStorage.setItem('courses', JSON.stringify(updatedCourses));
        setCourses(updatedCourses);
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('Error deleting course. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      instructor: '',
      duration: '',
      capacity: '',
      startDate: '',
      category: '',
      status: 'active'
    });
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <FaPlus /> Add Course
        </button>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className={`h-2 rounded-t-lg ${course.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">{course.description}</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <FaUser className="mr-2" />
                  <span>Instructor: {course.instructor}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaClock className="mr-2" />
                  <span>Duration: {course.duration}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaBook className="mr-2" />
                  <span>Category: {course.category}</span>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Capacity: {course.enrolledStudents || 0}/{course.capacity}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  course.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {course.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? 'Edit Course' : 'Add New Course'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Instructor</label>
                <input
                  type="text"
                  value={formData.instructor}
                  onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Capacity</label>
                  <input
                    type="text"
                    value={formData.capacity}
                    onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {isEditing ? 'Save Changes' : 'Add Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseManagement;
