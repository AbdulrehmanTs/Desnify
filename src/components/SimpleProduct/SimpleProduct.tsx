import { useState } from "react";
import BoxImage from "../../assets/Products/Box.svg";
import Wishlist from "../../assets/Header/Wishlist.svg";
import ColoredWishlist from "../../assets/Products/ColoredWishlist.svg";
import { useNavigate } from "react-router-dom";
import { getToken, isAuthenticated } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { ApiBaseUrl } from "../../lib/utils";

const SimpleProduct = ({ product }) => {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();
  const token = getToken();

  function handleClick() {
    if (!loggedIn) {
      toast.info("Please Login to see product details..");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      navigate("/products/" + product?._id);
    }
  }
  const [isWishlisted, setIsWishlisted] = useState(product?.isWishlisted);
  async function handleAddToWishlist() {
    if (!loggedIn) return navigate("/login")
    // Optimistic update
    setIsWishlisted((prev) => !prev); // Immediately reflect the UI change
    try {
      // API call to add/remove from wishlist
      const response = await fetch(
        `${ApiBaseUrl}/product/addOrRemoveToWishList`,
        {
          method: "put",
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId: product?._id }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update wishlist");
      }
      // Optionally confirm or log success here
    } catch (error) {
      // Revert UI on failure
      setIsWishlisted((prev) => !prev);
      console.error("Wishlist update failed:", error);
      // You could also show a toast/snackbar error here
    }
  }

  return (
    <div className="w-full flex flex-col max-w-[500px] bg-white overflow-hidden p-4">
      {/* Product Image Section */}
      <div className="relative grow bg-gray-200 rounded-lg">
        <img
          src={product?.images[0]?.imageUrl}
          alt="Product"
          className="w-full max-h-[300px] h-full object-cover object-center rounded-lg"
        />
        {/* Wishlist Icon at Top-Right */}
        <button onClick={handleAddToWishlist} className="absolute top-3 right-3 cursor-pointer" type="button">
          <img
            src={`${isWishlisted ? ColoredWishlist : Wishlist}`}
            alt="Wishlist"
            className="w-6 h-6"
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="mt-3 text-start">
        <h2 className="text-lg font-semibold">{product?.name}</h2>
        <p className="text-gray-700 text-sm">Rs.{product?.regPrice}</p>
      </div>

      {/* Box & Button Section */}
      <div className="flex justify-between items-center mt-4">
        {/* Box with Quantity */}
        <div className="flex items-center">
          <img src={BoxImage} alt="Stock" className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">{product?.quantity}</span>
        </div>

        {/* Order Button */}
        <button
          onClick={handleClick}
          className="bg-[#51BC74] py-2 px-6 cursor-pointer text-white text-sm rounded hover:bg-green-600 transition"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default SimpleProduct;
