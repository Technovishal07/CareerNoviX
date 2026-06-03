import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized || user?.role !== "Employer") {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Error fetching jobs");
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  const handleEnableEdit = (id) => setEditingMode(id);
  const handleDisableEdit = () => setEditingMode(null);

  const handleInputChange = (id, field, value) => {
    setMyJobs((prev) =>
      prev.map((job) =>
        job._id === id ? { ...job, [field]: value } : job
      )
    );
  };

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((j) => j._id === jobId);

    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/job/update/${jobId}`,
        updatedJob,
        { withCredentials: true }
      );

      toast.success(res.data.message);
      setEditingMode(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update job");
    }
  };

  const handleDeleteJob = async (jobId) => {
    if(!window.confirm("Are you sure you want to delete this job posting?")) return;
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/job/delete/${jobId}`,
        { withCredentials: true }
      );

      toast.success(res.data.message);
      setMyJobs((prev) => prev.filter((j) => j._id !== jobId));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete job");
    }
  };

  return (
    <div className="premium-jobs-container">
      <div className="premium-jobs-wrapper">
        <div className="premium-jobs-header">
          <h1 className="premium-page-title">Manage Job Listings</h1>
          <p className="premium-page-subtitle">View, edit, or remove your currently active and expired jobs.</p>
        </div>

        {/* STATS SECTION */}
        <div className="premium-stats-grid">
          <div className="premium-stat-card total">
            <span className="stat-label">Total Postings</span>
            <h2 className="stat-value">{myJobs.length}</h2>
          </div>

          <div className="premium-stat-card active">
            <span className="stat-label">Active</span>
            <h2 className="stat-value">{myJobs.filter(j => !j.expired).length}</h2>
          </div>

          <div className="premium-stat-card expired">
            <span className="stat-label">Expired</span>
            <h2 className="stat-value">{myJobs.filter(j => j.expired).length}</h2>
          </div>
        </div>

        {/* JOBS DISPLAY GRID */}
        {myJobs.length === 0 ? (
          <div className="premium-empty-state">
            <p>You haven't posted any jobs yet.</p>
          </div>
        ) : (
          <div className="premium-job-grid">
            {myJobs.map((job) => {
              const isEditing = editingMode === job._id;
              return (
                <div className={`premium-manage-card ${job.expired ? "is-expired" : ""} ${isEditing ? "is-editing" : ""}`} key={job._id}>
                  
                  {/* TOP HEADER BOX */}
                  <div className="manage-card-top">
                    <div className="title-area">
                      <input
                        type="text"
                        className="live-edit-title"
                        disabled={!isEditing}
                        value={job.title}
                        onChange={(e) => handleInputChange(job._id, "title", e.target.value)}
                      />
                      <span className="category-tag">{job.category}</span>
                    </div>
                    <span className={`status-pill ${job.expired ? "expired" : "active"}`}>
                      {job.expired ? "Expired" : "Active"}
                    </span>
                  </div>

                  {/* METADATA LOCATION BOX */}
                  <div className="manage-card-meta">
                    <div className="meta-field">
                      <label>City</label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={job.city}
                        onChange={(e) => handleInputChange(job._id, "city", e.target.value)}
                      />
                    </div>
                    <div className="meta-field">
                      <label>Country</label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={job.country}
                        onChange={(e) => handleInputChange(job._id, "country", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* SALARY SPECIFICS */}
                  <div className="manage-card-salary">
                    <label className="salary-label">Compensation Plan</label>
                    {job.fixedSalary ? (
                      <div className="salary-input-wrapper">
                        <span className="currency-symbol">₹</span>
                        <input
                          type="number"
                          disabled={!isEditing}
                          value={job.fixedSalary}
                          onChange={(e) => handleInputChange(job._id, "fixedSalary", e.target.value)}
                        />
                      </div>
                    ) : (
                      <div className="salary-range-fields">
                        <div className="salary-input-wrapper">
                          <span className="currency-symbol">₹</span>
                          <input
                            type="number"
                            placeholder="Min"
                            disabled={!isEditing}
                            value={job.salaryFrom}
                            onChange={(e) => handleInputChange(job._id, "salaryFrom", e.target.value)}
                          />
                        </div>
                        <span className="range-splitter">to</span>
                        <div className="salary-input-wrapper">
                          <span className="currency-symbol">₹</span>
                          <input
                            type="number"
                            placeholder="Max"
                            disabled={!isEditing}
                            value={job.salaryTo}
                            onChange={(e) => handleInputChange(job._id, "salaryTo", e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* DESCRIPTION */}
                  <div className="manage-card-desc">
                    <label>Job Description</label>
                    <textarea
                      rows={3}
                      disabled={!isEditing}
                      value={job.description}
                      onChange={(e) => handleInputChange(job._id, "description", e.target.value)}
                    />
                  </div>

                  {/* PREMIUM ACTIONS COMPONENT */}
                  <div className="manage-card-actions">
                    {isEditing ? (
                      <div className="editing-action-box">
                        <button className="p-action-btn p-save-btn" onClick={() => handleUpdateJob(job._id)} title="Save Updates">
                          <FaCheck /> Confirm
                        </button>
                        <button className="p-action-btn p-cancel-btn" onClick={handleDisableEdit} title="Cancel Editing">
                          <RxCross2 /> Cancel
                        </button>
                      </div>
                    ) : (
                      <button className="p-action-btn p-edit-btn" onClick={() => handleEnableEdit(job._id)}>
                        Edit Details
                      </button>
                    )}
                    <button className="p-action-btn p-delete-btn" onClick={() => handleDeleteJob(job._id)}>
                      Delete Listing
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;