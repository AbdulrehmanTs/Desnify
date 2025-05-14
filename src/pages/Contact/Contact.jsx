// import React from "react";
// import Background from '../../assets/Hero/Hero.svg'
// import Call from '../../assets/Contact/Call.svg';
// import Email from '../../assets/Contact/Email.svg';
// import Address from '../../assets/Contact/Location.svg'

// const Contact = () => {
//   return (
//     <>
//       <div className="w-full 2xl:w-[1640px] md:w-[1240px] mx-auto px-4 sm:px-6 mb-24">
//         <div className="w-full flex flex-col sm:flex-row md:flex-col my-12   items-center">
//           <div
//             className='relative w-full  sm:h-[800px] 2xl:w-[1640px] md:w-[1240px] md:h-[350px] 2xl:h-[550px] flex flex-col justify-center items-center text-center  2xl:mt-[-90px]  rounded-lg md:rounded-2xl'
//             style={{
//               backgroundImage: `url(${Background})`,
//               backgroundRepeat: 'no-repeat',
//               backgroundSize: 'cover',
//               backgroundPosition: 'cover',
//             }}
//           >
//             <div className="relative z-10 max-w-lg sm:max-w-md md:max-w-5xl px-4 flex flex-col items-center pt-16 text-center">

//               <h1 className="relative mt-[-5px] mb-5 text-[48px] leading-[100%] font-[Plus_Jakarta_Sans] font-semibold tracking-[5%] text-black text-center capitalize">
//                 Contact
//               </h1>

//               <p className="max-w-md sm:max-w-3xl mt-4 text-gray-700 text-[16px] font-[Plus_Jakarta_Sans] font-normal leading-[24px] tracking-[0] text-center">
//                 Embre Group is a dynamic and continuously growing group of companies creating a buoyant economic climate.
//               </p>



//             </div>
//           </div>

//           <div className="flex  mt-10 2xl:mt-32 gap-10 w-full">
//             <div className="flex flex-col gap-6 w-full md:w-1/3 space-y-6 p-7">
//               <div className="flex items-center gap-4 p-4 bg-white shadow-[0px_28.1px_108.66px_-14.99px_#D3D3D3] rounded-lg">
//                 <img src={Call} alt="" />
//                 <div className="space-y-3">
//                   <p className="font-[Plus_Jakarta_Sans] font-normal text-[14.99px] leading-[13.11px] tracking-[0.008em] text-[#4D4D4D]">
//                     Call me
//                   </p>

//                   <p className="font-[Plus_Jakarta_Sans] font-medium text-[14.99px] leading-[16.86px] tracking-[0.005em] text-[#11142D]">
//                     +8801613968687
//                   </p>

//                 </div>
//               </div>

//               <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg">
//                 <img src={Email} alt="" />
//                 <div className="space-y-3">
//                   <p className="font-[Plus_Jakarta_Sans] font-normal text-[14.99px] leading-[13.11px] tracking-[0.008em] text-[#4D4D4D]">
//                   Email me
//                   </p>

//                   <p className="font-[Plus_Jakarta_Sans] font-medium text-[14.99px] leading-[16.86px] tracking-[0.005em] text-[#11142D]">
//                     ahmedtanvir8687@gmail.com
//                   </p>

//                 </div>
//               </div>

//               <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg">
//                 <img src={Address} alt="" />
//                 <div className="space-y-3">
//                   <p className="font-[Plus_Jakarta_Sans] font-normal text-[14.99px] leading-[13.11px] tracking-[0.008em] text-[#4D4D4D]">
//                     Call me
//                   </p>

//                   <p className="font-[Plus_Jakarta_Sans] font-medium text-[14.99px] leading-[16.86px] tracking-[0.005em] text-[#11142D]">
//                     +8801613968687
//                   </p>

//                 </div>
//               </div>
//             </div>
//             <div className="w-full md:w-2/3 bg-white p-6 rounded-lg space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
//                 <input type="text" placeholder="Full name" className="border border-[#D9D9D9]  placeholder:text-[#4D4D4D] font-[Plus_Jakarta_Sans] p-4 rounded-lg w-full mt-4" />
//                 <input type="email" placeholder="Your email" className="border border-[#D9D9D9]  placeholder:text-[#4D4D4D] font-[Plus_Jakarta_Sans] p-4 rounded-lg w-full mt-4" />
//                 <input type="text" placeholder="Phone number" className="border border-[#D9D9D9]  placeholder:text-[#4D4D4D] font-[Plus_Jakarta_Sans] p-4 rounded-lg w-full mt-4" />
//                 <input type="text" placeholder="Budget" className="border border-[#D9D9D9]  placeholder:text-[#4D4D4D] font-[Plus_Jakarta_Sans] p-4 rounded-lg w-full mt-4" />
//               </div>
//               <textarea placeholder="Message" className="border border-[#D9D9D9]  placeholder:text-[#4D4D4D] font-[Plus_Jakarta_Sans] p-4  rounded-lg w-full mt-4 h-44"></textarea>
//               <div className="flex justify-end">
//                 <button className="bg-[#51BC74] text-white px-6 py-3 mt-4 rounded-lg w-fit ">
//                   Submit Message
//                 </button>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//     </>
//   );
// };

