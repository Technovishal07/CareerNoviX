import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import { FiUser, FiMail, FiPhone, FiMapPin, FiUploadCloud, FiCheckCircle } from "react-icons/fi";

const Application = () => {
  const { isAuthorized, user } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "", coverLetter: "" });
  const [resume, setResume] = useState(null);
  const [fileError, setFileError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthorized === false) {
      navigate("/");
      return;
    }
    if (user && user.role === "Employer") {
      toast.error("Employers are not allowed to apply for jobs.");
      navigate("/");
      return;
    }
    if (user) {
      setFormData((prev) => ({ ...prev, name: user.name || "", email: user.email || "" }));
    }
  }, [user, isAuthorized, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError("");
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setFileError("Only PNG, JPG, JPEG and WEBP files are allowed.");
      setResume(null);
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setFileError("Resume size must be under 2MB.");
      setResume(null);
      return;
    }
    setResume(file);
  };

  const handleApplication = async (e) => {
    e.preventDefault();
    const { name, email, phone, address, coverLetter } = formData;

    if (!name || !email || !phone || !address || !coverLetter) {
      return toast.error("Please fill all required fields.");
    }
    if (!resume) return setFileError("Please upload your resume to proceed.");
    if (!id) return toast.error("Job Reference ID is missing from URL.");

    setLoading(true);
    try {
      const submitData = new FormData();
      submitData.append("name", name.trim());
      submitData.append("email", email.trim());
      submitData.append("phone", phone.trim());
      submitData.append("address", address.trim());
      submitData.append("coverLetter", coverLetter.trim());
      submitData.append("jobId", id);
      submitData.append("resume", resume);

      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        submitData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      toast.success(data.message || "Application Submitted Successfully!");
      navigate("/job/getall");
    } catch (error) {
      toast.error(error.response?.data?.message || "Application submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="premium-apply-page">
      <div className="premium-apply-container">
        <div className="premium-apply-header">
          <h1>Apply For This Position</h1>
          <p>Provide your up-to-date professional credentials to ensure evaluation.</p>
        </div>

        <form className="premium-apply-form" onSubmit={handleApplication}>
          <div className="premium-form-grid">
            <div className="premium-group">
              <label>Full Name</label>
              <div className="premium-input-wrapper">
                <FiUser className="input-icon" />
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
            </div>
            <div className="premium-group">
              <label>Email Address</label>
              <div className="premium-input-wrapper">
                <FiMail className="input-icon" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="premium-group">
              <label>Phone Number</label>
              <div className="premium-input-wrapper">
                <FiPhone className="input-icon" />
                <input type="tel" name="phone" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>
            <div className="premium-group">
              <label>Current Address</label>
              <div className="premium-input-wrapper">
                <FiMapPin className="input-icon" />
                <input type="text" name="address" placeholder="City, Country" value={formData.address} onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div className="premium-group">
            <label>Cover Letter</label>
            <textarea rows="6" name="coverLetter" placeholder="Express why you're a great fit..." value={formData.coverLetter} onChange={handleChange} required />
          </div>

          <div className={`premium-upload-zone ${resume ? "file-selected" : ""} ${fileError ? "has-error" : ""}`}>
            <input type="file" id="resume-upload" accept=".png,.jpg,.jpeg,.webp" onChange={handleFileChange} className="hidden-file-input" />
            <label htmlFor="resume-upload" className="upload-zone-label">
              {resume ? <FiCheckCircle className="upload-icon success" /> : <FiUploadCloud className="upload-icon" />}
              <div className="upload-text-block">
                <span className="upload-title">{resume ? "Resume uploaded successfully" : "Click to upload resume"}</span>
                <span className="upload-subtitle">PNG, JPG, JPEG, WEBP up to 2MB</span>
              </div>
            </label>
            {resume && <div className="attached-file-badge"><span>Attached:</span> {resume.name}</div>}
            {fileError && <p className="premium-error-msg">{fileError}</p>}
          </div>

          <button type="submit" className={`premium-submit-trigger ${loading ? "is-submitting" : ""}`} disabled={loading}>
            {loading ? "Processing Application..." : "Submit Application Package"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Application;