import React, { useContext, useState } from "react";
import {
  FaRegUser,
  FaPencilAlt,
} from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import {
  MdOutlineMailOutline,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [role, setRole] = useState("Job Seeker"); // Default role
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setName("");
      setPhone("");
      setEmail("");
      setPassword("");
      setRole("Job Seeker");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration Failed");
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <section className="register-page">
      <div className="register-card">
        <div className="register-left">
          <div className="logo-area">
            <img src="/logo.png" alt="CareerNova" />
            <h2>Create Account</h2>
            <p>Join CareerNova and start your professional journey today.</p>
          </div>

          {/* Simple Buttons Without New Icons */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <button
              type="button"
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: role === "Job Seeker" ? "#17a2b8" : "#f0f0f0",
                color: role === "Job Seeker" ? "#fff" : "#000",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
              onClick={() => setRole("Job Seeker")}
            >
              Job Seeker
            </button>
            <button
              type="button"
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: role === "Employer" ? "#17a2b8" : "#f0f0f0",
                color: role === "Employer" ? "#fff" : "#000",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
              onClick={() => setRole("Employer")}
            >
              Employer
            </button>
          </div>

          <form onSubmit={handleRegister}>
            <div className="input-box">
              <FaPencilAlt />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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

            <div className="input-box">
              <FaPhoneFlip />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="input-box">
              <RiLock2Fill />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </span>
            </div>

            <button type="submit" className="register-btn">
              Register as {role}
            </button>

            <p className="login-link">
              Already have an account? <Link to="/login">Login Now</Link>
            </p>
          </form>
        </div>

        <div className="register-right">
          <img src="/register.png" alt="Register" />
        </div>
      </div>
    </section>
  );
};

export default Register;