// export default Contact;



import React from "react";
import Background from '../../assets/Hero/Hero.svg';
import Call from '../../assets/Contact/Call.svg';
import Email from '../../assets/Contact/Email.svg';
import Address from '../../assets/Contact/Location.svg';

const Contact = () => {
  return (
    <>
      <div className="w-full 2xl:w-[1640px] md:w-[1240px] mx-auto px-4 sm:px-6 mb-24">
        <div className="w-full flex flex-col sm:flex-row md:flex-col my-12 items-center">
          <div
            className="relative w-full h-[300px] sm:h-[800px] 2xl:w-[1640px] md:w-[1240px] md:h-[350px] 2xl:h-[550px] flex flex-col justify-center items-center text-center 2xl:mt-[-90px] md:mt-[-150px] mt-[-50px] rounded-lg md:rounded-2xl"
            style={{
              backgroundImage: `url(${Background})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'cover',
            }}
          >
            <div className="relative z-10 max-w-lg sm:max-w-md md:max-w-5xl px-4 flex flex-col items-center pt-16 text-center">
              <h1 className="relative mt-[-5px] mb-5 text-[48px] leading-[100%] font-[Plus_Jakarta_Sans] font-semibold tracking-[5%] text-black text-center capitalize">
                Contact
              </h1>

              <p className="max-w-md sm:max-w-3xl mt-4 text-gray-700 text-[16px] font-[Plus_Jakarta_Sans] font-normal leading-[24px] tracking-[0] text-center">
                Embre Group is a dynamic and continuously growing group of companies creating a buoyant economic climate.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row mt-10 2xl:mt-32 gap-10 w-full">
            <div className="flex flex-col gap-6 w-full md:w-1/3 space-y-6 md:p-7">
              <div className="flex items-center gap-4 p-4 bg-white shadow-[0px_28.1px_108.66px_-14.99px_#D3D3D3] rounded-lg">
                <img src={Call} alt="" />
                <div className="space-y-3">
                  <p className="font-[Plus_Jakarta_Sans] font-normal text-[14.99px] leading-[13.11px] tracking-[0.008em] text-[#4D4D4D]">
                    Call me
                  </p>

                  <p className="font-[Plus_Jakarta_Sans] font-medium text-[14.99px] leading-[16.86px] tracking-[0.005em] text-[#11142D]">
                    +8801613968687
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg ">
                <img src={Email} alt="" />
                <div className="space-y-3">
                  <p className="font-[Plus_Jakarta_Sans] font-normal text-[14.99px] leading-[13.11px] tracking-[0.008em] text-[#4D4D4D]">
                    Email me
                  </p>

                  <p className="font-[Plus_Jakarta_Sans] font-medium text-[14.99px] leading-[16.86px] tracking-[0.005em] text-[#11142D]">
                    ahmedtanvir8687@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg">
                <img src={Address} alt="" />
                <div className="space-y-3">
                  <p className="font-[Plus_Jakarta_Sans] font-normal text-[14.99px] leading-[13.11px] tracking-[0.008em] text-[#4D4D4D]">
                    Call me
                  </p>

                  <p className="font-[Plus_Jakarta_Sans] font-medium text-[14.99px] leading-[16.86px] tracking-[0.005em] text-[#11142D]">
                    +8801613968687
                  </p>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3 bg-white p-6 rounded-lg space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Full name" className="border border-[#D9D9D9] placeholder:text-[#4D4D4D] font-[Plus_Jakarta_Sans] p-4 rounded-lg w-full mt-4" />
                <input type="email" placeholder="Your email" className="border border-[#D9D9D9] placeholder:text-[#4D4D4D] font-[Plus_Jakarta_Sans] p-4 rounded-lg w-full mt-4" />
                <input type="text" placeholder="Phone number" className="border border-[#D9D9D9] placeholder:text-[#4D4D4D] font-[Plus_Jakarta_Sans] p-4 rounded-lg w-full mt-4" />
                <input type="text" placeholder="Budget" className="border border-[#D9D9D9] placeholder:text-[#4D4D4D] font-[Plus_Jakarta_Sans] p-4 rounded-lg w-full mt-4" />
              </div>
              <textarea placeholder="Message" className="border border-[#D9D9D9] placeholder:text-[#4D4D4D] font-[Plus_Jakarta_Sans] p-4 rounded-lg w-full mt-4 h-44"></textarea>
              <div className="flex justify-end">
                <button className="bg-[#51BC74] text-white px-6 py-3 mt-4 rounded-lg w-fit">
                  Submit Message
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Contact;
