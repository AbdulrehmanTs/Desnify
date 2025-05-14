import { useState, useEffect, useCallback } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import DiscountedProduct from "../../components/DiscountedProduct/DiscountedProduct";
import Seacrh from "../../assets/Products/Search.svg";
import { ApiBaseUrl } from "../../lib/utils";

const ProductPage = () => {
  const perPage = 12; // Products to show per page
  const [visibleProducts, setVisibleProducts] = useState(perPage);
  const [allProducts, setAllProducts] = useState([]);
  const [keyword, setKeyword] = useState("");

  // Debounce the fetchProducts function
  const debouncedFetchProducts = useCallback((currentKeyword) => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${ApiBaseUrl}/product/getAllProducts?pageNumber=1&pageSize=100&keyword=${currentKeyword}`
        );

        if (!response.ok) throw new Error(`Error ${response.status}`);

        const { data } = await response.json();
        setAllProducts(data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      debouncedFetchProducts(keyword);
    }, 500);

    return () => clearTimeout(timeoutId); // Cleanup on unmount and before next execution
  }, [keyword, debouncedFetchProducts]);

  const loadMoreProducts = () => {
    setVisibleProducts((prev) => Math.min(prev + perPage, allProducts.length));
  };

  return (
    <>
      <div className="bg-white min-h-screen p-6 mb-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="md:col-span-3">
            <h1 className="text-[#51BC74] font-bold text-4xl leading-11 align-center mb-4 ml-4 md:ml-0">
              Our Collection Of Products
            </h1>

            {/* Search Bar */}
            <div className="relative mb-6 ml-4 md:ml-0">
              <input
                type="text"
                placeholder="Search An Item"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full border font-[Oxygen] font-normal text-[16px] leading-5
                border-[#00000026] rounded-full py-2 pl-5 pb-2 justify-between h-16 focus:outline-none"
              />
              <img
                src={Seacrh}
                alt="Search"
                className="absolute top-3 right-4 text-gray-500"
              />
            </div>

            <div className="text-start ml-4 md:ml-0 mt-10">
              <p className="text-[#414141] mb-1 font-[Oxygen] font-bold text-[16px] leading-7">
                Showing {Math.min(visibleProducts, allProducts.length)} of{" "}
                {allProducts.length} item(s)
              </p>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProducts.slice(0, visibleProducts).map((prod, index) => (
                <DiscountedProduct key={index} prod={prod} />
              ))}
            </div>

            {/* Pagination Section */}
            <div className="text-center mt-10">
              <p className="text-gray-600 mb-4">
                Showing {Math.min(visibleProducts, allProducts.length)} of{" "}
                {allProducts.length} item(s)
              </p>

              {/* Progress Bar */}
              <div className="w-full max-w-lg mx-auto h-0.5 bg-gray-200 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-[#282828] transition-all duration-300"
                  style={{
                    width: `${(visibleProducts / allProducts.length) * 100}%`,
                  }}
                />
              </div>

              {visibleProducts < allProducts.length && (
                <button
                  onClick={loadMoreProducts}
                  className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-all"
                >
                  Load More →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
