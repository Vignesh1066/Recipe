import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-6 mt-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        
        <div>
          <h2 className="text-2xl font-bold text-yellow-500">Tasty Recipes</h2>
          <p className="text-sm text-gray-400 mt-2">Discover, Cook, and Enjoy the Best Recipes!</p>
        </div>

        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-yellow-400 transition duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-yellow-400 transition duration-300">Terms of Service</a>
          <a href="#" className="hover:text-yellow-400 transition duration-300">Contact Us</a>
        </div>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-yellow-400 transition duration-300">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-yellow-400 transition duration-300">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-yellow-400 transition duration-300">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-yellow-400 transition duration-300">
            <FaYoutube size={20} />
          </a>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 pt-4 text-gray-500 text-sm text-center">
        &copy; {new Date().getFullYear()} Tasty Recipes. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
