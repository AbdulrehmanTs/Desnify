// import { useState } from "react";
// import ProductImage from "../../assets/Products/ProductImage.svg";
// import SecondProductImage from "../../assets/Products/SecondProductImage.svg";

// const CustomizePage = () => {
//     const [selectedColor, setSelectedColor] = useState(SecondProductImage);
//     const [selectedDesign, setSelectedDesign] = useState(null);

//     return (
//         <>
//             <div className="w-full 2xl:w-[1440px] md:w-[1240px] mx-auto px-4 sm:px-6 mb-24">
//                 {/* Product Detail Container */}
//                 <div className="w-full flex flex-col sm:flex-row md:flex-row my-12 2xl:my-24  items-center">
//                     {/* Sidebar - Designs */}
//                     <div className="w-full md:w-1/3 border-r p-4 h-[750px] pr-8">
//                         <h2 className="font-[Karla] font-normal text-[24px] leading-[100%] tracking-[0%] mb-4">
//                             <span className="text-[#292D32] ">&larr;</span> Edit Design
//                         </h2>
//                         <p className="font-[Karla] font-medium text-[14px] leading-[100%] tracking-[0%] text-gray-600">
//                             Our Premium Designs
//                         </p>

//                         <div className="grid grid-cols-2 gap-4 mt-4">
//                             {[1, 2, 3, 4].map((id) => (

//                                 <div
//                                     key={id}
//                                     className={` cursor-pointer ${selectedDesign === id ? "border-green-500" : ""
//                                         }`}
//                                     onClick={() => setSelectedDesign(id)}
//                                 >
//                                     <img src={ProductImage} alt="T-Shirt" className="w-full h-auto object-contain border p-4 rounded-lg" />
//                                     <p className="font-[Karla] font-medium text-[14px] leading-[100%] tracking-[0%] text-center mt-1">
//                                         New Fashion
//                                     </p>

//                                 </div>
//                             ))}
//                         </div>
//                         <div className="w-full flex justify-between">
//                             <div className="mt-6 border-t pt-4 w-[45%] text-[#818181]"></div>
//                             <span className="font-[Karla] font-normal text-[12px] leading-[100%] tracking-[0%] pt-4">
//                                 OR
//                             </span>

//                             <div className="mt-6 border-t pt-4 w-[45%] text-[#818181]"></div>
//                         </div>

//                         <div className="relative w-full">
//                             <input
//                                 type="text"
//                                 placeholder="Generate from AI"
//                                 className="w-full p-2 pr-10 border border-[#9E9E9E] rounded-md focus:outline-none focus:ring-2 focus:ring-green-500
//              placeholder:font-[Karla] placeholder:font-normal placeholder:text-[12px] placeholder:leading-[100%] placeholder:tracking-[0%]"
//                             />

//                             <svg
//                                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M15 10a5 5 0 10-10 0 5 5 0 1010 0z" />
//                             </svg>
//                         </div>

//                     </div>

//                     {/* Main Display */}
//                     <div className="w-full md:w-2/3 flex flex-col items-center p-4">
//                         <img
//                             src={selectedColor === "white" ? SecondProductImage : ProductImage}
//                             alt="T-Shirt"
//                             className="w-48 sm:w-72 md:w-80 lg:w-[600px] object-contain"
//                         />
//                     </div>

//                     {/* Sidebar - Color Selection */}
//                     <div className=" w-full md:w-1/3  p-4  border-l h-[750px] flex flex-row md:flex-col pl-8 justify-center md:justify-start items-start gap-2 md:gap-4">
//                         {["white", "black"].map((color) => (
//                             <div
//                                 key={color}
//                                 className={`border p-2 rounded-md cursor-pointer ${selectedColor === color ? "border-green-500" : ""
//                                     }`}
//                                 onClick={() => setSelectedColor(color)}
//                             >
//                                 <img src={color === "white" ? SecondProductImage : ProductImage} alt={color} className="w-30 h-auto object-contain" />
//                             </div>
//                         ))}
//                         {/* Add to Cart Button */}

//                     </div>

//                 </div>
//                 <div className="w-full flex">
//                     <div className="w-full flex items-end justify-end pr-44">
//                         <button className="bg-[#51BC74] text-white w-[203px] h-[60px] rounded-[12px] shadow-md hover:bg-green-600">
//                             Add To Cart
//                         </button>
//                     </div>

//                 </div>
//             </div>

//         </>
//     );
// };

// export default CustomizePage;

