import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import { FiEye, FiTrash2, FiPhone, FiMapPin, FiMail, FiLock } from "react-icons/fi";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const [accessDenied, setAccessDenied] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/");
    }
  }, [isAuthorized, navigate]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setAccessDenied(false);

        const endpoint =
          user?.role === "Employer"
            ? "http://localhost:4000/api/v1/application/employer/getall"
            : "http://localhost:4000/api/v1/application/jobseeker/getall";

        const token = localStorage.getItem("token");

        const { data } = await axios.get(endpoint, {
          withCredentials: true,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        setApplications(data.applications || []);
      } catch (error) {
        console.error("Fetch application failed:", error.response);
        
        // 🚨 Check karein agar error 403 Forbidden hai (Yaani Admin Key validation fail)
        if (error.response?.status === 403) {
          setAccessDenied(true);
        }
        
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

  const openModal = (url) => {
    if (!url) return toast.error("Document snapshot URL is unavailable!");
    window.history.pushState({ modalOpened: true }, "");
    setResumeImageUrl(url);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setResumeImageUrl("");
    if (window.history.state?.modalOpened) {
      window.history.back();
    }
  };

  // 🔒 SCREEN LAYOUT 1: Agar user bina Admin Key ke dekhne ki koshish karega
  if (accessDenied) {
    return (
      <section className="premium-app-page">
        <div className="premium-app-container" style={{ textAlign: "center", padding: "100px 20px" }}>
          <div style={{ fontSize: "50px", color: "#ef4444" }}><FiLock /></div>
          <h2 style={{ marginTop: "20px", color: "#1e293b" }}>Admin Access Required</h2>
          <p style={{ color: "#64748b", marginTop: "10px", maxWidth: "500px", margin: "10px auto" }}>
            Aapke paas is panel ko dekhne ki permissions nahi hain. Sirf wahi Employers applications dekh sakte hain jinhone login karte waqt sahi **Admin Key** lagayi thi.
          </p>
          <button 
            onClick={() => navigate("/")} 
            style={{ marginTop: "20px", padding: "10px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            Go to Home
          </button>
        </div>
      </section>
    );
  }

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
            {applications.map((application) => {
              const candidateName = application.name || application.applicantID?.name || "Anonymous Candidate";
              const candidateEmail = application.email || application.applicantID?.email || "No Email";
              const resumeUrl = application.resume?.url || "";

              return (
                <div className="premium-app-card" key={application._id}>
                  <div className="p-card-top">
                    <div className="p-avatar">{candidateName.charAt(0).toUpperCase()}</div>
                    <div className="p-meta-ident">
                      <h2>{candidateName}</h2>
                      <p className="p-email-row"><FiMail /> {candidateEmail}</p>
                    </div>
                    <span className="p-status-tag">Received</span>
                  </div>

                  <div className="p-card-body">
                    <div className="p-resume-thumb" onClick={() => resumeUrl && openModal(resumeUrl)}>
                      {resumeUrl ? <img src={resumeUrl} alt="Resume" /> : <div>⚠️ Resume Missing</div>}
                    </div>

                    <div className="p-details-pane">
                      <p className="p-info-item"><FiPhone /> <span><strong>Phone:</strong> {application.phone}</span></p>
                      <p className="p-info-item"><FiMapPin /> <span><strong>Location:</strong> {application.address}</span></p>
                      <div className="p-cover-box">
                        <label>Cover Letter Statement</label>
                        <div className="cover-scroller">{application.coverLetter}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-card-footer">
                    <button className="footer-action-btn view" onClick={() => openModal(resumeUrl)} disabled={!resumeUrl}>
                      <FiEye /> View Document
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {modalOpen && <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />}
    </section>
  );
};

export default MyApplications;