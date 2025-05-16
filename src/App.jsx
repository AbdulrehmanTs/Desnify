import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  matchPath,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ProductPage from "./pages/Product/Product";
import ProductDetail from "./pages/Product-Detail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";
import CustomizePage from "./pages/CustomizePage/CustomizePage";
import Wishlist from "./pages/Wishlist/Wishlist";
import About from "./pages/About/About";
import Terms from "./pages/Terms-Conditions/Terms";
import Privacy from "./pages/Privacy-Policy/Privacy";
import Dashboard from "./pages/Dashboard/DashboardHome";
import Contact from "./pages/Contact/Contact";
import AccountSettings from "./pages/Account/Account";
import AllProducts from "./pages/Dashboard/AllProducts";
import OrdersList from "./pages/Dashboard/OrdersList";
import AIOrderList from "./pages/Dashboard/AIOrderList";
import ProductsDetailDashboard from "./pages/Dashboard/ProductsDetailDashboard";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "react-scroll-to-top";
import SignUp from "./pages/Signup/Signup";
import { isAuthenticated, isAuthenticatedAdmin } from "./hooks/useAuth";
import Checkout from "./pages/checkout/Checkout";
import { useEffect, useState } from "react";

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();
  const [hideHeaderFooter, setHideHeaderFooter] = useState(false);

  useEffect(() => {
    // List of static and dynamic routes
    const pathsToHide = [
      "/signup",
      "/login",
      "/dashboard",
      "/dashboard/all",
      "/dashboard/orderlist",
      "/dashboard/ai-orderlist",
      "/dashboard/product/:id", // dynamic
      "/dashboard/product/detail/:id", // dynamic
      "/dashboard/product/edit/:id", // dynamic
    ];

    const shouldHide = pathsToHide.some((path) =>
      matchPath({ path, end: true }, location.pathname)
    );

    setHideHeaderFooter(shouldHide);
  }, [location]);

  return (
    <div className="bg-white max-w-[1440px] mx-auto">
      <ScrollToTop
        className="p-2 flex items-center justify-center stroke-green-500 fill-green-500 text-green-500"
        smooth
      />
      <ToastContainer position="top-right" autoClose={3000} />
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route
          path="/customize/:id"
          element={<ProtectedRoute element={<CustomizePage />} />}
        />
        <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
        <Route
          path="/checkout"
          element={<ProtectedRoute element={<Checkout />} />}
        />
        <Route
          path="/wishlist"
          element={<ProtectedRoute element={<Wishlist />} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<AccountSettings />} />
        <Route
          path="/dashboard"
          element={<ProtectedRouteAdmin element={<Dashboard />} />}
        />
        <Route
          path="/dashboard/all"
          element={<ProtectedRouteAdmin element={<AllProducts />} />}
        />
        <Route
          path="/dashboard/orderlist"
          element={<ProtectedRouteAdmin element={<OrdersList />} />}
        />
        <Route
          path="/dashboard/ai-orderlist"
          element={<ProtectedRouteAdmin element={<AIOrderList />} />}
        />
        <Route
          path="/dashboard/product/new"
          element={
            <ProtectedRouteAdmin element={<ProductsDetailDashboard isNew={true} />} />
          }
        />
        <Route
          path="/dashboard/product/detail/:id"
          element={
            <ProtectedRouteAdmin element={<ProductsDetailDashboard view={true} />} />
          }
        />
        <Route
          path="/dashboard/product/edit/:id"
          element={
            <ProtectedRouteAdmin element={<ProductsDetailDashboard edit={true} />} />
          }
        />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

// ProtectedRoute component
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

// eslint-disable-next-line react/prop-types
const ProtectedRouteAdmin = ({ element }) => {
  return isAuthenticatedAdmin() ? element : <Navigate to="/login" replace />;
};

export default App;
