// src/components/Navbar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);

  const navigation = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "All Campaigns", path: "/campaigns", icon: "📋" },
    { name: "Create Campaign", path: "/campaigns/create", icon: "✨" },
  ];

  const authDropdown = [
    {
      name: "NGO",
      icon: "🏢",
      subLinks: [
        { name: "Register", path: "/ngos/register" },
        { name: "Login", path: "/ngos/login" },
      ],
    },
    {
      name: "Donor",
      icon: "💝",
      subLinks: [
        { name: "Register", path: "/donor/register" },
        { name: "Login", path: "/donor/login" },
      ],
    },
    {
      name: "Volunteer",
      icon: "👥",
      subLinks: [
        { name: "Register", path: "/volunteer/register" },
        { name: "Login", path: "/volunteer/login" },
      ],
    },
  ];

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const isActiveLink = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
              <span className="text-2xl">❤️</span>
            </div>
            <Link to="/" className="flex flex-col">
              <span className="text-xl font-bold tracking-tight">ImpactBridge</span>
              <span className="text-xs text-blue-100 -mt-1">Connecting Hearts</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActiveLink(link.path)
                    ? "bg-white/20 text-white shadow-inner"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="text-sm">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            ))}

            {/* Auth Dropdowns */}
            {authDropdown.map((item) => (
              <div key={item.name} className="relative">
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    openDropdown === item.name
                      ? "bg-white/20 text-white"
                      : "text-blue-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.name}</span>
                  <HiChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openDropdown === item.name ? "rotate-180" : ""
                    }`} 
                  />
                </button>

                {openDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fadeIn">
                    <div className="p-2">
                      {item.subLinks.map((sub, index) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                            index === 0 ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={() => setOpenDropdown(null)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              {isMobileOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 mt-2 mb-4 overflow-hidden animate-slideDown">
            {/* Navigation Links */}
            <div className="p-4 border-b border-white/20">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 mb-2 last:mb-0 ${
                    isActiveLink(link.path)
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>

            {/* Auth Sections */}
            <div className="p-4 space-y-4">
              {authDropdown.map((item) => (
                <div key={item.name} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg">{item.icon}</span>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  </div>
                  <div className="space-y-2">
                    {item.subLinks.map((sub, index) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        onClick={() => setIsMobileOpen(false)}
                        className={`block w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                          index === 0
                            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                        }`}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* App Info */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white text-center">
              <p className="text-sm font-medium">Make a Difference Today</p>
              <p className="text-xs opacity-90 mt-1">Join thousands making an impact</p>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for mobile menu */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </nav>
  );
}