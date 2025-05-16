import SimpleProduct from "../SimpleProduct/SimpleProduct";

// eslint-disable-next-line react/prop-types
const HomeProduct = ({ heading = "", data }) => {
  return (
    <div id="products" className="w-full mx-auto px-4 sm:px-6 mb-40">
      <div className=" w-full mx-auto flex flex-col items-center text-center">
        {/* Heading */}
        <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-2xl sm:text-3xl md:text-4xl leading-11">
          {heading}
        </h2>
        {/* Horizontal Line */}
        <hr className="mx-auto mt-2 border-t-3 border-[#51BC74] w-24" />

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 w-full">
          {data?.data?.map((product) => (
            <SimpleProduct key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeProduct;
