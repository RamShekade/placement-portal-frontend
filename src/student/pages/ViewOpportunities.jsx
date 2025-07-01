import React from "react";
import CollegeHeader from "../../shared/CollegeHeader";
import { useNavigate } from "react-router-dom";

import aurionpro from "../../assets/images/auri.jpeg";
import cap from "../../assets/images/cap.png";
import tcs from "../../assets/images/tcs.png";
import delo from "../../assets/images/delo.png";
import ibm from "../../assets/images/ibm.png";

import "./ViewOpportunities.css";

const dummyJobs = [
  {
    id: 1,
    company: "Deloitte",
    role: "Business Analyst",
    type: "Non-Tech",
    date: "25-06-2025",
    description: "Assist in analyzing business needs and identifying improvement opportunities."
  },
  {
    id: 2,
    company: "Capgemini",
    role: "Software Engineer",
    type: "Tech",
    date: "23-07-2025",
    description: "Develop scalable software solutions using modern technologies."
  },
  {
    id: 3,
    company: "TCS",
    role: "Intern Developer",
    type: "Tech",
    date: "01-08-2025",
    description: "Join as a trainee developer and assist in real-time application development."
  },
  {
    id: 4,
    company: "IBM",
    role: "Data Analyst",
    type: "Tech",
    date: "10-08-2025",
    description: "Analyze and interpret complex data sets for business decisions."
  },
  {
    id: 5,
    company: "Aurionpro",
    role: "Web Developer",
    type: "Tech",
    date: "15-08-2025",
    description: "Design and maintain modern web applications with responsive features."
  },
  {
    id: 6,
    company: "Amazon",
    role: "Cloud Associate",
    type: "Tech",
    date: "20-08-2025",
    description: "Work on AWS cloud infrastructure and support deployment solutions."
  }
];

const companyLogos = {
  Deloitte: delo,
  Capgemini: cap,
  TCS: tcs,
  IBM: ibm,
  Aurionpro: aurionpro,
  Amazon: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
};

const ViewOpportunities = () => {
  const navigate = useNavigate();

  return (
    <div className="view-opportunities">
      <CollegeHeader />

      <div className="oppo-main">
        <h2 className="oppo-title">
          Campus Placement Opportunities
        </h2>
        <div className="oppo-underline" />

        <div className="jobs-grid">
          {dummyJobs.map((job) => (
            <div
              key={job.id}
              className="job-card"
              tabIndex={0}
              onClick={() => navigate(`/opportunity/${job.id}`)}
            >
              <div className="job-card-header">
                <img
                  src={companyLogos[job.company]}
                  alt={job.company}
                  className="job-company-logo"
                  loading="lazy"
                />
                <h3 className="job-company">{job.company}</h3>
              </div>
              <div className="job-card-body">
                <div className="job-row">
                  <span className="job-label">Role:</span>
                  <span className="job-value">{job.role}</span>
                </div>
                <div className="job-row">
                  <span className={`job-type job-type-${job.type === "Tech" ? "tech" : "nontech"}`}>
                    {job.type}
                  </span>
                  <span className="job-date">
                    <span className="job-label">Drive Date:</span> {job.date}
                  </span>
                </div>
                <div className="job-desc">
                  <span className="job-label">Description: </span>
                  {job.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer with Recruiter Logos */}
      <footer className="oppo-footer">
        <h3 className="recruiters-title">🤝 Our Recruiters</h3>
        <div className="logos-marquee">
          <div className="logos-marquee-track">
            {[aurionpro, cap, tcs, delo, ibm].map((logo, i) => (
              <img
                key={i}
                src={logo}
                alt="Recruiter Logo"
                className="recruiter-logo"
                loading="lazy"
              />
            ))}
            {/* Duplicate for smoother looping */}
            {[aurionpro, cap, tcs, delo, ibm].map((logo, i) => (
              <img
                key={i + 10}
                src={logo}
                alt="Recruiter Logo"
                className="recruiter-logo"
                loading="lazy"
              />
            ))}
              {[aurionpro, cap, tcs, delo, ibm].map((logo, i) => (
              <img
                key={i + 10}
                src={logo}
                alt="Recruiter Logo"
                className="recruiter-logo"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ViewOpportunities;