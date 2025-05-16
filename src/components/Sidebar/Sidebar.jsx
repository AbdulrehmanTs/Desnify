import { FaChevronDown } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className=" p-6 ">
      {/* Categories */}
      <div className="border border-[#E2E2E2] p-4 mb-6  shadow-md">
        <h2 className="text-lg font-semibold flex items-center ">
          <span className="border-l-2 border-[#2D2D2D] pl-2 text-[#2D2D2D] font-[Oxygen] font-normal text-[22px] leading-7 ">
            Categories
          </span>
        </h2>
        <ul className="mt-2">
          <li className="text-[#414141] py-2 cursor-pointer flex justify-between items-center font-[Oxygen] font-normal text-[16px] leading-7">
            Winter <FaChevronDown className="text-[#73287E]" />
          </li>
          <li className="text-[#F02121] py-2 cursor-pointer flex justify-between items-center font-[Oxygen] font-normal text-[16px] leading-7">
            Summer <FaChevronDown className="text-[#73287E]" />
          </li>
        </ul>
      </div>

      {/* Price Range */}
      <div className="border border-[#E2E2E2] p-4 mb-6  shadow-md min-h-72 py-8 space-y-8 ">
        <h2 className="text-lg font-semibold flex items-center">
          <span className="border-l-2 border-[#2D2D2D] pl-2 text-[#2D2D2D] font-[Oxygen] font-normal text-[22px] leading-7">
            Price Range
          </span>
        </h2>
        <div className="mt-4 space-y-4">
          {[
            "$20.00 - $50.00",
            "$20.00 - $50.00",
            "$20.00 - $50.00",
            "$20.00 - $50.00",
          ].map((price, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-5 h-5 accent-[#3D3D3D] border-gray-400"
                defaultChecked={index === 0}
              />
              <span className="text-[#414141] font-[Oxygen] font-normal text-[16px] leading-7">
                {price}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
