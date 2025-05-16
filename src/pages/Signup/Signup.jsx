import { useState } from "react";
import { FaCheckSquare } from "react-icons/fa";
import SigninImage from "../../assets/Signin/SigninImage.svg";
import BackgroundLogo from "../../assets/Signin/backgroundLogo.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiBaseUrl } from "../../lib/utils";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        ApiBaseUrl + "/user/registerUser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            profilePhoto: "",
            number: formData.number,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Account created successfully!");
        navigate("/")
      } else {
        toast.error(data.message || "Signup failed!");
      }
    } catch (error) {
      console.log('error: ', error);
      toast.error("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Section - Image */}
      <div className="hidden md:flex w-1/2  bg-gray-200 justify-center items-center">
        <img
          src={SigninImage}
          alt="Sign In"
          className=" 2xl:h-screen min-h-screen w-full object-cover object-center"
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
        <div className="w-full max-w-md  p-8 ">
          <h2 className="text-5xl font-bold mb-4 text-black font-[Inter]">
            Sign up
          </h2>
          <p className="text-[#818181] font-[Inter] font-normal text-[16px] mb-6 leading-5">
            Create your account in seconds
          </p>

          <form onSubmit={handleSubmit}>
            <label className="block text-[#818181] font-[Inter] font-extrabold leading-5 text-[16px] ml-1.5">
              Full Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              required
              className="w-full p-4 border border-[#D1D1D1] rounded-2xl mb-4 mt-2 bg-white"
            />

            <label className="block text-[#818181] font-[Inter] font-extrabold leading-5 text-[16px] ml-1.5">
              Email Address:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="eg. johndoe@gmail.com"
              required
              className="w-full p-4 border border-[#D1D1D1] rounded-2xl mb-4 mt-2 bg-white"
            />

            <label className="block text-[#818181] font-[Inter] font-extrabold leading-5 text-[16px] ml-1.5">
              Phone Number:
            </label>
            <input
              type="tel"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="w-full p-4 border border-[#D1D1D1] rounded-2xl mb-4 mt-2 bg-white"
            />

            <label className="block text-[#818181] font-[Inter] font-extrabold leading-5 text-[16px] ml-1.5">
              Create Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              required
              className="w-full p-4 border border-[#D1D1D1] rounded-2xl mb-4 mt-2 bg-white"
            />

            <label className="block text-[#818181] font-[Inter] font-extrabold leading-5 text-[16px] ml-1.5">
              Confirm Password:
            </label>
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="********"
                required
                className="w-full p-4 border border-[#D1D1D1] rounded-2xl mb-4 mt-2 bg-white"
              />
              <span className="absolute right-3 top-5 text-gray-500">🔒</span>
            </div>

            <div className="flex items-center mb-4">
              <FaCheckSquare className="text-green-600 mr-2" />
              <p className="text-gray-700">
                I agree to the terms and privacy policy
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-green-600 text-white p-3 rounded-md font-semibold hover:bg-green-700"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-green-600 font-bold cursor-pointer">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
