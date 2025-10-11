// src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);

  const links = [
    { name: "Home", path: "/" },
    { name: "All Campaigns", path: "/campaigns" },
    { name: "Create Campaign", path: "/campaigns/create" },
  ];

  const authDropdown = [
    {
      name: "NGO",
      subLinks: [
        { name: "Register", path: "/ngos/register" },
        { name: "Login", path: "/ngos/login" },
      ],
    },
    {
      name: "Donor",
      subLinks: [
        { name: "Register", path: "/donor/register" },
        { name: "Login", path: "/donor/login" },
      ],
    },
    {
      name: "Volunteer",
      subLinks: [
        { name: "Register", path: "/volunteer/register" },
        { name: "Login", path: "/volunteer/login" },
      ],
    },
  ];

  // Toggle dropdown on click
  const toggleDropdown = (name) => {
    if (openDropdown === name) setOpenDropdown(null);
    else setOpenDropdown(name);
  };

  return (
    <nav className="bg-blue-800 text-white shadow-md px-6 py-4 fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">NGO Portal</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-yellow-400 transition-colors duration-300 font-medium"
            >
              {link.name}
            </Link>
          ))}

          {/* Clickable Dropdowns */}
          {authDropdown.map((item) => (
            <div key={item.name} className="relative">
              <button
                onClick={() => toggleDropdown(item.name)}
                className="cursor-pointer hover:text-yellow-400 transition font-medium"
              >
                {item.name} ▼
              </button>

              {openDropdown === item.name && (
                <div className="absolute top-full left-0 bg-white text-black mt-2 rounded shadow py-2 w-36 z-50">
                  {item.subLinks.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.path}
                      className="block px-4 py-2 hover:bg-gray-200"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden mt-4 bg-blue-700 p-4 rounded-lg flex flex-col space-y-3">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-yellow-400 transition-colors duration-300 font-medium"
              onClick={() => setIsMobileOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile dropdowns */}
          {authDropdown.map((item) => (
            <div key={item.name} className="flex flex-col">
              <p className="font-medium cursor-pointer hover:text-yellow-400">
                {item.name}
              </p>
              <div className="ml-4 flex flex-col space-y-1 mt-1">
                {item.subLinks.map((sub) => (
                  <Link
                    key={sub.name}
                    to={sub.path}
                    className="hover:text-yellow-400 transition font-medium"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
