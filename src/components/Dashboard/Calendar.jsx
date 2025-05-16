import { useState } from "react";
import DatePicker from "react-datepicker";
import { CirclePlus, ChevronDown } from "lucide-react";
import { FaRegCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = ({ title, calendar = false, status = false }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4  rounded-md">
      {/* Left Side - Title & Breadcrumb */}
      <div className="space-y-1 sm:space-y-2">
        <h3 className="font-[Rubik] font-semibold text-[20px] sm:text-[24px] text-[#000]">
          {title}
        </h3>
        <p className="font-[Open_Sans] text-[14px] sm:text-[16px] font-semibold text-gray-600">
          Home &gt; {title}
        </p>
      </div>

      {/* Right Side - Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Calendar Range Picker */}
        {calendar && (
          <div className="flex items-center text-gray-800 border rounded px-2 py-1 bg-white">
            <FaRegCalendarAlt className="mr-2 text-lg" />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="MMM d, yyyy"
              className="outline-none text-sm w-24"
            />
            <span className="mx-2">-</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="MMM d, yyyy"
              className="outline-none text-sm w-24"
            />
          </div>
        )}

        {/* Add New Product Button (if calendar is false) */}
        {!calendar && (
          <a href="/dashboard/product/new" className="w-full sm:w-auto">
            <button className="w-full cursor-pointer sm:w-auto bg-[#51BC74] py-2 px-4 text-sm sm:text-base uppercase font-[Rubik] font-medium text-white rounded-[8px] border border-[#51BC74] flex items-center justify-center gap-2">
              <CirclePlus size={18} color="white" />
              Add New Product
            </button>
          </a>
        )}

        {/* Status Dropdown */}
        {status && (
          <div className="relative w-full sm:w-48">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 rounded-md shadow-sm text-gray-800"
            >
              {selectedStatus || "Change Status"}
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>

            {isOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-md">
                <ul className="py-2">
                  {["Approved", "Pending"].map((statusOption) => (
                    <li
                      key={statusOption}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => {
                        setSelectedStatus(statusOption);
                        setIsOpen(false);
                      }}
                    >
                      {statusOption}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
