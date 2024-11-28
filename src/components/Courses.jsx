import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingCourse, setEditingCourse] = useState(null);

  // Load courses from localStorage when component mounts
  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    setCourses(storedCourses);
  }, []);

  // Delete course
  const handleDelete = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      const updatedCourses = courses.filter(course => course.id !== courseId);
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      setCourses(updatedCourses);
    }
  };

  // Start editing course
  const handleEdit = (course) => {
    setEditingCourse(course);
  };

  // Update course
  const handleUpdate = (updatedCourse) => {
    const updatedCourses = courses.map(course => 
      course.id === updatedCourse.id ? updatedCourse : course
    );
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setCourses(updatedCourses);
    setEditingCourse(null);
  };

  // Edit form component
  const EditForm = ({ course, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState(course);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onUpdate(formData);
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">Edit Course</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Instructor</label>
              <input
                type="text"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Categories for filter
  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'development', name: 'Development' },
    { id: 'data', name: 'Data Science' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'design', name: 'Design' }
  ];

  // Filter courses based on search and category
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-8">
      {/* Header Section */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Courses</h1>
            <p className="text-gray-600">Discover our wide range of courses and start learning today</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              to="/courses/new"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              New Course
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg text-sm font-medium">
                  {course.price}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600">{course.category}</span>
                  <span className="text-sm text-gray-500">{course.level}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>👨‍🏫 {course.instructor}</span>
                  <span>👥 {course.students} students</span>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(course)}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                  <Link
                    to={`/courses/${course.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {editingCourse && (
          <EditForm
            course={editingCourse}
            onUpdate={handleUpdate}
            onCancel={() => setEditingCourse(null)}
          />
        )}

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;