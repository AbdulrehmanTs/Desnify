

import { useState, useEffect } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import Header from "../../components/Dashboard/Header";
import ProductCard from "../../components/Dashboard/ProductCard";
import Calendar from "../../components/Dashboard/Calendar";
import { Menu } from "lucide-react";
import { getUserRole, isAuthenticated } from "../../hooks/useAuth";

const AllProducts = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const isloggedIn = isAuthenticated();
  const role = getUserRole();
  useEffect(() => {
    if (!isloggedIn || !role) {
      window.location.href = "/login";
    } else if (role !== "a") {
      window.location.href = "/login";
    }
  }, [isloggedIn, role]);

  if (!isloggedIn) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Toggle Sidebar Button */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow">
        <button onClick={() => setShowSidebar(!showSidebar)}>
          <Menu />
        </button>
        <h2 className="text-lg font-bold">All Products</h2>
      </div>

      {showSidebar && (
        <div className="md:hidden fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-lg">
          <Sidebar closeSidebar={() => setShowSidebar(false)} />
        </div>
      )}

      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="flex-1 bg-[#E7E7E3]">
        <Header />
        <Calendar calendar={false} title={"All Products"} />
        <div className="p-4">
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <ProductCard key={idx} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllProducts;
