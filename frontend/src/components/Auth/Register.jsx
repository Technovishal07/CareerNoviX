import React, { useContext, useState } from "react";
import { FaPencilAlt, FaLock } from "react-icons/fa"; 
import { FaPhoneFlip } from "react-icons/fa6";
import { MdOutlineMailOutline, MdVisibility, MdVisibilityOff, MdSecurity } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate, useNavigate } from "react-router-dom"; 
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("Job Seeker");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState(""); 
  
  // Loading states to manage API delays
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigate = useNavigate();

  // Handle Phase 1: Submit details and trigger OTP email
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true); // 🚀 Loading start ho gayi

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password, adminKey }, 
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsOtpSent(true); 
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration Failed");
    } finally {
      setIsLoading(false); // 🏁 Loading khatam
    }
  };

  // Handle Phase 2: Submit OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true); // 🚀 Verification loading start

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/verify-otp",
        { email, otp: otpCode },
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
      setAdminKey("");
      setOtpCode("");
      setIsOtpSent(false);
      
      navigate("/login"); 
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid OTP code!");
    } finally {
      setIsLoading(false); // 🏁 Loading khatam
    }
  };

  if (isAuthorized) return <Navigate to={"/"} />;

  return (
    <section className="register-page">
      <div className="register-card">
        <div className="register-left">
          
          {/* CONDITION 1: OTP verification form view */}
          {isOtpSent ? (
            <div>
              <div className="logo-area">
                <img src="/logo.png" alt="CareerNova" />
                <h2>Verify Email Address</h2>
                <p>We've dispatched a 6-digit secure lock code to <strong>{email}</strong>.</p>
              </div>

              <form onSubmit={handleVerifyOtp}>
                <div className="input-box" style={{ border: "1px solid #17a2b8" }}>
                  <MdSecurity style={{ color: "#17a2b8" }} />
                  <input
                    type="text"
                    placeholder="Enter 6-Digit Code"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    required
                    maxLength={6}
                    disabled={isLoading}
                  />
                </div>

                {/* 🔁 Loading ke according button text change aur disable ho jayega */}
                <button type="submit" className="register-btn" disabled={isLoading}>
                  {isLoading ? "Verifying OTP..." : "Verify & Create Account"}
                </button>

                <p className="login-link">
                  Didn't receive email?{" "}
                  <span 
                    style={{ color: "#17a2b8", cursor: "pointer", fontWeight: "bold" }} 
                    onClick={() => { if(!isLoading) setIsOtpSent(false); }}
                  >
                    Go Back
                  </span>
                </p>
              </form>
            </div>
          ) : (
            
            /* CONDITION 2: Registration details tracking form view */
            <div>
              <div className="logo-area">
                <img src="/logo.png" alt="CareerNoviX" />
                <h2>Create Account</h2>
                <p>Join CareerNoviX and start your professional journey today.</p>
              </div>

              {/* Role Selection Buttons */}
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
                  disabled={isLoading}
                  onClick={() => { setRole("Job Seeker"); setAdminKey(""); }}
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
                  disabled={isLoading}
                  onClick={() => setRole("Employer")} 
                >
                  Employer
                </button>
              </div>

              <form onSubmit={handleRegister}>
                <div className="input-box">
                  <FaPencilAlt />
                  <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} />
                </div>

                <div className="input-box">
                  <MdOutlineMailOutline />
                  <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
                </div>

                <div className="input-box">
                  <FaPhoneFlip />
                  <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required disabled={isLoading} />
                </div>

                <div className="input-box">
                  <RiLock2Fill />
                  <input type={showPassword ? "text" : "password"} placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} />
                  <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </span>
                </div>

                {role === "Employer" && (
                  <div className="input-box" style={{ border: "1px solid #e67e22" }}>
                    <FaLock style={{ color: "#e67e22" }} />
                    <input type="password" placeholder="Enter Admin Secret Key" value={adminKey} onChange={(e) => setAdminKey(e.target.value)} required disabled={isLoading} />
                  </div>
                )}

                {/* 🔁 Sending OTP... state controller highlight button */}
                <button type="submit" className="register-btn" disabled={isLoading}>
                  {isLoading ? "Sending Verification Code..." : `Register as ${role}`}
                </button>

                <p className="login-link">
                  Already have an account? <Link to="/login">Login Now</Link>
                </p>
              </form>
            </div>
          )}
          
        </div>

        <div className="register-right">
          <img src="/register.png" alt="Register" />
        </div>
      </div>
    </section>
  );
};

export default Register;