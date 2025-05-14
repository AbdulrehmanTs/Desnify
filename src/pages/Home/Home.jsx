import { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import HomeProduct from "../../components/HomeProductSection/HomeProduct";
import { ApiBaseUrl } from "../../lib/utils";
import Spinner from "../../components/loader/spinner";
import { autoLogout, getToken, isAuthenticated } from "../../hooks/useAuth";

const Home = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loggedIn = isAuthenticated();
  const token = getToken();

  useEffect(() => {
    const fetchProducts = async () => {
      const path = loggedIn
        ? "/product/getAllProductsByUserId"
        : "/product/getAllProducts";
      const options = { method: "GET" };
      const headers = { Authorization: `Bearer ${token}` };
      if (loggedIn) {
        options.headers = headers;
      }
      try {
        setLoading(true); // Start loading
        const response = await fetch(ApiBaseUrl + path, options);
        const result = await response.json();
        console.log("result: ", result);
        setProducts(result);
        if (result.msg === "Session Expired") {
          autoLogout();
        }
        if (!response.ok) throw new Error("Network response was not ok");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, [loggedIn, token]);

  return (
    <div className="px-4 md:px-8 lg:px-24">
      <Hero />
      <div className="mt-10">
        {loading ? (
          <Spinner />
        ) : error ? (
          <p className="text-red-500 text-sm text-center ">{error}</p>
        ) : (
          <HomeProduct data={products} heading="Products" />
        )}
      </div>
      {/* <HomeProduct heading="Pre-made Designs catalogue" /> */}
    </div>
  );
};

export default Home;
