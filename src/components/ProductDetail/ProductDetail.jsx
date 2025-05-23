import { useState } from "react";
import { FaStar, FaMinus, FaPlus } from "react-icons/fa";
import ProductImage from "../../assets/Products/ProductImage.svg";
import SecondProductImage from "../../assets/Products/SecondProductImage.svg";
import { Link } from "react-router-dom";

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(ProductImage);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleQuantityChange = (type) => {
    setQuantity((prev) =>
      type === "increase" ? prev + 1 : prev > 1 ? prev - 1 : 1
    );
  };

  return (
    <>
      <div className="w-full mx-auto px-4 sm:px-6 mb-24">
        {/* Product Detail Container */}
        <div className="w-full flex flex-col sm:flex-row md:flex-row">
          {/* Left Section - Product Images */}
          <div className="w-full sm:w-1/2 md:w-1/2 flex flex-col items-center md:items-start md:pl-20 2xl:pl-24">
            {/* Main Product Image */}
            <img
              src={product?.images[0]?.imageUrl}
              alt="T-Shirt"
              className="w-full h-[500px] object-contain"
            />

            {/* Smaller Images for Selection */}
            <div className="mt-4 flex gap-3">
              <img
                src={product?.images[0]?.imageUrl}
                alt="White Shirt"
                className={`w-14 md:size-16 border ${
                  selectedImage === ProductImage
                    ? "border-red-500"
                    : "border-gray-300"
                } cursor-pointer`}
                onClick={() => setSelectedImage(ProductImage)}
              />
              <img
                src={SecondProductImage}
                alt="Black Shirt"
                className={`w-14 md:size-16 border ${
                  selectedImage === SecondProductImage
                    ? "border-red-500"
                    : "border-gray-300"
                } cursor-pointer`}
                onClick={() => setSelectedImage(SecondProductImage)}
              />
            </div>
          </div>

          {/* Right Section - Product Details */}
          <div className="w-full sm:w-1/2 md:w-1/2 mt-8 sm:mt-0 md:ml-10 text-center sm:text-left">
            {/* Product Name */}
            <h2 className="font-['Inter'] font-extrabold text-[32px] sm:text-[40px] leading-[100%]">
              {product?.name}
            </h2>

            {/* Product Category */}
            <p className="font-['Inter'] font-normal text-[14px] sm:text-[12px] text-gray-500 mt-1">
              For Men, Women
            </p>

            {/* Product Description */}
            <h3 className="font-['Inter'] font-extralight text-[32px] sm:text-[40px] leading-[100%] mt-8 sm:mt-10">
              Product Description
            </h3>

            <p className="mt-2 text-[#969696] font-['Poppins'] font-normal text-[16px] sm:text-[18px] leading-[26px] sm:leading-[30px]">
              {product?.description}
            </p>

            {/* Ratings */}
            <div className="flex justify-center sm:justify-start items-center text-[#FFD43C] mt-6 gap-3">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} />
              ))}
              <span className="text-sm sm:text-base text-gray-500 ml-2">
                (2k)
              </span>
            </div>

            {/* Size Selection */}
            <div className="mt-6">
              <p className="font-[Poppins] font-bold text-[16px] sm:text-[18px]">
                Size
              </p>
              <div className="flex justify-center sm:justify-start gap-2 mt-2">
                {product?.sizes.map((size) => (
                  <button
                    key={size}
                    role="button"
                    className={`border px-4 py-2 rounded-lg hover:bg-gray-200 cursor-pointer ${
                      selectedSize === size
                        ? "bg-[#5463FF] text-white border border-white"
                        : "bg-white"
                    }`}
                    onClick={() =>
                      setSelectedSize(size === selectedSize ? null : size)
                    }
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-8">
              <p className="font-[Poppins] font-bold text-[16px] sm:text-[18px]">
                Quantity
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 mt-3">
                {/* Quantity Buttons */}
                <div className="flex items-center justify-between border w-32 sm:w-40 py-3 px-6 rounded-md">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    className="p-1"
                  >
                    <FaMinus />
                  </button>
                  <span className="px-4">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    className="p-1"
                  >
                    <FaPlus />
                  </button>
                </div>

                {/* Price */}
                <p className="font-[Mada] font-bold text-[36px] sm:text-[48px] leading-[100%] tracking-[0%]">
                  Rs.{Number(product?.salesPrice)?.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Button */}
            <div className="mt-6">
              <Link
                to={`/customize/${product?._id}`}
                type="button"
                className="w-full md:w-auto px-4 md:px-16 cursor-pointer py-3 bg-[#51BC74] text-white rounded-md hover:bg-green-700 transition"
              >
                Start Design
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
