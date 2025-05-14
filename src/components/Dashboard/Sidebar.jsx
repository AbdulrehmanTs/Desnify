import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/Header/Logo.svg";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { autoLogout, getToken } from "../../hooks/useAuth";
import { ApiBaseUrl } from "../../lib/utils";
import Spinner from "../loader/spinner";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ closeSidebar }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const token = getToken();
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch(ApiBaseUrl + "/product/getAllCategory", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setCategories(result.data);
        if (result.msg === "Session Expired") {
          autoLogout();
        }
        if (!response.ok) throw new Error("Network response was not ok");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, [token]);
  return (
    <aside className="w-64 bg-gray-100 p-4 min-h-screen relative">
      <div className="w-full flex justify-between items-center">
        <img src={Logo} alt="Logo" width={150} />
        {/* Close button for mobile */}
        {closeSidebar && (
          <button className="md:hidden" onClick={closeSidebar}>
            ✖️
          </button>
        )}
      </div>
      <nav className="mt-4 ">
        <ul className="space-y-2">
          <Link to="/dashboard">
            <li
              className={`${
                location.pathname === "/dashboard"
                  ? "bg-[#51BC74] text-white py-4 "
                  : ""
              }  p-2 rounded cursor-pointer uppercase font-medium text-sm tracking-wide leading-none font-[Rubik]`}
            >
              Dashboard
            </li>
          </Link>
          <Link to="/dashboard/all">
            <li
              className={`${
                location.pathname === "/dashboard/all"
                  ? "bg-[#51BC74] text-white py-4 "
                  : ""
              }  p-2 rounded cursor-pointer uppercase font-medium text-sm tracking-wide leading-none font-[Rubik]`}
            >
              All Products
            </li>
          </Link>
          <Link to="/dashboard/orderlist">
            <li
              className={`${
                location.pathname === "/dashboard/orderlist"
                  ? "bg-[#51BC74] text-white py-4 "
                  : ""
              }  p-2 rounded cursor-pointer uppercase font-medium text-sm tracking-wide leading-none font-[Rubik]`}
            >
              Order List
            </li>
          </Link>
          <Link to="/dashboard/ai-orderlist">
            <li
              className={`${
                location.pathname === "/dashboard/ai-orderlist"
                  ? "bg-[#51BC74] text-white py-4 "
                  : ""
              }  p-2 rounded cursor-pointer uppercase font-medium text-sm tracking-wide leading-none font-[Rubik]`}
            >
              AI Order List
            </li>
          </Link>
          <li>
            <button
              className="flex justify-between cursor-pointer items-center w-full p-2 font-[Rubik] font-semibold text-[20px] leading-[100%] tracking-[0px] text-[#232321]"
              onClick={() => setIsOpen(!isOpen)}
            >
              Categories {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {isOpen && loading ? (
              <Spinner />
            ) : isOpen && error ? (
              <p className="text-red-500 text-sm text-center ">{error}</p>
            ) : (
              isOpen && (
                <ul className="pl-4 space-y-4 mt-4">
                  {categories?.map((item) => (
                    <li
                      key={item?._id}
                      className="flex justify-between cursor-pointer items-center text-[#232321] font-[Open_Sans] font-semibold text-[16px] leading-[100%] tracking-[0px]"
                    >
                      {item?.categoryName}{" "}
                      <span className="bg-gray-300 text-gray-700 text-sm px-2 py-1 rounded">
                        {item?.__v}
                      </span>
                    </li>
                  ))}
                </ul>
              )
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
