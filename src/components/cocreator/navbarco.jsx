import React, { useState } from "react";
import { Menu, X, ChevronDown, Search } from "lucide-react";
// import { logout } from "../../api/authSlice";
import { useNavigate } from "react-router-dom";

const Navbarco = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const logout = () => {
    navigate("/login");
  };
  return (
    <nav className="bg-black px-6 py-3 flex items-center justify-between relative z-50 shadow-md">
      {/* Left: Placeholder Logo (NC) */}
      <div className="flex items-center space-x-2">
        <div className="w-9 h-9 bg-white text-black flex items-center justify-center rounded-lg font-bold text-base">
          NC
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="hidden md:flex items-center bg-gray-800 px-3 py-1.5 rounded-lg w-1/3 focus-within:ring-2 focus-within:ring-gray-400">
        <Search className="text-gray-300 mr-2" size={18} />
        <input
          type="text"
          placeholder="Search checklists, clients, or documents..."
          className="bg-transparent outline-none w-full text-sm text-gray-200 placeholder-gray-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Right: Links + Profile */}
      <div className="hidden md:flex items-center space-x-6 text-white font-medium relative">
        {/* HOME — now forces blue on hover */}
        <a
          href="#"
          className="text-white hover:text-blue-400! transition duration-200"
        >
          Home
        </a>

        {/* Profile */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            className="w-8 h-8 rounded-full border border-gray-600"
          />
          <span className="text-white font-medium">John Doe</span>
          <ChevronDown size={18} className="text-gray-300" />
        </div>

        {/* Profile Dropdown */}
        {profileOpen && (
          <div className="absolute right-0 top-12 w-48 bg-black rounded-lg shadow-lg border border-gray-700 p-2">
            <a
              href="#"
              className="block px-4 py-2 text-white hover:bg-gray-800 rounded-md"
            >
              Profile
            </a>
            <hr className="my-2 border-gray-700" />
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-800 rounded-md"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white hover:text-gray-300 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-black border-t border-gray-700 shadow-md md:hidden z-50">
          <div className="flex flex-col items-start px-6 py-4 space-y-3 text-white font-medium">
            {/* Mobile Search */}
            <div className="flex items-center bg-gray-800 px-3 py-2 rounded-lg w-full">
              <Search className="text-gray-300 mr-2" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none w-full text-sm text-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* HOME on Mobile */}
            <a
              href="#"
              className="text-white hover:text-blue-400! w-full transition"
            >
              Home
            </a>

            <hr className="w-full border-gray-700" />

            {/* Mobile Profile */}
            <div className="flex items-center space-x-2 mt-2">
              <img
                src="https://i.pravatar.cc/40"
                alt="User Avatar"
                className="w-8 h-8 rounded-full border border-gray-600"
              />
              <span className="text-white font-medium">John Doe</span>
            </div>

            <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition w-full text-center font-semibold">
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbarco;
