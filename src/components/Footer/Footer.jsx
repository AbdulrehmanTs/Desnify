import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaEnvelope, FaPhone } from "react-icons/fa";
import Logo from '../../assets/Header/Logo.svg';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-100 pt-20 mt-40 pb-6 relative">
      {/* Contact Card */}
      <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-white shadow-2xl rounded-lg border-[#6C6C72] flex flex-col sm:flex-row items-center justify-between w-[90%] max-w-[900px] min-h-24 px-6 py-4 text-center sm:text-left">
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <div className="bg-green-500 text-white p-3 rounded-full">
            <FaEnvelope size={20} />
          </div>
          <p className="text-gray-700 font-medium">info@youremail.com</p>
        </div>
        <div className="hidden sm:block border-l border-gray-300 h-10 mx-4"></div>
        <div className="flex items-center gap-2">
          <div className="bg-green-500 text-white p-3 rounded-full">
            <FaPhone size={20} />
          </div>
          <p className="text-gray-700 font-medium">+880 321 655 9985</p>
        </div>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-6 lg:px-20 text-gray-700 mt-20 sm:mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center sm:text-left">
          {/* Left Section - Logo & About */}
          <div>
            <img src={Logo} alt="Logo" className="mx-auto sm:mx-0 w-24" />
            <p className="mt-4 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra nunc ante velit vitae.
            </p>
            {/* Social Icons */}
            <div className="flex justify-center sm:justify-start gap-4 mt-4">
              <FaFacebookF className="text-green-600 hover:text-green-800 cursor-pointer" size={18} />
              <FaInstagram className="text-green-600 hover:text-green-800 cursor-pointer" size={18} />
              <FaTwitter className="text-green-600 hover:text-green-800 cursor-pointer" size={18} />
              <FaYoutube className="text-green-600 hover:text-green-800 cursor-pointer" size={18} />
            </div>
          </div>

          {/* Middle Section - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-green-700">QUICK LINK</h3>
            <ul className="mt-2 space-y-1">
              <Link to="/"><li className="hover:text-green-600 cursor-pointer">Home</li></Link>
              <Link to="/about"><li className="hover:text-green-600 cursor-pointer">About</li></Link>
              <Link to="/contact"><li className="hover:text-green-600 cursor-pointer">Contact</li></Link>
              <Link to="/products"><li className="hover:text-green-600 cursor-pointer">Products</li></Link>
              
              
              
              
            </ul>
          </div>

          {/* Right Section - Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-green-700">NEWS LETTER</h3>
            <p className="mt-2 text-sm">
              Subscribe to our newsletter to get our latest updates & news.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 border-t border-gray-300 pt-4 text-center text-sm">
          © Copyright {new Date().getFullYear()}. Ojjomedia. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
