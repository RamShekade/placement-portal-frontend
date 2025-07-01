import React from "react";
import { useParams } from "react-router-dom";
import CollegeHeader from "../../shared/CollegeHeader";
import "./FullViewOpportunities.css";
import { FaPaperPlane } from "react-icons/fa"; // ✅ Import icon


const dummyDetails = {
  3: {
    company: "TCS",
    role: "Software Engineer Intern",
    location: "Bangalore",
    type: "Full-time",
    batch: "2026",
    tenth: "60%",
    twelfth: "60%",
    diploma: "60%",
    cgpa: "7.5",
    backlogs: "1 Live KT",
    branches: "IT, CSE, ECE",
    openings: "5",
    rounds: "Online Test, Technical, HR",
    date: "01-07-2025",
    mode: "Online",
    stipend: "₹25,000",
    ctc: "₹7 LPA",
    perks: "Health Insurance, Laptop",
    description:
      "As a Software Engineer Intern, you will collaborate with cross-functional teams to develop features, maintain codebases, and assist in debugging. Proficiency in React, JavaScript, and basic DSA is expected.",
  },
  // You can add more dummy job details for other ids if you want.
};

const FullViewOpportunities = () => {
  const { id } = useParams();
  const job = dummyDetails[id] || dummyDetails[3];

  return (
    <div className="fullview-bg">
      <CollegeHeader />

      <div className="fv-container">
        {/* Company Header */}
        <header className="fv-header">
          <h1>
            {job.company} - {job.role}
          </h1>
          <p>
            📍 {job.location} | 💼 {job.type}
          </p>
        </header>

        <main className="fv-content">
          {/* Job Description */}
          <section className="fv-section">
            <h2>📄 Job Description</h2>
            <p>{job.description}</p>
          </section>

          {/* Details Grid */}
          <section className="fv-details-grid">
            <div className="fv-detail"><span> Location</span><span>{job.location}</span></div>
            <div className="fv-detail"><span> Type</span><span>{job.type}</span></div>
            <div className="fv-detail"><span> Batch</span><span>{job.batch}</span></div>
            <div className="fv-detail"><span> 10th %</span><span>{job.tenth}</span></div>
            <div className="fv-detail"><span> 12th %</span><span>{job.twelfth}</span></div>
            <div className="fv-detail"><span> Diploma %</span><span>{job.diploma}</span></div>
            <div className="fv-detail"><span> Min CGPA</span><span>{job.cgpa}</span></div>
            <div className="fv-detail"><span> Backlogs</span><span>{job.backlogs}</span></div>
            <div className="fv-detail"><span> Branches</span><span>{job.branches}</span></div>
            <div className="fv-detail"><span> Openings</span><span>{job.openings}</span></div>
            <div className="fv-detail"><span> Rounds</span><span>{job.rounds}</span></div>
            <div className="fv-detail"><span> Drive Date</span><span>{job.date}</span></div>
            <div className="fv-detail"><span> Mode</span><span>{job.mode}</span></div>
            <div className="fv-detail"><span> Stipend</span><span>{job.stipend}</span></div>
            <div className="fv-detail"><span> CTC</span><span>{job.ctc}</span></div>
            <div className="fv-detail"><span> Perks</span><span>{job.perks}</span></div>
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