import { useEffect, useState } from "react";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import { useParams } from "react-router-dom";
import { ApiBaseUrl } from "../../lib/utils";
import { autoLogout, getToken } from "../../hooks/useAuth";
import Spinner from "../../components/loader/spinner";
const ProductDetailPage = () => {
  const params = useParams();
  const token = getToken();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch(
          ApiBaseUrl + "/product/getProductById?productId=" + params.id,
          {
            method: "get",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        setProduct(result);
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
  }, [params.id, token]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500 text-sm text-center ">{error}</p>
      ) : (
        <ProductDetail product={product?.data} />
      )}
    </div>
  );
};

export default ProductDetailPage;
