import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Courses from "./components/Courses";
import NewCourses from "./components/NewCourses";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/new" element={<NewCourses />} />
            <Route path="/courses/:id" element={<div>Course Details Page</div>} />
            <Route path="/students" element={<div>Students Page</div>} />
            <Route path="/teachers" element={<div>Teachers Page</div>} />
            <Route path="*" element={
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-900">404 - Page Not Found</h2>
                <p className="text-gray-600 mt-2">The page you're looking for doesn't exist.</p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
