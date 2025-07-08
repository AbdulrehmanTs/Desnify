import { useState, useEffect } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import Header from "../../components/Dashboard/Header";
import ProductCard from "../../components/Dashboard/ProductCard";
import Calendar from "../../components/Dashboard/Calendar";
import { Menu } from "lucide-react";
import { autoLogout, getToken, isAuthenticated } from "../../hooks/useAuth";
import { ApiBaseUrl } from "../../lib/utils";
import Spinner from "../../components/loader/spinner";

const AllProducts = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loggedIn = isAuthenticated();
  const token = getToken();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch(
          ApiBaseUrl +
            "/product/getAllProductsByUserId?pageNumber=1&pageSize=1000",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        setProducts(result.data);
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
  }, [loggedIn, token]);

  return (
    <div className="flex flex-col md:flex-row md:max-h-screen">
      {/* Toggle Sidebar Button */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow">
        <button onClick={() => setShowSidebar(!showSidebar)}>
          <Menu />
        </button>
        <h2 className="text-lg font-bold">All Products</h2>
      </div>

      {showSidebar && (
        <div className="md:hidden w-64 h-full bg-white shadow-lg">
          <Sidebar closeSidebar={() => setShowSidebar(false)} />
        </div>
      )}

      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="relative flex-1 bg-[#E7E7E3] md:h-screen overflow-auto">
        <div className="sticky top-0 z-10">
          <Header />
        </div>
        <Calendar calendar={false} title={"All Products"} />
        <div className="p-4">
          {loading ? (
            <Spinner />
          ) : error ? (
            <p className="text-red-500 text-sm text-center ">{error}</p>
          ) : (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products?.map((product, idx) => (
                <ProductCard product={product} key={idx} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AllProducts;
