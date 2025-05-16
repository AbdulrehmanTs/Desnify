import { EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { autoLogout, getToken } from "../../hooks/useAuth";
import { ApiBaseUrl } from "../../lib/utils";
import Spinner from "../loader/spinner";

const Table = () => {

  const token = getToken();
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch(
          ApiBaseUrl + "/order/getAllOrders?pageNumber=1&pageSize=10",
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
    <div className="bg-white shadow-md rounded-xl p-4 overflow-x-auto">
      <div className="flex justify-between items-center py-4">
        <h2 className="font-[Rubik] font-semibold text-lg sm:text-xl leading-[100%] tracking-[0%] mb-3">
          Recent Orders
        </h2>
        <EllipsisVertical />
      </div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500 text-sm text-center ">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-[#23232133]">
                <th className="p-3 text-left">
                  <input type="checkbox" className="w-4 h-4" />
                </th>
                <th className="p-3 font-[Rubik] font-semibold text-sm sm:text-base text-center text-[#232321CC]">
                  Product
                </th>
                <th className="p-3 font-[Rubik] font-semibold text-sm sm:text-base text-center text-[#232321CC]">
                  Order ID
                </th>
                <th className="p-3 font-[Rubik] font-semibold text-sm sm:text-base text-center text-[#232321CC]">
                  Date
                </th>
                <th className="p-3 font-[Rubik] font-semibold text-sm sm:text-base text-center text-[#232321CC]">
                  Customer Name
                </th>
                <th className="p-3 font-[Rubik] font-semibold text-sm sm:text-base text-center text-[#232321CC]">
                  Status
                </th>
                <th className="p-3 font-[Rubik] font-semibold text-sm sm:text-base text-center text-[#232321CC]">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={i} className="border-b border-[#23232133]">
                  <td className="p-3">
                    <input type="checkbox" className="w-4 h-4" />
                  </td>
                  <td className="p-3 text-sm sm:text-base text-center text-[#000000] font-[Open_Sans] font-semibold">
                    {order.items.map((p) => p.productDetails.name).join(",")}
                  </td>
                  <td className="p-3 text-sm sm:text-base text-center text-[#000000] font-[Open_Sans] font-semibold">
                    {order._id}
                  </td>
                  <td className="p-3 text-sm sm:text-base text-center text-[#000000] font-[Open_Sans] font-semibold">
                    {new Date(order.createdAt).toDateString()}
                  </td>
                  <td className="p-3 text-sm sm:text-base text-center justify-center flex items-center gap-2 text-[#000000] font-[Open_Sans] font-semibold">
                    <img
                      src={order.customer.profilePhoto}
                      alt="Avatar"
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{order.customer.name}</span>
                  </td>
                  <td className="p-3 text-sm sm:text-base text-center">
                    <div className="flex items-center justify-center gap-2 text-[#000000] font-[Open_Sans] font-semibold">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          order.status === "delivered"
                            ? "bg-blue-500"
                            : "bg-orange-500"
                        }`}
                      ></span>
                      <span className="text-gray-700">{order.status}</span>
                    </div>
                  </td>
                  {/* <td>dddssdsdsdsdsdsd</td> */}
                  <td className="p-3 text-sm sm:text-base text-center text-[#000000] font-[Open_Sans] font-semibold">
                    <span>Rs.{Number(order.totalAmount).toFixed(2)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;
