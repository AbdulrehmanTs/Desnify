// import React from "react";
// import { EllipsisVertical } from 'lucide-react';

// const Table = () => {
//     const orders = [
//         { id: "#25426", date: "Nov 8th, 2023", name: "Kavin", status: "Delivered" },
//         { id: "#25425", date: "Nov 7th, 2023", name: "Komael", status: "Canceled" },
//         { id: "#25424", date: "Nov 6th, 2023", name: "Nikhil", status: "Delivered" },
//         { id: "#25423", date: "Nov 5th, 2023", name: "Shivam", status: "Canceled" },
//         { id: "#25422", date: "Nov 4th, 2023", name: "Shadab", status: "Delivered" },
//         { id: "#25421", date: "Nov 2nd, 2023", name: "Yogesh", status: "Delivered" },
//     ];

//     return (
//         <div className="bg-white shadow-md rounded-xl p-4">
//             <div className="flex justify-between py-4">
//                 <h2 className="font-[Rubik] font-semibold text-[20px] leading-[100%] tracking-[0%] mb-3">
//                     Recent Orders
//                 </h2>

//                 <EllipsisVertical />
//             </div>
//             <table className="w-full">
//                 <thead>
//                     <tr className="border-b border-[#23232133] ">
//                         <th className="p-3 text-left">
//                             <input type="checkbox" className="w-4 h-4" />
//                         </th>
//                         <th className="p-3 font-[Rubik] font-semibold text-[16px] leading-[100%] tracking-[0%] text-center text-[#232321CC]">
//                             Product
//                         </th>

//                         <th className="p-3 font-[Rubik] font-semibold text-[16px] leading-[100%] tracking-[0%] text-center text-[#232321CC]">Order ID</th>
//                         <th className="p-3 font-[Rubik] font-semibold text-[16px] leading-[100%] tracking-[0%] text-center text-[#232321CC]">Date</th>
//                         <th className="p-3 font-[Rubik] font-semibold text-[16px] leading-[100%] tracking-[0%] text-center text-[#232321CC]">Customer Name</th>
//                         <th className="p-3 font-[Rubik] font-semibold text-[16px] leading-[100%] tracking-[0%] text-center text-[#232321CC]">Status</th>
//                         <th className="p-3 font-[Rubik] font-semibold text-[16px] leading-[100%] tracking-[0%] text-center text-[#232321CC]">Amount</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {orders.map((order, i) => (
//                         <tr key={i} className="border-b border-[#23232133] space-y-4">
//                             <td className="p-3">
//                                 <input type="checkbox" className="w-4 h-4" />
//                             </td>
//                             <td className="p-3 font-[Open_Sans] font-semibold text-[14px] text-center leading-[100%] tracking-[0%] text-[#000000]">
//                                 Lorem Ipsum
//                             </td>

//                             <td className="p-3 font-[Open_Sans] font-semibold text-[14px] text-center leading-[100%] tracking-[0%] text-[#000000]">{order.id}</td>
//                             <td className="p-3 font-[Open_Sans] font-semibold text-[14px] text-center leading-[100%] tracking-[0%] text-[#000000]">{order.date}</td>
//                             <td className="p-3 font-[Open_Sans] font-semibold text-[14px] text-center justify-center  leading-[100%] tracking-[0%] text-[#000000] flex items-center space-x-2">
//                                 <img
//                                     src={`https://i.pravatar.cc/30?img=${i + 1}`}
//                                     alt="Avatar"
//                                     className="w-6 h-6 rounded-full"
//                                 />
//                                 <span className="text-[#000]">{order.name}</span>
//                             </td>
//                             <td className="p-3 ">
//                                 <div className=" font-[Open_Sans] font-semibold text-[14px] text-center justify-center leading-[100%] tracking-[0%] text-[#000000] flex items-center space-x-2">
//                                     <span
//                                         className={`w-2 h-2 rounded-full ${order.status === "Delivered" ? "bg-blue-500" : "bg-orange-500"
//                                             }`}
//                                     ></span>
//                                     <span className="text-gray-700">{order.status}</span>
//                                 </div>

//                             </td>
//                             <td className="p-3 font-[Open_Sans] font-semibold text-[14px] text-center leading-[100%] tracking-[0%] text-[#000000]">₹200.00</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Table;




import React from "react";
import { EllipsisVertical } from 'lucide-react';

const Table = () => {
  const orders = [
    { id: "#25426", date: "Nov 8th, 2023", name: "Kavin", status: "Delivered" },
    { id: "#25425", date: "Nov 7th, 2023", name: "Komael", status: "Canceled" },
    { id: "#25424", date: "Nov 6th, 2023", name: "Nikhil", status: "Delivered" },
    { id: "#25423", date: "Nov 5th, 2023", name: "Shivam", status: "Canceled" },
    { id: "#25422", date: "Nov 4th, 2023", name: "Shadab", status: "Delivered" },
    { id: "#25421", date: "Nov 2nd, 2023", name: "Yogesh", status: "Delivered" },
  ];

  return (
    <div className="bg-white shadow-md rounded-xl p-4 overflow-x-auto">
      <div className="flex justify-between items-center py-4">
        <h2 className="font-[Rubik] font-semibold text-lg sm:text-xl leading-[100%] tracking-[0%] mb-3">
          Recent Orders
        </h2>
        <EllipsisVertical />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-[#23232133]">
              <th className="p-3 text-left">
                <input type="checkbox" className="w-4 h-4" />
              </th>
              <th className="p-3 font-[Rubik] font-semibold text-sm sm:text-base text-center text-[#232321CC]">Product</th>
              <th className="p-3 font-[Rubik] font-semibold text-sm sm:text-base text-center text-[#232321CC]">Order ID</th>
              <th className="p-3 font-[Rubik] font-semibold text-sm sm:text-base text-center text-[#232321CC]">Date</th>
              <th className="p-3 font-[Rubik] font-semibold text-sm sm:text-base text-center text-[#232321CC]">Customer Name</th>
              <th className="p-3 font-[Rubik] font-semibold text-sm sm:text-base text-center text-[#232321CC]">Status</th>
              <th className="p-3 font-[Rubik] font-semibold text-sm sm:text-base text-center text-[#232321CC]">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i} className="border-b border-[#23232133]">
                <td className="p-3">
                  <input type="checkbox" className="w-4 h-4" />
                </td>
                <td className="p-3 text-sm sm:text-base text-center text-[#000000] font-[Open_Sans] font-semibold">Lorem Ipsum</td>
                <td className="p-3 text-sm sm:text-base text-center text-[#000000] font-[Open_Sans] font-semibold">{order.id}</td>
                <td className="p-3 text-sm sm:text-base text-center text-[#000000] font-[Open_Sans] font-semibold">{order.date}</td>
                <td className="p-3 text-sm sm:text-base text-center justify-center flex items-center gap-2 text-[#000000] font-[Open_Sans] font-semibold">
                  <img
                    src={`https://i.pravatar.cc/30?img=${i + 1}`}
                    alt="Avatar"
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{order.name}</span>
                </td>
                <td className="p-3 text-sm sm:text-base text-center justify-center flex items-center gap-2 text-[#000000] font-[Open_Sans] font-semibold">
                  <span className={`w-2 h-2 rounded-full ${order.status === "Delivered" ? "bg-blue-500" : "bg-orange-500"}`}></span>
                  <span className="text-gray-700">{order.status}</span>
                </td>
                <td className="p-3 text-sm sm:text-base text-center text-[#000000] font-[Open_Sans] font-semibold">₹200.00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
