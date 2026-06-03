import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  // Premium Navigation Fix: useEffect ensures redirection happens after rendering safely
  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    return null;
  }

  const handleJobPost = async (e) => {
    e.preventDefault();

    const payload =
      salaryType === "Fixed Salary"
        ? { title, description, category, country, city, location, fixedSalary }
        : { title, description, category, country, city, location, salaryFrom, salaryTo };

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/job/post",
        payload,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      navigateTo("/jobs");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="premium-job-container">
      <div className="premium-job-card">
        <div className="premium-job-header">
          <h2>Create a Job Posting</h2>
          <p>Provide the details below to find your next great hire.</p>
        </div>

        <form onSubmit={handleJobPost} className="premium-job-form">
          <div className="form-row duo-grid">
            <div className="input-group">
              <label>Job Title</label>
              <input
                type="text"
                placeholder="e.g. Senior Product Designer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option>Frontend Web Development</option>
                <option>Backend Development</option>
                <option>UI/UX Design</option>
                <option>Data Science & Analytics</option>
                <option>Digital Marketing</option>
                <option>AI / ML</option>
              </select>
            </div>
          </div>

          <div className="form-row duo-grid">
            <div className="input-group">
              <label>Country</label>
              <input
                type="text"
                placeholder="e.g. India"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>City</label>
              <input
                type="text"
                placeholder="e.g. Mumbai"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Full Location <span className="optional-tag">(Optional)</span></label>
              <input
                type="text"
                placeholder="e.g. Tech Park, Phase 2, Bandra"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="salary-section-card">
            <div className="input-group">
              <label>Salary Structure</label>
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
                className="salary-type-select"
              >
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>
            </div>

            {salaryType === "Fixed Salary" && (
              <div className="input-group salary-animated-field">
                <label>Fixed Amount (USD / INR)</label>
                <input
                  type="number"
                  placeholder="e.g. 120000"
                  value={fixedSalary}
                  onChange={(e) => setFixedSalary(e.target.value)}
                  required
                />
              </div>
            )}

            {salaryType === "Ranged Salary" && (
              <div className="duo-grid salary-animated-field">
                <div className="input-group">
                  <label>Minimum Salary</label>
                  <input
                    type="number"
                    placeholder="From"
                    value={salaryFrom}
                    onChange={(e) => setSalaryFrom(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Maximum Salary</label>
                  <input
                    type="number"
                    placeholder="To"
                    value={salaryTo}
                    onChange={(e) => setSalaryTo(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Job Description</label>
              <textarea
                rows="6"
                placeholder="Outline roles, responsibilities, skills, and benefits..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="premium-submit-btn">
            Publish Job Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;