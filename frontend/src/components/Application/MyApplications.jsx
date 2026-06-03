import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import { FiEye, FiTrash2, FiPhone, FiMapPin, FiMail } from "react-icons/fi";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/");
    }
  }, [isAuthorized, navigate]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const endpoint =
          user?.role === "Employer"
            ? "http://localhost:4000/api/v1/application/employer/getall"
            : "http://localhost:4000/api/v1/application/jobseeker/getall";

        const { data } = await axios.get(endpoint, {
          withCredentials: true,
        });

        setApplications(data.applications);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load applications"
        );
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchApplications();
    }
  }, [user]);

  useEffect(() => {
    const handleBackButton = () => {
      setModalOpen(false);
    };

    if (modalOpen) {
      window.addEventListener("popstate", handleBackButton);
    }

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [modalOpen]);

  const deleteApplication = async (id) => {
    if (!window.confirm("Are you sure you want to remove this application?")) return;
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/application/delete/${id}`,
        { withCredentials: true }
      );

      toast.success(data.message);
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete application"
      );
    }
  };

  const openModal = (url) => {
    window.history.pushState({ modalOpened: true }, "");
    setResumeImageUrl(url);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    if (window.history.state?.modalOpened) {
      window.history.back();
    }
  };

  return (
    <section className="premium-app-page">
      <div className="premium-app-container">
        
        <div className="premium-app-header">
          <div>
            <h1 className="p-title">
              {user?.role === "Job Seeker"
                ? "My Applications"
                : "Candidate Submissions"}
            </h1>
            <p className="p-subtitle">
              Manage, review, and track records of submitted profiles.
            </p>
          </div>
          <div className="p-counter">
            <span className="counter-num">{applications.length}</span>
            <span className="counter-label">Total</span>
          </div>
        </div>

        {loading ? (
          <div className="p-loading-box">
            <div className="premium-spinner"></div>
            <p>Fetching dynamic application database...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="premium-empty-box">
            <div className="empty-icon">📂</div>
            <h3>No Records Available</h3>
            <p>There are currently no applications listed in this category.</p>
          </div>
        ) : (
          <div className="premium-app-grid">
            {applications.map((application) => (
              <div className="premium-app-card" key={application._id}>
                
                {/* CARD OVERVIEW BLOCK */}
                <div className="p-card-top">
                  <div className="p-avatar">
                    {application.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="p-meta-ident">
                    <h2>{application.name}</h2>
                    <p className="p-email-row"><FiMail /> {application.email}</p>
                  </div>
                  <span className="p-status-tag">Received</span>
                </div>

                {/* CARD BODY CONTENTS */}
                <div className="p-card-body">
                  <div className="p-resume-thumb" onClick={() => openModal(application.resume?.url)}>
                    <img src={application.resume?.url} alt="Resume Snapshot" />
                    <div className="thumb-overlay">
                      <FiEye /> Quick View
                    </div>
                  </div>

                  <div className="p-details-pane">
                    <p className="p-info-item">
                      <FiPhone className="i-icon" /> <span><strong>Phone:</strong> {application.phone}</span>
                    </p>
                    <p className="p-info-item">
                      <FiMapPin className="i-icon" /> <span><strong>Location:</strong> {application.address}</span>
                    </p>
                    
                    <div className="p-cover-box">
                      <label>Cover Letter Statement</label>
                      <div className="cover-scroller">
                        {application.coverLetter}
                      </div>
                    </div>
                  </div>
                </div>

                {/* FOOTER BUTTON CONTROLS */}
                <div className="p-card-footer">
                  <button className="footer-action-btn view" onClick={() => openModal(application.resume?.url)}>
                    <FiEye /> View Document
                  </button>

                  {user?.role === "Job Seeker" && (
                    <button className="footer-action-btn delete" onClick={() => deleteApplication(application._id)}>
                      <FiTrash2 /> Withdraw
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;