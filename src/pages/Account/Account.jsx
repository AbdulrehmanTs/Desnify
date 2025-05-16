import { useState, useEffect } from "react";

export default function AccountSettings() {
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("r");

    if (!token || !role) {
      window.location.href = "/login";
    } else if (role !== "u") {
      window.location.href = "/login";
    } else {
      setDisplay(true);
    }
  }, []);

  if (!display) {
    return null;
  }
  return (
    <>
      <div className="w-full 2xl:w-[1640px] md:w-[1240px] mx-auto px-4 sm:px-6 mb-24">
        {/* Product Detail Container */}
        <div className="w-full  my-12 2xl:my-24  items-center">
          <h2 className="text-[30px] font-[700] leading-[100%] tracking-[0%] text-[#51BC74] mb-4 font-['Oxygen']">
            Account Settings
          </h2>
          <p className="text-[#575757] mb-6 text-[16px] font-[400] leading-[171%] tracking-[0%] font-['Oxygen']">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat.
          </p>
          <h3 className="text-[16px] font-[700] leading-[171%] tracking-[0%] text-[#353535] mt-6 font-['Oxygen'] capitalize mb-6">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-4">
            <div>
              <label className="block text-[#353535] text-[14px] font-[400] leading-[171%] tracking-[0%] font-['Oxygen'] small-caps">
                First name
              </label>

              <input
                type="text"
                placeholder="Peter"
                className="w-full p-3 border rounded-[54px] border-[#DFDFDF] bg-[#F8F8F8]"
              />
            </div>
            <div>
              <label className="block text-[#353535] text-[14px] font-[400] leading-[171%] tracking-[0%] font-['Oxygen'] small-caps">
                Last name
              </label>
              <input
                type="text"
                placeholder="Ducker"
                className="w-full p-3 border rounded-[54px] border-[#DFDFDF] bg-[#F8F8F8]"
              />
            </div>
            <div>
              <label className="block text-[#353535] text-[14px] font-[400] leading-[171%] tracking-[0%] font-['Oxygen'] small-caps">
                Email Address
              </label>
              <input
                type="email"
                placeholder="peterducker312@gmail.com"
                className="w-full p-3 border rounded-[54px] border-[#DFDFDF] bg-[#F8F8F8]"
              />
            </div>
            <div>
              <label className="block text-[#353535] text-[14px] font-[400] leading-[171%] tracking-[0%] font-['Oxygen'] small-caps">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="(+1) - 234 - 687215421"
                className="w-full p-3 border rounded-[54px] border-[#DFDFDF] bg-[#F8F8F8]"
              />
            </div>
          </div>

          <h3 className="text-[16px] font-[700] leading-[171%] tracking-[0%] text-[#353535] mt-6 font-['Oxygen'] capitalize mb-6">
            Change Password
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block text-[#353535] text-[14px] font-[400] leading-[171%] tracking-[0%] font-['Oxygen'] small-caps">
                New Password
              </label>
              <input
                type="password"
                placeholder="*************"
                className="w-full p-3 border rounded-[54px] border-[#DFDFDF] bg-[#F8F8F8]"
              />
            </div>
            <div>
              <label className="block text-[#353535] text-[14px] font-[400] leading-[171%] tracking-[0%] font-['Oxygen'] small-caps">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="*************"
                className="w-full p-3 border rounded-[54px] border-[#DFDFDF] bg-[#F8F8F8]"
              />
            </div>
          </div>

          <h3 className="text-[16px] font-[700] leading-[171%] tracking-[0%] text-[#353535] mt-6 font-['Oxygen'] capitalize mb-6">
            Address
          </h3>
          <div className="grid grid-cols-1  gap-4 mt-2 space-y-4">
            <div className="w-full">
              <label className=" text-[#353535] text-[14px] font-[400] leading-[171%] tracking-[0%] font-['Oxygen'] small-caps">
                Shipping Addres
              </label>
              <textarea
                type="text"
                placeholder="Shipping Address"
                className="w-full p-3 border rounded-[20px] border-[#DFDFDF] bg-[#F8F8F8]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 space-y-4">
            <div>
              <label className="block text-[#353535] text-[14px] font-[400] leading-[171%] tracking-[0%] font-['Oxygen'] small-caps">
                State
              </label>
              <input
                type="text"
                placeholder="State"
                className="w-full p-3 border rounded-[54px] border-[#DFDFDF] bg-[#F8F8F8]"
              />
            </div>
            <div>
              <label className="block text-[#353535] text-[14px] font-[400] leading-[171%] tracking-[0%] font-['Oxygen'] small-caps">
                Zip Code
              </label>
              <input
                type="text"
                placeholder="Zip Code"
                className="w-full p-3 border rounded-[54px] border-[#DFDFDF] bg-[#F8F8F8]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 space-y-4">
            <button className="mt-6 w-full bg-[#51BC74] text-white py-4 px-5 font-semibold text-[16px] font-[Exo] rounded-[64px] hover:bg-green-600">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
