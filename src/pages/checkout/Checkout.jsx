import { useState } from "react";
import { useCart } from "../../contexts/cartContext";
import { ApiBaseUrl } from "../../lib/utils";
import { useNavigate } from "react-router-dom";
import OrderConfirmation from "../../components/OrderConfirmation/OrderConfirmation";
import { getToken } from "../../hooks/useAuth";

export default function Checkout() {
  const token = getToken();
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [showOrderPopup, setShowOrderPopup] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.salesPrice * item.quantity,
    0
  );
  const shipping = 9.99;
  const tax = 42.0;
  const total = subtotal + shipping + tax;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // clear error when typing
  };

  console.log("cartItems", cartItems);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simple validation
    const { fullName, email, address, city, state, zipCode, country } =
      formData;

    if (
      !fullName ||
      !email ||
      !address ||
      !city ||
      !state ||
      !zipCode ||
      !country
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    try {
      const response = await fetch(`${ApiBaseUrl}/order/placeOrder`, {
        method: "POST",
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
            price: item.salesPrice,
            customDesign: item.customDesign,
          })),
          totalAmount: total,
          shippingAddress: { address, city, state, zipCode, country },
          paymentMethod: "cod",
          finalImages: cartItems.map((item) => ({ ...item.finalImages[0] })),
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(`Error ${response.status}`);
      clearCart();
      setTimeout(() => {
        navigate("/");
      }, 1000);
      setShowOrderPopup(true);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={`min-h-screen bg-white py-10 px-4 sm:px-10 ${
          showOrderPopup ? "blur-sm" : ""
        }`}
      >
        <h2 className="text-3xl font-semibold text-center mb-10">Checkout</h2>
        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto"
        >
          {/* Billing & Payment Section */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Billing Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="border p-3 rounded w-full"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Full Name"
                />
                <input
                  className="border p-3 rounded w-full"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email Address"
                />
                <input
                  className="border p-3 rounded w-full"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  type="text"
                  placeholder="Street Address"
                />
                <input
                  className="border p-3 rounded w-full"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  type="text"
                  placeholder="City"
                />
                <input
                  className="border p-3 rounded w-full"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  type="text"
                  placeholder="State/Province"
                />
                <input
                  className="border p-3 rounded w-full"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  type="text"
                  placeholder="ZIP/Postal Code"
                />
                <input
                  className="border p-3 rounded w-full"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  type="text"
                  placeholder="Country"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
              <div className="flex items-center gap-x-2">
                <input
                  className="p-3"
                  type="radio"
                  defaultChecked
                  placeholder=""
                  id="cod"
                />
                <label htmlFor="cod">Cash on Delivery</label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border rounded-lg p-6 shadow-md">
            <h3 className="text-2xl font-semibold mb-6">Order Summary</h3>
            <div className="flex justify-between mb-2 text-gray-600">
              <span>Subtotal</span>
              <span>Rs.{subtotal?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-600">
              <span>Shipping</span>
              <span>Rs.{shipping?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-6 text-gray-600">
              <span>Tax</span>
              <span>Rs.{tax?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-semibold mb-6">
              <span>Total</span>
              <span>Rs.{total?.toFixed(2)}</span>
            </div>
            <button
              type="submit"
              className="cursor-pointer w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg"
            >
              Confirm and Place order
            </button>
            {error && (
              <p className="text-red-500 mt-3 text-sm text-center">{error}</p>
            )}
          </div>
        </form>
      </div>
      {/* Order Confirmation Popup */}
      {showOrderPopup && (
        <OrderConfirmation onClose={() => setShowOrderPopup(false)} />
      )}
    </>
  );
}
