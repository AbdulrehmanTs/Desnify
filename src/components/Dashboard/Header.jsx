import { useState, useRef, useEffect } from "react";
import { Bell, Search, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [displaySearch, setDisplaySearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center flex-wrap gap-2 p-4 bg-white shadow">
      <div className="flex items-center gap-2">
        {/* Logo or left content */}
      </div>

      <div className="flex items-center gap-4 flex-wrap relative">
        <Search
          onClick={() => setDisplaySearch(!displaySearch)}
          size={20}
          className="cursor-pointer hover:text-blue-500 transition duration-200"
        />

        {displaySearch && (
          <input
            type="text"
            placeholder="Search..."
            className="border p-1 rounded w-full sm:w-auto transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300"
          />
        )}

        <Bell
          size={24}
          className="cursor-pointer hover:text-blue-500 transition duration-200"
        />

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="border border-[#1C1C1A] py-2 px-4 flex items-center gap-1 rounded-[8px] hover:bg-gray-100 transition duration-200"
          >
            Admin{" "}
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown menu */}
          <div
            className={`absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10 overflow-hidden transition-all duration-300 ease-in-out transform ${
              showDropdown
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
