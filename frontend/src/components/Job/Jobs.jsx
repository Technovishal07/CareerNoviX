import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaBuilding,
} from "react-icons/fa";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/");
      return;
    }

    const fetchJobs = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "http://localhost:4000/api/v1/job/getall",
          {
            withCredentials: true,
          }
        );

        setJobs(res.data.jobs);
      } catch (err) {
        setError("Failed to load jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isAuthorized, navigate]);

  const filteredJobs = jobs.filter((job) =>
    [
      job.title,
      job.category,
      job.city,
      job.country,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="jobs-page">
      <div className="container">

        {/* Header */}
        <div className="jobs-header">
          <h1>Find Your Dream Career</h1>
          <p>
            Discover thousands of jobs from top companies around the world.
          </p>
        </div>

        {/* Search */}
        <div className="search-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search jobs, companies, categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="job-count">
            {filteredJobs.length} Jobs Available
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="loading-state">
            <h3>Loading Jobs...</h3>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="error-state">
            <h3>{error}</h3>
          </div>
        )}

        {/* Jobs Grid */}
        {!loading && !error && (
          <div className="jobs-grid">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div className="job-card" key={job._id}>
                  
                  <div className="job-card-header">
                    <span className="job-category">
                      {job.category}
                    </span>
                  </div>

                  <h2>{job.title}</h2>

                  <div className="job-info">
                    <p>
                      <FaBuilding />
                      {job.companyName || "CareerNova Partner"}
                    </p>

                    <p>
                      <FaMapMarkerAlt />
                      {job.city}, {job.country}
                    </p>

                    <p>
                      <FaBriefcase />
                      {job.category}
                    </p>
                  </div>

                  <div className="job-footer">
                    <Link
                      to={`/job/${job._id}`}
                      className="details-btn"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <img
                  src="/no-jobs.svg"
                  alt="No Jobs"
                  width="200"
                />
                <h2>No Jobs Found</h2>
                <p>
                  Try searching with different keywords or
                  categories.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Jobs;