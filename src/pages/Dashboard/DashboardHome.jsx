import { useEffect, useState } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import Header from "../../components/Dashboard/Header";
import DashboardCard from "../../components/Dashboard/Card";
import Table from "../../components/Dashboard/Table";
import Calendar from "../../components/Dashboard/Calendar";
import { Menu } from "lucide-react";
import { ApiBaseUrl } from "../../lib/utils";
import { autoLogout, getToken } from "../../hooks/useAuth";

export default function Dashboard() {
  const [showSidebar, setShowSidebar] = useState(false);
  const token = getToken();
  const [analytics, setAnalytics] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch(ApiBaseUrl + "/order/dashboardAnalytics", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();

        setAnalytics(result.data);
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
    <div className="flex flex-col lg:flex-row md:max-h-screen">
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

      <main className="relative flex-1 bg-[#E7E7E3] md:h-screen overflow-auto">
        <div className="sticky top-0 z-10">
          <Header />
        </div>
        <Calendar calendar={true} title={"Dashboard"} />
        <div className="p-4 sm:p-6 2xl:mt-[-40px]">
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardCard
              title="Total Orders"
              amount={analytics.totalOrders}
            />
            <DashboardCard
              title="Active Orders"
              amount={analytics.pendingOrders}
            />
            <DashboardCard
              title="Completed Orders"
              amount={analytics.shippedOrders}
            />
            <DashboardCard
              title="Return Orders"
              amount={analytics.returnedOrders}
            />
          </div>
          <div className="mt-6">
            <Table />
          </div>
        </div>
      </main>
    </div>
  );
}
