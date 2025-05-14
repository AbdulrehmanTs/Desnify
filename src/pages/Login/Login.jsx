import { useState } from "react";
import { FaCheckSquare } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import SigninImage from "../../assets/Signin/SigninImage.svg";
import BackgroundLogo from "../../assets/Signin/backgroundLogo.svg";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_BASE_URL + "/user/loginUser";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(API_URL, formData);
      toast.success("Login Successful! Redirecting...");
      localStorage.setItem("token", response.data.token);

      if (
        response.status === 200 &&
        formData.email === "desnifyadmin@yopmail.com"
      ) {
        localStorage.setItem("r", "a");
        setTimeout(() => {
          navigate("/dashboard"); // Change the path as needed
        }, 2000);
      } else if (response.status === 200) {
        localStorage.setItem("r", "u");
        setTimeout(() => {
          navigate("/"); // Change the path as needed
        }, 1000);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Invalid Credentials!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section - Image */}
      <div className="hidden md:flex w-1/2 bg-gray-200 justify-center items-center">
        <img
          src={SigninImage}
          alt="Sign In"
          className="h-screen w-full object-cover object-center"
        />
      </div>

      {/* Right Section - Form */}
      <div
        style={{
          backgroundImage: `url(${BackgroundLogo})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full md:w-1/2 flex justify-center items-center bg-green-100 p-8"
      >
        <div className="w-full max-w-md p-8">
          <h2 className="text-5xl font-bold mb-4 text-black font-[Inter]">
            Login
          </h2>
          <p className="text-[#818181] font-[Inter] font-normal text-[16px] mb-6 leading-5">
            Login your account in seconds
          </p>

          <form onSubmit={handleSubmit}>
            <label className="block text-[#818181] font-[Inter] font-extrabold leading-5 text-[16px] ml-1.5">
              Email Address:
            </label>
            <input
              type="email"
              name="email"
              placeholder="eg. johndoe@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border border-[#D1D1D1] rounded-2xl mb-4 mt-2 bg-white"
              required
            />

            <label className="block text-[#818181] font-[Inter] font-extrabold leading-5 text-[16px] ml-1.5">
              Password:
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 border border-[#D1D1D1] rounded-2xl mb-4 mt-2 bg-white"
              required
            />

            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
              <p className="text-gray-700 flex items-center">
                <FaCheckSquare className="text-green-600 mr-2" />
                Keep me logged in
              </p>
              <p className="text-gray-700 mt-2 sm:mt-0 cursor-pointer">
                Forgot Password?
              </p>
            </div>

            <button
              type="submit"
              className={`w-full bg-green-600 text-white p-3 cursor-pointer rounded-md font-semibold hover:bg-green-700 ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/signup">
              <span className="text-green-600 font-bold cursor-pointer">
                Sign up
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
