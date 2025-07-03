import React from "react";
import { useLocation } from "react-router-dom";
import CollegeHeader from "../../shared/CollegeHeader";
import "./FullViewOpportunities.css";
import { FaPaperPlane } from "react-icons/fa";

const FullViewOpportunities = () => {
  const location = useLocation();
  const job = location.state?.job;

  if (!job) {
    return (
      <div className="fullview-bg">
        <CollegeHeader />
        <div className="fv-container">
          <h2 style={{ margin: "2rem" }}>Job details not found.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="fullview-bg">
      <CollegeHeader />

      <div className="fv-container">
        {/* Company Header */}
        <header className="fv-header">
          <h1>
            {job.company} - {job.role || job.job_title}
          </h1>
          <p>
            📍 {job.location || job.job_location || "-"} | 💼 {job.type || job.jobType || "-"}
          </p>
        </header>

        <main className="fv-content">
          {/* Job Description */}
          <section className="fv-section">
            <h2>📄 Job Description</h2>
            <p>{job.description || job.job_description}</p>
          </section>

          {/* Details Grid */}
          <section className="fv-details-grid">
            <div className="fv-detail"><span> Location</span><span>{job.location || job.job_location || "-"}</span></div>
            <div className="fv-detail"><span> Type</span><span>{job.type || job.jobType || "-"}</span></div>
            <div className="fv-detail"><span> Batch</span><span>{job.batch || "-"}</span></div>
            <div className="fv-detail"><span> 10th %</span><span>{job.tenth || job.tenth_percent || "-"}</span></div>
            <div className="fv-detail"><span> 12th %</span><span>{job.twelfth || job.twelfth_percent || "-"}</span></div>
            <div className="fv-detail"><span> Diploma %</span><span>{job.diploma || job.diploma_percent || "-"}</span></div>
            <div className="fv-detail"><span> Min CGPA</span><span>{job.cgpa || "-"}</span></div>
            <div className="fv-detail"><span> Backlogs</span><span>{job.backlogs || "-"}</span></div>
            <div className="fv-detail"><span> Branches</span><span>{job.branches || job.eligible_branches || "-"}</span></div>
            <div className="fv-detail"><span> Openings</span><span>{job.openings || "-"}</span></div>
            <div className="fv-detail"><span> Rounds</span><span>{job.rounds || job.selection_rounds || "-"}</span></div>
            <div className="fv-detail"><span> Drive Date</span><span>{job.date || job.drive_date || "-"}</span></div>
            <div className="fv-detail"><span> Mode</span><span>{job.mode || job.drive_mode || "-"}</span></div>
            <div className="fv-detail"><span> Stipend</span><span>{job.stipend || "-"}</span></div>
            <div className="fv-detail"><span> CTC</span><span>{job.ctc || job.salary_ctc || "-"}</span></div>
            <div className="fv-detail"><span> Perks</span><span>{job.perks || "-"}</span></div>
          </section>

          {/* Apply Button */}
          <div className="fv-apply-ctn">
            <button
              className="fv-apply-btn"
              onClick={() => alert("Application submitted successfully!")}
            >
              <FaPaperPlane style={{ marginRight: "8px" }} />
              Apply Now
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FullViewOpportunities;