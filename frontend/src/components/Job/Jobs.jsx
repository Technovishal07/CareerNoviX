import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/job/getall", { withCredentials: true })
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobs-section">
      <div className="jobs-container">
        <h1 className="jobs-heading">ALL AVAILABLE JOBS</h1>

        <div className="jobs-grid">
          {jobs.jobs && jobs.jobs.length > 0 ? (
            jobs.jobs.map((element) => (
              <div className="job-card" key={element._id}>
                <h2 className="job-title">{element.title}</h2>
                <p className="job-info">
                  <span>Category:</span> {element.category}
                </p>
                <p className="job-info">
                  <span>Country:</span> {element.country}
                </p>

                <Link to={`/job/${element._id}`} className="job-btn">
                  Job Details
                </Link>
              </div>
            ))
          ) : (
            <p className="empty-msg">No jobs available right now.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
