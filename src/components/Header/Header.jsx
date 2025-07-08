import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/Header/Logo.svg";
import Cart from "../../assets/Header/Cart.svg";
import Wishlist from "../../assets/Header/Wishlist.svg";
import { FaBars } from "react-icons/fa";
import { User } from "lucide-react";
import { FaXmark } from "react-icons/fa6";
import { useCart } from "../../contexts/cartContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("r");
    if (token && role === "u") {
      setLogin(true);
    }
  }, []);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <header className="w-full mx-auto flex justify-between items-center px-4 md:px-24 py-5 mb-5 z-50 relative">
      {/* Logo */}
      <div>
        <Link to="/">
          <img src={Logo} width={80} height={38} alt="Logo" />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaXmark /> : <FaBars size={20} />}
      </button>

      {/* Navigation Links */}
      <nav
        className={`absolute top-20 left-0 md:top-1/2 md:left-1/2 md:-translate-1/2 w-full md:w-auto bg-white shadow-md md:shadow-none z-50 transition-all ${
          menuOpen ? "block" : "hidden"
        } md:flex`}
      >
        <ul className="flex flex-col md:flex-row items-center gap-6 font-[karla] text-[14px] p-5 md:p-0">
          {[
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: "Contact", path: "/contact" },
            { name: "About", path: "/about" },
          ].map(({ name, path }) => (
            <li key={path} className="cursor-pointer">
              <Link
                to={path}
                className={`relative cursor-pointer ${
                  location.pathname === path
                    ? "font-bold before:absolute before:-bottom-1 before:left-0 before:w-1/2 before:h-[2px] before:bg-green-500"
                    : "before:absolute before:-bottom-1 before:left-0 before:w-1/2 before:h-[2px] before:scale-0 hover:before:scale-100 before:bg-green-500 transition-transform duration-300 origin-left"
                }`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Cart, Wishlist & Authentication Buttons - Mobile */}
        <div
          className={`md:hidden flex flex-col h-32 items-center gap-4 mt-4 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex gap-4 cursor-pointer">
            <Link className="relative" to="/cart">
              <img src={Cart} width={21} height={20} alt="Cart" />
              {/* badge */}
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -left-2 text-xs text-white rounded-full size-4 bg-red-600 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link to="/wishlist">
              <img src={Wishlist} width={21} height={20} alt="Wishlist" />
            </Link>
          </div>
          {login ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="cursor-pointer  flex gap-2 items-center font-[Plus_Jakarta_Sans]"
              >
                <User />
              </button>
              {showDropdown && (
                <ul className="absolute bg-white shadow-md rounded-md mt-2 right-0 w-40 text-sm transition-all duration-200 ease-in-out z-50">
                  <li>
                    <Link
                      to="/account"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Terms
                    </Link>
                  </li>
                  <button
                    onClick={logout}
                    className="w-full text-start px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>
                </ul>
              )}
            </div>
          ) : (
            <div className="flex gap-4 font-[Plus_Jakarta_Sans] items-center">
              <Link to="/login">
                <button className="text-gray-700 cursor-pointer">Login</button>
              </Link>
              <Link to="/signup">
                <button className="bg-[#51BC74] py-2.5 px-5 rounded-md text-white cursor-pointer">
                  Signup
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Cart, Wishlist & Authentication Buttons - Desktop */}
      <div className="hidden md:flex gap-4 items-center relative">
        <div className="flex gap-4 cursor-pointer">
          <Link to="/cart">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 21 20"
                fill="none"
                className={`size-5 ${
                  location.pathname === "/cart"
                    ? "text-green-600"
                    : "text-[#2B2B2B]"
                }`}
              >
                <g clipPath="url(#clip0_4149_1345)">
                  <path
                    d="M20.691 4.35922C20.5037 4.033 20.2353 3.76115 19.9122 3.57018C19.5891 3.37921 19.2223 3.27564 18.8475 3.26957H4.96672L4.33774 0.806977C4.2742 0.569258 4.13242 0.360161 3.9355 0.213743C3.73858 0.0673251 3.49813 -0.00778743 3.25331 0.000639056H1.08444C0.796826 0.000639056 0.520995 0.115441 0.317624 0.319789C0.114253 0.524137 0 0.801292 0 1.09028C0 1.37928 0.114253 1.65643 0.317624 1.86078C0.520995 2.06513 0.796826 2.17993 1.08444 2.17993H2.42914L5.42218 13.3597C5.48573 13.5974 5.62751 13.8065 5.82442 13.9529C6.02134 14.0993 6.26179 14.1745 6.50661 14.166H16.2665C16.4668 14.1654 16.663 14.1091 16.8333 14.0033C17.0037 13.8975 17.1416 13.7464 17.2317 13.5667L20.7886 6.41865C20.9428 6.09395 21.0146 5.73595 20.9975 5.3766C20.9805 5.01725 20.8752 4.66773 20.691 4.35922ZM15.5942 11.9867H7.33079L5.56316 5.44887H18.8475L15.5942 11.9867Z"
                    className="fill-current"
                  />
                  <path
                    d="M5.8802 20C6.80803 20 7.5602 19.2538 7.5602 18.3333C7.5602 17.4128 6.80803 16.6667 5.8802 16.6667C4.95236 16.6667 4.2002 17.4128 4.2002 18.3333C4.2002 19.2538 4.95236 20 5.8802 20Z"
                    className="fill-current"
                  />
                  <path
                    d="M15.9598 20C16.8876 20 17.6398 19.2538 17.6398 18.3333C17.6398 17.4128 16.8876 16.6667 15.9598 16.6667C15.0319 16.6667 14.2798 17.4128 14.2798 18.3333C14.2798 19.2538 15.0319 20 15.9598 20Z"
                    className="fill-current"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4149_1345">
                    <rect width="21" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              {/* badge */}
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -left-2 text-xs text-white rounded-full size-4 bg-red-600 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </div>
          </Link>
          <Link to="/wishlist">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="none"
              className={`size-5 ${
                location.pathname === "/wishlist"
                  ? "text-green-600"
                  : "text-[#2B2B2B]"
              }`}
            >
              <path
                d="M5.83317 2.5C3.53234 2.5 1.6665 4.34667 1.6665 6.625C1.6665 8.46417 2.39567 12.8292 9.57317 17.2417C9.70174 17.3199 9.84934 17.3613 9.99984 17.3613C10.1503 17.3613 10.2979 17.3199 10.4265 17.2417C17.604 12.8292 18.3332 8.46417 18.3332 6.625C18.3332 4.34667 16.4673 2.5 14.1665 2.5C11.8657 2.5 9.99984 5 9.99984 5C9.99984 5 8.134 2.5 5.83317 2.5Z"
                className="stroke-current"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {login ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className=" cursor-pointer flex gap-2 items-center font-[Plus_Jakarta_Sans]"
            >
              <User />
            </button>
            {showDropdown && (
              <ul className="absolute bg-white shadow-md rounded-md mt-2 right-0 w-40 text-sm transition-all duration-200 ease-in-out z-50">
                <li>
                  <Link
                    to="/account"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Terms
                  </Link>
                </li>
                <button
                  onClick={logout}
                  className="w-full cursor-pointer text-start px-4 py-2 hover:bg-gray-100 text-red-500"
                >
                  Logout
                </button>
              </ul>
            )}
          </div>
        ) : (
          <div className="flex gap-4 font-[Plus_Jakarta_Sans] items-center">
            <Link to="/login">
              <button className="text-gray-700 cursor-pointer text-sm">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-green-600 hover:bg-green-600/80 text-sm py-1.5 px-5 rounded-md text-white cursor-pointer">
                Signup
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
