import { useState, useEffect, createContext, useContext } from "react";
import { toast } from "react-toastify";

// Create the Cart Context
const CartContext = createContext();

// Create a Cart Provider component
// eslint-disable-next-line react/prop-types
export default function CartProvider ({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart items from local storage on initial render
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });


  useEffect(() => {
    // Save cart items to local storage whenever cartItems changes
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item._id === product._id
    );

    if (existingItemIndex !== -1) {
      // If item exists, increase quantity
      const updatedCart = cartItems.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
      toast.success(`Added to cart.`);
    } else {
      // If item doesn't exist, add it to the cart with quantity 1
      setCartItems([...cartItems, product]);
      toast.success(`Added to cart.`);
    }
  };

  const deleteFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCart);
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item._id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        deleteFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};
