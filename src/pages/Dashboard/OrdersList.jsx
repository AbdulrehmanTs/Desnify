import { useState, useEffect } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import Header from "../../components/Dashboard/Header";
import Calendar from "../../components/Dashboard/Calendar";
import Table from "../../components/Dashboard/Table";
import { Menu } from "lucide-react";
import { autoLogout, getToken } from "../../hooks/useAuth";
import { ApiBaseUrl } from "../../lib/utils";

const OrdersList = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const token = getToken();
  const [orders, setOrders] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch(
          ApiBaseUrl + "/order/getAllOrders?pageNumber=1&pageSize=1000",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        setOrders(result.data);
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
    <div className="flex flex-col lg:flex-row md:max-h-screen bg-[#E7E7E3]">
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow">
        <button onClick={() => setShowSidebar(!showSidebar)}>
          <Menu />
        </button>
        <h2 className="text-lg font-bold">Dashboard</h2>
      </div>

      {showSidebar && (
        <div className="md:hidden fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-lg">
          <Sidebar closeSidebar={() => setShowSidebar(false)} />
        </div>
      )}

      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="relative flex-1 bg-[#E7E7E3] md:h-screen overflow-auto">
        <div className="sticky top-0 z-10">
          <Header />
        </div>

        {/* Calendar + Filters */}
        <Calendar calendar={true} title={"Order List"} status={true} />

        {/* Table Section */}
        <div className="p-4 sm:p-6">
          <div className="mt-6"></div>
          <Table />
        </div>
      </main>
    </div>
  );
};

export default OrdersList;
