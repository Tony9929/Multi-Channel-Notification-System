import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/appContext";
import Navbar from "../components/Navbar";

const Reset = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      if (step === "email") {
        const { data } = await axios.post(`${backendUrl}/api/auth/sendfrogototp`, {
          email,
        });

        if (data.success) {
          toast.success("OTP sent successfully");
          setStep("otpAndPassword");
        } else {
          toast.error(data.message || "Failed to send OTP");
        }
      } else if (step === "otpAndPassword") {
        const { data } = await axios.post(`${backendUrl}/api/auth/verifyforgot`, {
          email,
          otp,
          password,
        });

        if (data.success) {
          toast.success("Password reset successfully. Redirecting to login...");
          setTimeout(() => navigate("/"), 2000);
        } else {
          toast.error(data.message || "OTP verification failed");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <Navbar />
      <div className="w-full max-w-sm bg-white/90 shadow-2xl rounded-2xl p-8 backdrop-blur-md">
        <h1 className="text-gray-800 text-2xl font-bold text-center mb-4">
          Forgot Password
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Email input - always visible */}
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            type="email"
            required
            value={email}
          />

          {/* OTP & Password inputs - shown after email submission */}
          {step === "otpAndPassword" && (
            <>
              <input
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter OTP"
                type="text"
                required
                value={otp}
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter New Password"
                type="password"
                required
                value={password}
              />
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>

          <p
            onClick={() => navigate("/login")}
            className="mt-4 text-sm text-center text-blue-600 hover:underline cursor-pointer"
          >
            Back to login?
          </p>
        </form>
      </div>
    </div>
  );
};

export default Reset;
