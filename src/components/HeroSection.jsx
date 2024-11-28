import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white z-0">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:20px_20px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Transform Your
                <span className="text-blue-600"> Educational Journey</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl">
                Empower your learning experience with our comprehensive education management system. 
                Connect with expert teachers, access quality courses, and track your progress.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
                >
                  Explore Courses
                  <svg
                    className="ml-2 -mr-1 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-300"
                >
                  Get Started Free
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <h4 className="text-4xl font-bold text-blue-600">500+</h4>
                  <p className="text-gray-600">Active Courses</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-blue-600">1000+</h4>
                  <p className="text-gray-600">Students</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-blue-600">50+</h4>
                  <p className="text-gray-600">Expert Teachers</p>
                </div>
              </div>
            </div>

            {/* Right Column - Image/Illustration */}
            <div className="relative lg:block">
              <div className="relative">
                {/* Main Image */}
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3"
                  alt="Students learning"
                  className="rounded-2xl shadow-2xl w-full object-cover"
                />
                
                {/* Floating Cards */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Trusted Platform</p>
                      <p className="text-xs text-gray-500">ISO Certified</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">24/7 Support</p>
                      <p className="text-xs text-gray-500">Always Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave Pattern */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-24 fill-current text-white"
            viewBox="0 0 1440 74"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M456.464 0.0433865C277.158 -1.70575 0 50.0141 0 50.0141V74H1440V50.0141C1440 50.0141 1320.4 31.1925 1243.09 27.0276C1099.33 19.2816 1019.08 53.1981 875.138 50.0141C710.527 46.3727 621.108 1.64949 456.464 0.0433865Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;