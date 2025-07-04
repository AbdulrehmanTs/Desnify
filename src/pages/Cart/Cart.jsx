import Bin from "../../assets/Products/Bin.svg";
// import OrderConfirmation from "../../components/OrderConfirmation/OrderConfirmation";
import { useCart } from "../../contexts/cartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, deleteFromCart } =
  useCart();
  const navigate = useNavigate();
  console.log('cartItems: ', cartItems);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.salesPrice * item.quantity,
    0
  );
  const shipping = 9.99;
  const tax = 42.0;
  const total = subtotal + shipping + tax;

  if (cartItems?.length < 1) {
    return <EmptyCart />;
  }
  return (
    <>
      <div className={`relative 2xl:h-[600px]`}>
        <div className="w-full 2xl:w-[1440px] md:w-[1240px] mx-auto px-4 sm:px-6 mb-24">
          {/* Product Detail Container */}
          <div className="w-full flex flex-col sm:flex-row md:items-baseline relative my-12 2xl:my-24">
            {/* Left Section - Product Images */}
            <div className="w-full sm:w-1/2 md:w-2/3 flex flex-col items-center md:items-start pr-8">
              <h2 className="font-[Karla] font-bold text-[32px] leading-[23.48px] tracking-[0%] mb-4">
                Shopping Cart
              </h2>

              {cartItems?.map((item) => (
                <div
                  key={item._id}
                  className="w-full flex items-center justify-between shadow-[0px_0.98px_1.96px_0px_rgba(0,0,0,0.05)] py-4 space-x-4"
                >
                  <div className="w-full flex items-center justify-between">
                    <img
                      src={
                        item?.customDesign
                          ? item?.customDesign?.[0]?.image
                          : item?.images[0].imageUrl
                      }
                      alt={item.name}
                      className="w-24 h-auto rounded-lg object-cover mr-8"
                    />
                    <div className="flex-1 space-y-2">
                      <p className="font-[inter] font-semibold text-[17.61px] leading-[17.61px] tracking-[0%]">
                        {item.name}
                      </p>
                      {/* <p className="font-[inter] font-normal text-[15.65px] leading-[15.65px] tracking-[0%] text-gray-500">
                        {item.color} | {item.edition}
                      </p> */}

                      <div className="w-36 inline-flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <button
                          onClick={() => decreaseQuantity(item?._id)}
                          title="decrease"
                          className="cursor-pointer w-12 h-10 flex items-center justify-center border-r border-gray-300 text-xl font-medium"
                        >
                          -
                        </button>
                        <span className="w-12 h-10 flex items-center justify-center text-xl font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item?._id)}
                          title="Increase"
                          className="cursor-pointer w-12 h-10 flex items-center justify-center border-l border-gray-300 text-xl font-medium"
                        >
                          +
                        </button>
                      </div>

                      <span className="ml-4 font-[karla] font-semibold text-[16px] leading-[16px] tracking-[0%]">
                        Rs.{item?.salesPrice?.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteFromCart(item?._id)}
                    type="button"
                    className="cursor-pointer"
                    title="Remove"
                  >
                    <img src={Bin} alt="Delete Product" />
                  </button>
                </div>
              ))}
            </div>

            {/* Right Section - Product Details */}
            <div className="md:sticky top-2 w-full sm:w-1/2 md:w-1/3 mt-8 sm:mt-0 md:ml-10 text-center sm:text-left">
              <h2 className="font-[karla] font-bold text-[32px] leading-[100%] tracking-[0%] mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between py-2 mb-2">
                <span className="font-[karla] font-normal text-[16px] leading-[16px] tracking-[0%] text-[#4B5563]">
                  Subtotal
                </span>
                <span className="font-[karla] font-semibold text-[16px] leading-[16px] tracking-[0%]">
                  Rs.{subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-2 mb-2">
                <span className="font-[karla] font-normal text-[16px] leading-[16px] tracking-[0%] text-[#4B5563]">
                  Shipping
                </span>
                <span className="font-[karla] font-semibold text-[16px] leading-[16px] tracking-[0%]">
                  Rs.{shipping.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-2 mb-4">
                <span className="font-[karla] font-normal text-[16px] leading-[16px] tracking-[0%] text-[#4B5563]">
                  Tax
                </span>
                <span className="font-[karla] font-semibold text-[16px] leading-[16px] tracking-[0%]">
                  Rs.{tax.toFixed(2)}
                </span>
              </div>
              <div className="border-b"></div>
              <div className="flex justify-between py-4 text-xl font-bold">
                <span className="font-[karla] font-semibold text-[16px] leading-[16px] tracking-[0%]">
                  Total
                </span>
                <span className="font-[karla] font-bold text-[20px] leading-[20px] tracking-[0%]">
                  Rs.{total.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate("/checkout")}
                className="w-full cursor-pointer h-12 font-[Inter] font-semibold text-[16px] bg-[#51BC74] text-white py-2 rounded-lg hover:bg-green-600"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-md">
      {/* <!-- Cart Icon --> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 21 20"
        fill="none"
        className="size-20 text-gray-500"
      >
        <g clipPath="url(#clip0_4149_1345)">
          <path
            d="M20.691 4.35922C20.5037 4.033 20.2353 3.76115 19.9122 3.57018C19.5891 3.37921 19.2223 3.27564 18.8475 3.26957H4.96672L4.33774 0.806977C4.2742 0.569258 4.13242 0.360161 3.9355 0.213743C3.73858 0.0673251 3.49813 -0.00778743 3.25331 0.000639056H1.08444C0.796826 0.000639056 0.520995 0.115441 0.317624 0.319789C0.114253 0.524137 0 0.801292 0 1.09028C0 1.37928 0.114253 1.65643 0.317624 1.86078C0.520995 2.06513 0.796826 2.17993 1.08444 2.17993H2.42914L5.42218 13.3597C5.48573 13.5974 5.62751 13.8065 5.82442 13.9529C6.02134 14.0993 6.26179 14.1745 6.50661 14.166H16.2665C16.4668 14.1654 16.663 14.1091 16.8333 14.0033C17.0037 13.8975 17.1416 13.7464 17.2317 13.5667L20.7886 6.41865C20.9428 6.09395 21.0146 5.73595 20.9975 5.3766C20.9805 5.01725 20.8752 4.66773 20.691 4.35922ZM15.5942 11.9867H7.33079L5.56316 5.44887H18.8475L15.5942 11.9867Z"
            className="fill-current"
          />
          <path
            d="M5.8802 20C6.80803 20 7.5602 19.2538 7.5602 18.3333C7.5602 17.4128 6.80803 16.6667 5.8802 16.6667C4.95236 16.6667 4.2002 17.4128 4.2002 18.3333C4.2002 19.2538 4.95236 20 5.8802 20Z"
            className="fill-current"
          />
          <path
            d="M15.9598 20C16.8876 20 17.6398 19.2538 17.6398 18.3333C17.6398 17.4128 16.8876 16.6667 15.9598 16.6667C15.0319 16.6667 14.2798 17.4128 14.2798 18.3333C14.2798 19.2538 15.0319 20 15.9598 20Z"
            className="fill-current"
          />
        </g>
        <defs>
          <clipPath id="clip0_4149_1345">
            <rect width="21" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>

      {/* <!-- Text --> */}
      <h2 className="text-lg font-semibold text-gray-700 mb-1">Empty Cart</h2>
      <p className="text-sm text-gray-500">Add items to get started</p>
    </div>
  );
};
