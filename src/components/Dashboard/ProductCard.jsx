import { ArrowUp, Ellipsis, EyeIcon, PenIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full border border-gray-200">
      <div className="flex justify-between items-start gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <img
            src={product?.images[0]?.imageUrl}
            alt="Product"
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{product?.name}</h3>
            <p className="text-gray-500 text-sm">Shirt</p>
            <p className="font-bold text-black mt-1">
              Rs.{Number(product?.salesPrice).toFixed(2)}
            </p>
          </div>
        </div>
        <Options product={product} />
      </div>

      <h4 className="font-semibold text-gray-900 mt-4">Summary</h4>
      <p className="text-gray-500 text-sm">{product?.description}</p>

      <div className="border border-[#2323214D] rounded-lg p-3 shadow-sm bg-white mt-4">
        <div className="flex justify-between items-center text-gray-700 text-sm font-medium pb-2 border-b border-[#2323214D]">
          <span>Sales</span>
          <div className="flex items-center gap-1">
            <ArrowUp className="text-orange-500 w-4 h-4" />
            <span>1269</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-gray-700 text-sm font-medium pt-2">
          <span>Remaining Products</span>
          <div className="flex items-center gap-1">
            <div className="h-1 w-10 bg-orange-500 rounded-full">
              <div className="h-1 bg-gray-300 w-full rounded-full"></div>
            </div>
            <span>1269</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

// eslint-disable-next-line react/prop-types
function Options({ product }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button onClick={toggleDropdown} className="inline-flex justify-center ">
        <Ellipsis className="text-gray-500 text-xl cursor-pointer" />
      </button>

      {isOpen && (
        <ul className="absolute right-0 z-10 w-40 rounded-lg shadow-xl bg-gray-50 overflow-hidden">
          <Link to={`/dashboard/product/detail/${product?._id}`}>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
              <EyeIcon size={16} color="green" /> <span className="ml-2 text-sm">View</span>
            </li>
          </Link>
          <Link to={`/dashboard/product/edit/${product?._id}`}>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
              <PenIcon size={16} /> <span className="ml-2 text-sm">Edit</span>
            </li>
          </Link>
        </ul>
      )}
    </div>
  );
}
