import React, { useContext, useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaCalendarAlt,
  FaGlobe,
  FaBuilding,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/login");
      return;
    }

    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/job/${id}`, {
          withCredentials: true,
        });

        setJob(res.data.job);
      } catch (error) {
        navigate("/notfound");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, isAuthorized, navigate]);

  if (loading) {
    return (
      <div className="job-loading">
        <h2>Loading Job Details...</h2>
      </div>
    );
  }

  return (
    <section className="job-details-page">
      <div className="job-details-container">
        {/* Hero Section */}
        <div className="job-hero">
          <div className="company-avatar">
            {job.companyName?.charAt(0) || "C"}
          </div>

          <div className="hero-content">
            <h1>{job.title}</h1>

            <p className="company-name">
              <FaBuilding />
              {job.companyName || "CareerNoviX Partner"}
            </p>

            <div className="hero-tags">
              <span>{job.category}</span>
              <span>{job.location}</span>
              <span>Full Time</span>
            </div>
          </div>
        </div>

        {/* Salary Highlight */}
        <div className="salary-highlight">
          <FaMoneyBillWave />

          <div>
            <h2>
              {job.fixedSalary
                ? `₹ ${job.fixedSalary}`
                : `₹ ${job.salaryFrom} - ${job.salaryTo}`}
            </h2>

            <p>Annual Salary Package</p>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="job-info-grid">
          <div className="info-card">
            <FaGlobe />
            <h4>Country</h4>
            <p>{job.country}</p>
          </div>

          <div className="info-card">
            <FaMapMarkerAlt />
            <h4>City</h4>
            <p>{job.city}</p>
          </div>

          <div className="info-card">
            <FaBriefcase />
            <h4>Job Type</h4>
            <p>{job.category}</p>
          </div>

          <div className="info-card">
            <FaCalendarAlt />
            <h4>Posted On</h4>
            <p>{job.jobPostedOn}</p>
          </div>
        </div>

        {/* Description */}
        <div className="content-card">
          <h2>About This Job</h2>
          <p>{job.description}</p>
        </div>

        {/* Benefits */}
        <div className="content-card">
          <h2>Benefits & Perks</h2>

          <div className="benefits">
            <span>💻 Remote Friendly</span>
            <span>🏥 Health Insurance</span>
            <span>🎯 Performance Bonus</span>
            <span>📚 Learning Budget</span>
            <span>🌴 Paid Leaves</span>
          </div>
        </div>

        {/* Apply Button */}
        {user?.role !== "Employer" && (
          <div className="apply-section">
            <Link to={`/application/${job._id}`} className="apply-btn">
              Apply Now
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobDetails;
