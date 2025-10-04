import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md px-6 py-3 fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1
          className="text-2xl font-extrabold text-white tracking-wide cursor-pointer hover:text-gray-200 transition-colors duration-200"
        >
          Arogya Hospital
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {!token && (
            <>
              <Link
                to="/register"
                className="text-white font-medium hover:text-yellow-300 transition duration-200"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="text-white font-medium hover:text-yellow-300 transition duration-200"
              >
                Login
              </Link>
            </>
          )}
          {token && (
            <>
              <Link
                to="/appointments"
                className="text-white font-medium hover:text-yellow-300 transition duration-200"
              >
                Appointments
              </Link>
              <Link
                to="/book"
                className="text-white font-medium hover:text-yellow-300 transition duration-200"
              >
                Book Appointment
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-lg p-4 flex flex-col gap-3 animate-slide-down">
          {!token && (
            <>
              <Link
                to="/register"
                className="text-white font-medium hover:text-yellow-300 transition duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
              <Link
                to="/login"
                className="text-white font-medium hover:text-yellow-300 transition duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            </>
          )}
          {token && (
            <>
              <Link
                to="/appointments"
                className="text-white font-medium hover:text-yellow-300 transition duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Appointments
              </Link>
              <Link
                to="/book"
                className="text-white font-medium hover:text-yellow-300 transition duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Book Appointment
              </Link>
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
