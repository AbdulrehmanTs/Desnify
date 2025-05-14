import Background from '../../assets/Hero/Hero.svg'

const Hero = () => {
    return (
        <div className='flex justify-center items-center bg-white'>
            <div
                className='relative w-full h-full flex flex-col justify-center items-center text-center rounded-lg md:rounded-2xl py-28'
                style={{
                    backgroundImage: `url(${Background})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className='inset-0 bg-green-100 opacity-90 rounded-lg md:rounded-2xl'></div>
                <div className="relative z-10 max-w-lg sm:max-w-md md:max-w-2xl px-4 flex flex-col items-center text-center 2xl:pt-16 pt-8">
                    <h1 className="relative text-2xl sm:text-3xl md:text-[48px] font-[600] tracking-[5%] uppercase font-[Plus_Jakarta_Sans] text-black">
                        We Have Diverse Clothing <span className="text-green-600">Collection</span>
                    </h1>

                    <p className="max-w-xs sm:max-w-md mt-4 text-gray-700 text-[14px] sm:text-[16px] font-[400] leading-[24px] tracking-[0%] font-[Plus_Jakarta_Sans]">
                        Embre Group is a dynamic and continuously growing group of companies creating a buoyant economic climate.
                    </p>
                    
                    <button className="mt-6 w-[120px] sm:w-[140px] px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                        Start Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Hero
