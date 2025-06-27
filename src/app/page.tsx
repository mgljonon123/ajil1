"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const commentsPerPage = 2; // 1 row × 2 columns

  // Sample comments data
  const comments = [
    { id: 1, name: "John Smith", role: "Security Manager", company: "TechCorp", comment: "Excellent security solutions. The AI detection is incredibly accurate.", rating: 5 },
    { id: 2, name: "Sarah Johnson", role: "IT Director", company: "GlobalBank", comment: "Professional service and reliable systems. Highly recommended.", rating: 5 },
    { id: 3, name: "Mike Chen", role: "Facility Manager", company: "RetailPlus", comment: "Great customer support and easy installation process.", rating: 4 },
    { id: 4, name: "Emily Davis", role: "Operations Lead", company: "Manufacturing Inc", comment: "The surveillance network has significantly improved our security.", rating: 5 },
    { id: 5, name: "David Wilson", role: "Security Consultant", company: "SecureTech", comment: "Top-notch biometric access control system.", rating: 5 },
    { id: 6, name: "Lisa Brown", role: "Property Manager", company: "RealEstate Co", comment: "Cost-effective solution with excellent features.", rating: 4 },
    { id: 7, name: "Robert Taylor", role: "CEO", company: "StartupXYZ", comment: "Perfect for our growing business needs.", rating: 5 },
    { id: 8, name: "Jennifer Lee", role: "Security Officer", company: "Hospital Group", comment: "Reliable and user-friendly interface.", rating: 4 },
    { id: 9, name: "Thomas Anderson", role: "IT Manager", company: "Education First", comment: "Great for campus security management.", rating: 5 },
    { id: 10, name: "Amanda White", role: "Facility Director", company: "Government Agency", comment: "Meets all our security compliance requirements.", rating: 5 },
    { id: 11, name: "Kevin Martinez", role: "Operations Manager", company: "Logistics Corp", comment: "Excellent integration with existing systems.", rating: 4 },
    { id: 12, name: "Rachel Green", role: "Security Specialist", company: "Financial Services", comment: "Advanced features with simple operation.", rating: 5 },
  ];

  // Calculate pagination
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  // Auto pagination effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev % totalPages) + 1);
    }, 5000); // Change page every 5 seconds

    return () => clearInterval(interval);
  }, [totalPages]);

  // Get current comments based on page
  const startIndex = (currentPage - 1) * commentsPerPage;
  const endIndex = startIndex + commentsPerPage;
  const currentComments = comments.slice(startIndex, endIndex);

  // Drag scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white py-16 px-4">
      <section className="w-full max-w-3xl text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900">
          We are a security company
        </h1>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {/* Camera Product Placeholder */}
          <div className="w-64 h-40 bg-black flex items-center justify-center rounded-lg shadow-md">
            <span className="text-gray-400 text-lg">Camera Product</span>
          </div>
          {/* Alarm Chip Placeholder */}
          <div className="w-64 h-40 bg-black flex items-center justify-center rounded-lg shadow-md">
            <span className="text-gray-400 text-lg">Alarm Chip</span>
          </div>
        </div>
      </section>

      {/* Project Section */}
      <section className="w-full max-w-6xl text-center mb-12 bg-blue-900 py-12 px-4 rounded-lg">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
          Our Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project 1 */}
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-500">Project Image 1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Smart Home Security System</h3>
            <p className="text-gray-600 mb-4">
              Complete home automation and security solution with AI-powered threat detection.
            </p>
            <div className="flex gap-2 justify-center">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">IoT</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">AI</span>
            </div>
          </div>

          {/* Project 2 */}
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-500">Project Image 2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Commercial Surveillance Network</h3>
            <p className="text-gray-600 mb-4">
              Enterprise-grade surveillance system for large commercial properties.
            </p>
            <div className="flex gap-2 justify-center">
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Enterprise</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Cloud</span>
            </div>
          </div>

          {/* Project 3 */}
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-500">Project Image 3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Access Control System</h3>
            <p className="text-gray-600 mb-4">
              Biometric and RFID-based access control for high-security facilities.
            </p>
            <div className="flex gap-2 justify-center">
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Biometric</span>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">RFID</span>
            </div>
          </div>
        </div>
      </section>

      {/* Comment Section */}
      <section className="w-full max-w-6xl text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
          What Our Clients Say
        </h2>
        
        {/* Scrollable Comments Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 mb-8 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ scrollBehavior: 'smooth' }}
        >
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow min-w-[400px] flex-shrink-0">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {comment.name.charAt(0)}
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900">{comment.name}</h4>
                  <p className="text-sm text-gray-600">{comment.role}</p>
                  <p className="text-sm text-gray-500">{comment.company}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < comment.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 text-sm italic">"{comment.comment}"</p>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentPage === index + 1
                  ? 'bg-blue-600'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            >
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">SecureTech Solutions</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Leading provider of advanced security solutions for homes and businesses. 
                We specialize in AI-powered surveillance, access control systems, and 
                comprehensive security management.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 2.567-1.645 0-2.879-2.245-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Services</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Projects</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">Our Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Surveillance Systems</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Access Control</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Alarm Systems</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">CCTV Installation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Security Consulting</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">24/7 Monitoring</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pt-8 border-t border-gray-700">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h5 className="font-semibold text-blue-400">Address</h5>
                <p className="text-gray-300 text-sm">123 Security Street<br />Tech District, TD 12345</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h5 className="font-semibold text-blue-400">Phone</h5>
                <p className="text-gray-300 text-sm">+1 (555) 123-4567<br />+1 (555) 987-6543</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h5 className="font-semibold text-blue-400">Email</h5>
                <p className="text-gray-300 text-sm">info@securetech.com<br />support@securetech.com</p>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2024 SecureTech Solutions. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Cookie Policy</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
