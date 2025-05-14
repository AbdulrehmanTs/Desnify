import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
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
import { isAuthenticated } from "./hooks/useAuth";
import Checkout from "./pages/checkout/Checkout";

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();
  const hideHeaderFooter =
    location.pathname === "/signup" ||
    location.pathname === "/login" ||
    location.pathname === "/dashboard" ||
    location.pathname === "/dashboard/all" ||
    location.pathname === "/dashboard/orderlist" ||
    location.pathname === "/dashboard/ai-orderlist" ||
    location.pathname === "/dashboard/product-detail";

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
        <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />
        <Route path="/wishlist" element={<ProtectedRoute element={<Wishlist />} />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<AccountSettings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/all" element={<AllProducts />} />
        <Route path="/dashboard/orderlist" element={<OrdersList />} />
        <Route path="/dashboard/ai-orderlist" element={<AIOrderList />} />
        <Route
          path="/dashboard/product-detail"
          element={<ProductsDetailDashboard />}
        />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

// ProtectedRoute component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

export default App;
