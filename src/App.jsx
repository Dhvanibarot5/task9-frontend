import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/courses" element={<div>Courses Page</div>} />
            <Route path="/students" element={<div>Students Page</div>} />
            <Route path="/teachers" element={<div>Teachers Page</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
