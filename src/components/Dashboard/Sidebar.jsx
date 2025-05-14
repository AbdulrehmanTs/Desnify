import  { useState,  } from 'react'
import { useLocation } from 'react-router-dom';
import Logo from '../../assets/Header/Logo.svg'
import { FaChevronDown, FaChevronUp } from "react-icons/fa";



const Sidebar = ({ closeSidebar }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  return (
    <aside className="w-64 bg-gray-100 p-4 min-h-screen relative">
      <div className='w-full flex justify-between items-center'>
        <img src={Logo} alt="Logo" width={150} />
        {/* Close button for mobile */}
        {closeSidebar && (
          <button className="md:hidden" onClick={closeSidebar}>✖️</button>
        )}
      </div>
      <nav className="mt-4 ">
        <ul className='space-y-2'>
          <a href="/dashboard"><li   className={`${location.pathname === '/dashboard' ? 'bg-[#51BC74] text-white py-4 ' : ''}  p-2 rounded cursor-pointer uppercase font-medium text-sm tracking-wide leading-none font-[Rubik]`}>
            Dashboard
          </li></a>
          <a href="/dashboard/all">
          <li className={`${location.pathname === '/dashboard/all' ? 'bg-[#51BC74] text-white py-4 ' : ''}  p-2 rounded cursor-pointer uppercase font-medium text-sm tracking-wide leading-none font-[Rubik]`}>All Products</li>
          </a>
          <a href="/dashboard/orderlist">
          <li  className={`${location.pathname === '/dashboard/orderlist' ? 'bg-[#51BC74] text-white py-4 ' : ''}  p-2 rounded cursor-pointer uppercase font-medium text-sm tracking-wide leading-none font-[Rubik]`}>Order List</li>

          </a>
          <a href="/dashboard/ai-orderlist">
          <li  className={`${location.pathname === '/dashboard/ai-orderlist' ? 'bg-[#51BC74] text-white py-4 ' : ''}  p-2 rounded cursor-pointer uppercase font-medium text-sm tracking-wide leading-none font-[Rubik]`}>AI Order List</li>
          </a>
          <li>
            <button
              className="flex justify-between cursor-pointer items-center w-full p-2 font-[Rubik] font-semibold text-[20px] leading-[100%] tracking-[0px] text-[#232321]"
              onClick={() => setIsOpen(!isOpen) }
            >
              Categories {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {isOpen && (
              <ul className="pl-4 space-y-4 mt-4">
                <li className="flex justify-between cursor-pointer items-center text-[#232321] font-[Open_Sans] font-semibold text-[16px] leading-[100%] tracking-[0px]">
                  Lorem Ipsum <span className="bg-green-400 text-white text-sm px-2 py-1 rounded">21</span>
                </li>
                <li className="flex justify-between cursor-pointer items-center text-[#232321] font-[Open_Sans] font-semibold text-[16px] leading-[100%] tracking-[0px]">
                  Lorem Ipsum <span className="bg-gray-300 text-gray-700 text-sm px-2 py-1 rounded">32</span>
                </li>
                <li className="flex justify-between cursor-pointer items-center text-[#232321] font-[Open_Sans] font-semibold text-[16px] leading-[100%] tracking-[0px]">
                  Lorem Ipsum <span className="bg-gray-300 text-gray-700 text-sm px-2 py-1 rounded">13</span>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