import { useEffect, useState } from "react";
import ProductImage from "../../assets/Products/ProductImage.svg";
import SecondProductImage from "../../assets/Products/SecondProductImage.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { autoLogout, getToken } from "../../hooks/useAuth";
import { ApiBaseUrl } from "../../lib/utils";
import Spinner from "../../components/loader/spinner";
import { useCart } from "../../contexts/cartContext";

const CustomizePage = () => {
  const [selectedColor, setSelectedColor] = useState(SecondProductImage);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const params = useParams();
  const token = getToken();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch(
          ApiBaseUrl + "/product/getProductById?productId=" + params.id,
          {
            method: "get",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        setProduct(result.data);
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
  }, [params.id, token]);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <p className="text-red-500 text-sm text-center ">{error}</p>;
  }
  return (
    <>
      <div className="w-full 2xl:w-[1440px] mx-auto px-4 sm:px-6 mb-24">
        {/* Product Detail Container */}
        <div className="w-full flex flex-col md:flex-row items-center md:items-center  my-12 2xl:my-24">
          {/* Sidebar - Designs */}
          <div className="w-full md:w-1/3 md:border-r p-4 h-auto md:h-[600px] 2xl:h-[750px] pr-8">
            <button type="button" onClick={()=> navigate(-1)} className="font-[Karla] 2xl:mb-12 font-normal text-[24px] leading-[100%] tracking-[0%] mb-4 cursor-pointer">
              <span className="text-[#292D32]">&larr;</span> Edit Design
            </button>
            <p className="font-[Karla] font-medium text-[14px] leading-[100%] tracking-[0%] text-gray-600">
              Our Premium Designs
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              {[1, 2, 3, 4].map((id) => (
                <div
                  key={id}
                  className={`cursor-pointer ${
                    selectedDesign === id ? "border-green-500" : ""
                  }`}
                  onClick={() => setSelectedDesign(id)}
                >
                  <img
                    src={ProductImage}
                    alt="T-Shirt"
                    className="w-full h-36 object-contain border p-4 rounded-lg"
                  />
                  <p className="font-[Karla] font-medium text-[14px] leading-[100%] tracking-[0%] text-center mt-2">
                    New Fashion
                  </p>
                </div>
              ))}
            </div>

            <div className="w-full flex justify-between items-center mt-5">
              <div className="h-px w-[44%] bg-gray-200"></div>
              <span className="font-[Karla] font-normal text-sm text-gray-500 tracking-[0%]">
                OR
              </span>
              <div className="h-px w-[44%] bg-gray-200"></div>
            </div>

            <div className="relative w-full mt-4">
              <input
                type="text"
                placeholder="Generate from AI"
                className="w-full p-2 pr-10 border border-[#9E9E9E] rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 
                                placeholder:font-[Karla] placeholder:font-normal placeholder:text-[12px] placeholder:leading-[100%] placeholder:tracking-[0%]"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M15 10a5 5 0 10-10 0 5 5 0 1010 0z"
                />
              </svg>
            </div>
          </div>

          {/* Main Display */}
          <div className="w-full md:w-2/3 flex flex-col items-center p-4">
            <div className="h-[500px] overflow-hidden">
              <img
                className="w-full h-full object-contain"
                src={
                  selectedColor === "white" ? SecondProductImage : ProductImage
                }
                alt="T-Shirt"
              />
            </div>
          </div>

          {/* Sidebar - Color Selection */}
          <div className="w-full md:w-1/3 p-4 md:border-l h-auto md:h-[600px] 2xl:h-[750px] flex flex-wrap md:flex-col pl-8 justify-center md:justify-start items-center md:items-start gap-2 md:gap-4">
            {["white", "black"].map((color) => (
              <div
                key={color}
                className={`border overflow-hidden rounded-md cursor-pointer ${
                  selectedColor === color ? "border-green-500" : ""
                }`}
                onClick={() => setSelectedColor(color)}
              >
                <img
                  src={color === "white" ? SecondProductImage : ProductImage}
                  alt={color}
                  className="w-24 sm:w-28 md:w-30 2xl:w-36 h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="w-full flex justify-center md:justify-end pr-0 md:pr-20 2xl:pr-44">
          <button
            onClick={() => addToCart(product)}
            type="button"
            className="cursor-pointer bg-green-600 py-3 md:py-2.5 px-8 w-full md:w-auto text-white rounded-lg shadow-md hover:bg-green-700"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomizePage;
