import Background from "../../assets/Hero/Hero.svg";

const Hero = () => {
  function scrollToSecondSection() {
    const secondSection = document.getElementById("products"); // Assuming your second section has the ID 'second-section'
    if (secondSection) {
      secondSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("Second section with ID 'second-section' not found.");
    }
  }

  return (
    <div className="flex justify-center items-center bg-white">
      <div
        className="relative w-full h-full flex flex-col justify-center items-center text-center rounded-lg md:rounded-2xl py-28"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="inset-0 bg-green-100 opacity-90 rounded-lg md:rounded-2xl"></div>
        <div className="relative z-10 max-w-lg sm:max-w-md md:max-w-2xl px-4 flex flex-col items-center text-center 2xl:pt-16 pt-8">
          <h1 className="relative text-2xl sm:text-3xl md:text-[48px] font-[600] tracking-[5%] uppercase font-[Plus_Jakarta_Sans] text-black">
            We Have Diverse Tshirt{" "}
            <span className="text-green-600">designs</span>
          </h1>

          <p className="max-w-xs sm:max-w-md mt-4 text-gray-700 text-[14px] sm:text-[16px] font-[400] leading-[24px] tracking-[0%] font-[Plus_Jakarta_Sans]">
            Desnify is a dynamic and rapidly growing platform, fostering a
            thriving environment for customized and AI-generated T-shirt designs
          </p>

          <button
            onClick={scrollToSecondSection}
            className="mt-6 cursor-pointer px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Start Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
