// import { useState } from "react";
// import Sidebar from "../../components/Dashboard/Sidebar";
// import Header from "../../components/Dashboard/Header";
// import DashboardCard from "../../components/Dashboard/Card";
// import Table from "../../components/Dashboard/Table";
// import Calendar from "../../components/Dashboard/Calendar";


// export default function Dashboard() {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <main className="flex-1  bg-[#E7E7E3]">
//         <Header />
//         <Calendar calendar={true} title={"Dashboard"}/>
//         <div className="p-6 2xl:mt-[-40px]">
//           <div className="mt-4 grid grid-cols-4 gap-4 ">
//           <DashboardCard title="Total Orders" amount="126.500" />
//           <DashboardCard title="Active Orders" amount="126.500" />
//           <DashboardCard title="Completed Orders" amount="126.500" />
//           <DashboardCard title="Return Orders" amount="126.500" />
//         </div>
//         <div className="mt-6"></div>
//         <Table />

//         </div>

//       </main>
//     </div>
//   );
// }




import { useState,useEffect } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import Header from "../../components/Dashboard/Header";
import DashboardCard from "../../components/Dashboard/Card";
import Table from "../../components/Dashboard/Table";
import Calendar from "../../components/Dashboard/Calendar";
import { Menu } from 'lucide-react';


export default function Dashboard() {
  const [showSidebar, setShowSidebar] = useState(false);
  // const [ display, setDisplay ] = useState(false)
  //   useEffect(() => {
  //     const token = localStorage.getItem('token');
  //     const role = localStorage.getItem('r');
  
  //     if (!token || !role) {
  //       window.location.href = "/login";
  //     } else if (role !== 'a') {
  //       window.location.href = "/login";
  //     } else {
  //       setDisplay(true)
  //     }
  //   }, [])
  
  //   if (!display) {
  //     return null;
  //   }
  return (
    <div className="flex flex-col lg:flex-row">
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

      <main className="flex-1 bg-[#E7E7E3]">
        <Header />
        <Calendar calendar={true} title={"Dashboard"} />
        <div className="p-4 sm:p-6 2xl:mt-[-40px]">
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardCard title="Total Orders" amount="126.500" />
            <DashboardCard title="Active Orders" amount="126.500" />
            <DashboardCard title="Completed Orders" amount="126.500" />
            <DashboardCard title="Return Orders" amount="126.500" />
          </div>
          <div className="mt-6">
            <Table />
          </div>
        </div>
      </main>
    </div>
  );
}
