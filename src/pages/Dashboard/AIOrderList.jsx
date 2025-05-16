// import React from 'react'
// import Sidebar from "../../components/Dashboard/Sidebar";
// import Header from "../../components/Dashboard/Header";
// import Calendar from '../../components/Dashboard/Calendar';
// import Table from '../../components/Dashboard/Table';

// const AIOrderList = () => {
//   return (
//     <div className="flex">
//             <Sidebar />
//             <main className="flex-1  bg-[#E7E7E3]">
//                 <Header />
//                 <Calendar calendar={true} title={"AI Orders List"} status={true} />
//                 <div className="p-6 ">

//                     <div className="mt-6"></div>
//                     <Table/>
//                 </div>

//             </main>
//         </div>
//   )
// }

// export default AIOrderList


import  { useState, useEffect } from 'react';
import Sidebar from '../../components/Dashboard/Sidebar';
import Header from '../../components/Dashboard/Header';
import Calendar from '../../components/Dashboard/Calendar';
import Table from '../../components/Dashboard/Table';
import { Menu } from 'lucide-react';


const AIOrderList = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [ display, setDisplay ] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('r');

    if (!token || !role) {
      window.location.href = "/login";
    } else if (role !== 'a') {
      window.location.href = "/login";
    } else {
      setDisplay(true)
    }
  }, [])

  if (!display) {
    return null;
  }
  return (
    <div className="flex flex-col lg:flex-row md:max-h-screen">
      {/* Toggle Sidebar Button */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow">
        <button onClick={() => setShowSidebar(!showSidebar)}>
          <Menu />
        </button>
        <h2 className="text-lg font-bold">AI Order List</h2>
      </div>

      {showSidebar && (
        <div className="md:hidden fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-lg">
          <Sidebar closeSidebar={() => setShowSidebar(false)} />
        </div>
      )}

      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="relative flex-1 bg-[#E7E7E3] md:h-screen overflow-auto">
        <div className="sticky top-0 z-10">
          <Header />
        </div>

        {/* Calendar with title and status filter */}
        <Calendar calendar={true} title="AI Orders List" status={true} />

        {/* Table Section */}
        <div className="p-4 sm:p-6">
          <div className="mt-6">
            <Table />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIOrderList;
