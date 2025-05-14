import { useEffect, useState } from "react";
import HomeProduct from "../../components/HomeProductSection/HomeProduct";
import { ApiBaseUrl } from "../../lib/utils";
import { getToken, isAuthenticated } from "../../hooks/useAuth";
import Spinner from "../../components/loader/spinner";

const Wishlist = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loggedIn = isAuthenticated();
  const token = getToken();

  useEffect(() => {
    const fetchProducts = async () => {
      const path = "/product/getAllProductsByUserId?isWishlisted=true";
      try {
        setLoading(true); // Start loading
        const response = await fetch(ApiBaseUrl + path, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setProducts(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, [loggedIn, token]);

  return (
    <div className="mt-10">
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500 text-sm text-center ">{error}</p>
      ) : products.data.length > 0 ? (
        <HomeProduct data={products} heading="Wishlist" />
      ) : (
        <EmptyWishlist />
      )}
    </div>
  );
};

export default Wishlist;

const EmptyWishlist = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-md">
      {/* <!-- Cart Icon --> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="none"
        className="size-20 text-gray-600"
      >
        <path
          d="M5.83317 2.5C3.53234 2.5 1.6665 4.34667 1.6665 6.625C1.6665 8.46417 2.39567 12.8292 9.57317 17.2417C9.70174 17.3199 9.84934 17.3613 9.99984 17.3613C10.1503 17.3613 10.2979 17.3199 10.4265 17.2417C17.604 12.8292 18.3332 8.46417 18.3332 6.625C18.3332 4.34667 16.4673 2.5 14.1665 2.5C11.8657 2.5 9.99984 5 9.99984 5C9.99984 5 8.134 2.5 5.83317 2.5Z"
          className="stroke-current"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* <!-- Text --> */}
      <h2 className="text-lg font-semibold text-gray-700 mb-1">
        Empty Wishlist
      </h2>
      <p className="text-sm text-gray-500">Add items to get started</p>
    </div>
  );
};
