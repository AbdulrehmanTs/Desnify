import CheckCircle from '../../assets/Products/CheckCircle.svg'

export default function OrderConfirmation() {
    return (

        <div className="fixed inset-0 flex items-center justify-center z-[9999]">
            <div className="relative bg-white p-6 shadow-[0px_6.65px_13.5px_0px_rgba(0,0,0,0.07),0px_22.34px_45.34px_0px_rgba(0,0,0,0.11),0px_100px_203px_0px_rgba(0,0,0,0.18)] border border-[#ABABAB] rounded-lg">
                <div className="bg-white p-8 rounded-2xl w-[300px] md:w-[700px]  2xl:w-[800px] text-center">
                    <div className="flex justify-center mb-6">
                        <img src={CheckCircle} alt="" width={50} />
                    </div>
                    <h2 className="font-[Oxygen] font-normal text-[36px] leading-[100%] tracking-[0%] mb-6">
                        Thank you!
                    </h2>
                    <p className="font-[Oxygen] font-normal text-[16px] leading-[100%] tracking-[0%] text-center text-[#949494] mt-2">
                        Your order has been confirmed & it is on the way. Check your email for the details.
                    </p>


                    <div className="hidden md:flex mt-6  justify-center gap-4">
                        <a href="/"> <button className="cursor-pointer bg-[#51BC74] text-white px-5 py-2 rounded-full font-semibold font-[exo]">
                            Go to Homepage
                        </button></a>
                        <a href="/cart">
                            <button className="border cursor-pointer border-black px-5 py-2 rounded-full font-semibold font-[exo]">
                                Check Order Details
                            </button>
                        </a>

                    </div>

                    <div className="mt-6  justify-center gap-4 md:hidden w-full grid grid-cols-1">
                        <a href="/"><button className="bg-[#51BC74] cursor-pointer text-white px-5 py-2 rounded-full font-semibold font-[exo]">
                            Go to Homepage
                        </button></a>
                        <a href="/cart"><button className="border cursor-pointer border-black px-5 py-2 rounded-full font-semibold font-[exo]">
                            Check Order Details
                        </button></a>


                    </div>
                </div>
            </div>
        </div>
    );
}
