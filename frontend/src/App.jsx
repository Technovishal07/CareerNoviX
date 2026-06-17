import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Context } from "./main";
import axios from "axios";

// ==================== COMPONENT IMPORTS ====================
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import PostJob from "./components/Job/PostJob";
import MyJobs from "./components/Job/MyJobs";
import MyApplications from "./components/Application/MyApplications";
import ApplicationForm from "./components/Application/Application";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import NotFound from "./components/NotFound/NotFound";

import "./App.css";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser, loading, setLoading } = useContext(Context);

  // 🛡️ USER SESSION RECOVERY: Syncs log session on strict window reloads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/getuser", {
          withCredentials: true,
        });
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
        setUser(null);
      } finally {
        setLoading(false); // Authentication state confirmation complete
      }
    };
    fetchUser();
  }, [isAuthorized, setIsAuthorized, setUser, setLoading]);

  // Global loader overlay to prevent premature redirect crashes on page refresh
  if (loading) {
    return (
      <div className="global-app-loader">
        <div className="spinner"></div>
        <p>Synchronizing CareerNova Security Platform...</p>
      </div>
    );
  }

  return (
    <Router>
      {/* Navbar stays dynamic and responsive inside context bindings */}
      <Navbar />
      
      <Routes>
        {/* Auth Entry Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Global Core Operations Workspace */}
        <Route path="/" element={<Home />} />
        <Route path="/job/getall" element={<Jobs />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/job/post" element={<PostJob />} />
        <Route path="/job/me" element={<MyJobs />} />
        
        {/* 🛠️ VERIFIED APPLICATION MANAGEMENT ROUTING SYSTEM */}
        <Route path="/applications/me" element={<MyApplications />} />
        <Route path="/application/:id" element={<ApplicationForm />} />

        {/* 404 Fallback Node */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;