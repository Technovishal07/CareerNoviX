import React from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div className="resume-modal-overlay">
      <div className="resume-modal">

        <button
          className="resume-back-btn"
          onClick={onClose}
        >
          ← Back
        </button>

        <button
          className="resume-close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <img src={imageUrl} alt="Resume" />
      </div>
    </div>
  );
};

export default ResumeModal;