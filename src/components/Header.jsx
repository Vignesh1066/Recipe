import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { FaHeart, FaBars, FaTimes, FaHome, FaSearch } from "react-icons/fa";
import logo from "../assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchClick = () => {
    setIsSearchVisible(true);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-blue-800 via-blue-700 to-blue-700 p-4 text-white shadow-md">
      <div className="w-full mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Recipe App Logo" className="w-auto h-12 mr-2" />
          <span className="text-xl font-bold text-white italic">Tasty</span>
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          <SearchBar />
          <Link
            to="/favorites"
            className="flex items-center bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-500 transition duration-300"
          >
            <FaHeart className="mr-2" /> Favorites
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-all duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`bg-blue-800 max-sm:w-full w-64 h-full p-4 text-white transition-all duration-300 ease-in-out transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-end">
            <button onClick={toggleMenu} className="text-white">
              <FaTimes size={30} />
            </button>
          </div>

          <ul className="space-y-6 mt-4">
            <li>
              <Link
                to="/"
                onClick={toggleMenu}
                className="flex items-center space-x-3 text-xl"
              >
                <FaHome /> <span>Home</span>
              </Link>
            </li>
            <li>
              <button
                onClick={handleSearchClick}
                className="flex items-center space-x-3 text-xl"
              >
                <FaSearch /> <span>Search</span>
              </button>
            </li>
            <li>
              <Link
                to="/favorites"
                onClick={toggleMenu}
                className="flex items-center space-x-3 text-xl"
              >
                <FaHeart /> <span>Favorites</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {isSearchVisible && (
        <div className="w-full flex justify-center mt-3">
          <SearchBar />
          <button
            onClick={() => setIsSearchVisible(false)}
            className="ml-2 text-red-500 text-sm font-semibold"
          >
            ✖
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
