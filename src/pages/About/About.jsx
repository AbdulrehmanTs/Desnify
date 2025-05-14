import React from 'react'
import Background from '../../assets/Hero/Hero.svg'

const About = () => {
  return (
    <div className='flex justify-center mb-44 md:mb-0 2xl:mb-[-100px] items-center mt-[-90px] md:mt-0 md:min-h-screen bg-white px-2 sm:px-4 z-0 h-screen'>
      <div
        className='relative w-full h-[700px] sm:h-[800px] md:w-[1240px] 2xl:w-[1640px] md:h-[350px] 2xl:h-[500px] flex flex-col justify-center items-center text-center md:mt-[-238px] 2xl:mt-[-350px] rounded-lg md:rounded-2xl'
        style={{
          backgroundImage: `url(${Background})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='inset-0 bg-green-100 opacity-90 rounded-lg md:rounded-2xl'></div>
        <div className="relative z-10 max-w-lg sm:max-w-md md:max-w-5xl px-4 flex flex-col items-center text-center">

          <h1 className="relative mt-[-5px] mb-5 text-[36px] leading-[100%] font-[Dm_Sans] font-semibold tracking-[0%] text-black">
            About
          </h1>



          <p className="max-w-lg sm:max-w-4xl mt-4 text-gray-700 text-[20px] font-[Dm_Sans] font-normal leading-8 tracking-[0%] text-center">
            Desnify is an AI-powered e-commerce platform for custom T-shirt designs. Browse unique styles or let our AI generate personalized designs based on your preferences. Whether you're looking for something trendy or totally unique, Desnify makes customizing T-shirts simple and fun. Start creating your perfect T-shirt today!
          </p>



        </div>
      </div>
    </div>
  )
}

export default About
