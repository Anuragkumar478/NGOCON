import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);
  const toggleDropdown = () => setOpenDropdown(!openDropdown);

  const isActive = (path) =>
    location.pathname === path ? "text-white font-semibold" : "text-gray-300";

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-xl bg-black/60 border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex justify-between items-center h-14">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-white rounded-full w-9 h-9 flex items-center justify-center shadow-lg">
              <span className="text-lg">❤️</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              ImpactBridge
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg hover:bg-white/10 transition ${isActive("/")}`}
            >
              Home
            </Link>

            <Link
              to="/campaigns"
              className={`px-4 py-2 rounded-lg hover:bg-white/10 transition ${isActive("/campaigns")}`}
            >
              All Campaigns
            </Link>

            <Link
              to="/campaigns/create"
              className={`px-4 py-2 rounded-lg hover:bg-white/10 transition ${isActive("/campaigns/create")}`}
            >
              Create Campaign
            </Link>

            {/* ACCOUNT DROPDOWN */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="px-4 py-2 flex items-center gap-1 rounded-lg text-gray-300 hover:bg-white/10"
              >
                💝 <span>Account</span>
                <HiChevronDown
                  className={`w-4 h-4 transition ${openDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {openDropdown && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-xl rounded-lg p-2 z-50">
                  <Link
                    to="/donor/register"
                    className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                    onClick={() => setOpenDropdown(false)}
                  >
                    Register (Donor)
                  </Link>

                  <Link
                    to="/volunteer/register"
                    className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                    onClick={() => setOpenDropdown(false)}
                  >
                    Register (Volunteer)
                  </Link>

                  <Link
                    to="/ngos/register"
                    className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                    onClick={() => setOpenDropdown(false)}
                  >
                    Register (NGO)
                  </Link>

                  <Link
                    to="/login"
                    className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                    onClick={() => setOpenDropdown(false)}
                  >
                    Login
                  </Link>
                  
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10"
          >
            {isMobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="md:hidden bg-black/80 text-white rounded-xl p-4 mt-2 space-y-3">

            <Link
              to="/"
              onClick={() => setIsMobileOpen(false)}
              className="block px-4 py-3 rounded-lg hover:bg-white/10"
            >
              Home
            </Link>

            <Link
              to="/campaigns"
              onClick={() => setIsMobileOpen(false)}
              className="block px-4 py-3 rounded-lg hover:bg-white/10"
            >
              All Campaigns
            </Link>

            <Link
              to="/campaigns/create"
              onClick={() => setIsMobileOpen(false)}
              className="block px-4 py-3 rounded-lg hover:bg-white/10"
            >
              Create Campaign
            </Link>

            <p className="text-gray-400 font-semibold mt-4">Account</p>

            <Link
              to="/donor/register"
              onClick={() => setIsMobileOpen(false)}
              className="block px-4 py-2 rounded-lg hover:bg-white/10 ml-3"
            >
              Register (Donor)
            </Link>

            <Link
              to="/volunteer/register"
              onClick={() => setIsMobileOpen(false)}
              className="block px-4 py-2 rounded-lg hover:bg-white/10 ml-3"
            >
              Register (Volunteer)
            </Link>

            <Link
              to="/ngos/register"
              onClick={() => setIsMobileOpen(false)}
              className="block px-4 py-2 rounded-lg hover:bg-white/10 ml-3"
            >
              Register (NGO)
            </Link>

            <Link
              to="/login"
              onClick={() => setIsMobileOpen(false)}
              className="block px-4 py-2 rounded-lg hover:bg-white/10 ml-3"
            >
              Login
            </Link>
             

          </div>
        )}
      </div>
    </nav>
  );
}
