import React from "react";
import CollegeHeader from "../../shared/CollegeHeader";
import './ViewApplicationStatus.css';


const ViewApplicationStatus = () => {
  const applications = [
    {
      company: "TCS",
      position: "Software Developer Intern",
      dateApplied: "2025-06-15",
      status: "Under Review",
    },
    {
      company: "Capgemini",
      position: "Frontend Developer",
      dateApplied: "2025-06-12",
      status: "Selected",
    },
    {
      company: "Deloitte",
      position: "Data Analyst Intern",
      dateApplied: "2025-06-10",
      status: "Rejected",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Under Review":
        return "status-badge status-underreview";
      case "Selected":
        return "status-badge status-selected";
      case "Rejected":
        return "status-badge status-rejected";
      default:
        return "status-badge";
    }
  };

  return (
    <div className="status-page">
      <CollegeHeader />
      <div className="status-container">
        <h2 className="status-title"> Application Status</h2>
        <div className="status-table-wrapper">
          <table className="status-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Position</th>
                <th>Date Applied</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={index}>
                  <td>{app.company}</td>
                  <td>{app.position}</td>
                  <td>{app.dateApplied}</td>
                  <td>
                    <span className={getStatusClass(app.status)}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicationStatus;
