import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const courses = JSON.parse(localStorage.getItem("courses") || "[]");
    const course = courses.find((c) => c.id === parseInt(id));
    if (course) {
      setCourseData(course);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const courses = JSON.parse(localStorage.getItem("courses") || "[]");
    const updatedCourses = courses.map((course) => (course.id === parseInt(id) ? courseData : course));

    localStorage.setItem("courses", JSON.stringify(updatedCourses));
    navigate("/courses");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!courseData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Edit Course</h1>
            <button onClick={() => navigate(-1)} className="px-4 py-2 text-gray-600 hover:text-gray-900">
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Same form fields as CreateCourse component */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
              <input
                type="text"
                name="title"
                required
                value={courseData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Add other form fields similarly */}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCourse;
