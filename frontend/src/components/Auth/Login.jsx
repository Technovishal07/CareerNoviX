import React, { useContext, useState } from "react";
import {
  MdOutlineMailOutline,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaLock } from "react-icons/fa"; // Admin key icon ke liye
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState(""); // Admin key state add ki
  
  // Role selection default state 'Job Seeker'
  const [role, setRole] = useState("Job Seeker");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Payload mein adminKey ko bhi bhej rahe hain
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role, adminKey },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Failed");
    }
  };

  if (isAuthorized) return <Navigate to="/" />;

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-left">
          <img src="/logo.png" alt="CareerNoviX" />
          <h2>Welcome Back</h2>
          <p>Login to continue your career journey with CareerNoviX.</p>

          {/* --- Separate Role Selection Tabs --- */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px", width: "100%" }}>
            <button
              type="button"
              style={{
                flex: 1,
                padding: "12px",
                backgroundColor: role === "Job Seeker" ? "#17a2b8" : "#f0f0f0",
                color: role === "Job Seeker" ? "#fff" : "#333",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "all 0.3s ease"
              }}
              onClick={() => {
                setRole("Job Seeker");
                setAdminKey(""); // Job Seeker select hote hi key clear ho jayegi
              }}
            >
              Job Seeker
            </button>
            <button
              type="button"
              style={{
                flex: 1,
                padding: "12px",
                backgroundColor: role === "Employer" ? "#17a2b8" : "#f0f0f0",
                color: role === "Employer" ? "#fff" : "#333",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "all 0.3s ease"
              }}
              onClick={() => setRole("Employer")}
            >
              Employer
            </button>
          </div>
          {/* -------------------------------------------------------- */}

          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="input-box">
              <MdOutlineMailOutline />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="input-box">
              <RiLock2Fill />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <MdVisibilityOff />
                ) : (
                  <MdVisibility />
                )}
              </span>
            </div>

            {/* Dynamic Admin Key Input Field (Sirf Employer select hone par dikhega) */}
            {role === "Employer" && (
              <div className="input-box" style={{ border: "1px solid #e67e22" }}>
                <FaLock style={{ color: "#e67e22" }} />
                <input
                  type="password"
                  placeholder="Enter Admin Secret Key"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  required 
                />
              </div>
            )}
            
            {/* Dynamic Button Text */}
            <button type="submit" className="login-btn">
              Login as {role}
            </button>

            <p className="register-text">
              Don't have an account?
              <Link to="/register"> Register Now</Link>
            </p>
          </form>
        </div>

        <div className="login-right">
          <img src="/login.png" alt="Login Banner" />
        </div>
      </div>
    </div>
  );
};

export default Login;