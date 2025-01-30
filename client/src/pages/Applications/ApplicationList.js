import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { fetchJobs } from "../../services/jobService";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ApplicationList = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const result = await fetchJobs();
        const sortedJobs = result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setJobs(sortedJobs || []);
        setTotalPages(Math.ceil(sortedJobs.length / limit));
      } catch (error) {
        toast.error("Failed to fetch jobs");
      }
    };
    loadJobs();
  }, [limit]);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.skillsRequirement && typeof job.skillsRequirement === "string"
        ? job.skillsRequirement
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        : Array.isArray(job.skillsRequirement)
        ? job.skillsRequirement
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        : false)
  );

  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  return (
    <div className="application-list-container">
      <div className="text-center">
        <div className="p-4 pt-5">
          <div className="card shadow-lg rounded-lg border-0">
            <div
              className="card-header d-flex justify-content-between align-items-center text-white rounded-top"
              style={{ backgroundColor: "#212529" }}
            >
              <h5 className="mb-0">Job Applications</h5>
            </div>
            <div className="card-body">
              {/* Search Bar */}
              <div className="search-bar-container mb-4">
                <input
                  type="text"
                  className="form-control search-bar"
                  placeholder="Search by title, skills, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    borderRadius: "30px",
                    padding: "10px 15px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </div>
              <div className="row">
                {paginatedJobs.length > 0 ? (
                  paginatedJobs.map((job) => (
                    <div
                      className="col-md-4 col-sm-6 col-12 mb-4"
                      key={job._id}
                    >
                      <div
                        className="card job-card shadow-sm h-100"
                        style={{ borderRadius: "15px", padding: "15px" }}
                      >
                        <div className="card-body">
                          <h6
                            className="card-title text-dark"
                            style={{ fontSize: "16px", fontWeight: "600" }}
                          >
                            {job.title || "N/A"}
                          </h6>
                          <p
                            className="card-text mb-2"
                            style={{ fontSize: "14px" }}
                          >
                            <strong>Last Date to Apply:</strong>{" "}
                            {job.lastDateToApply
                              ? new Date(
                                  job.lastDateToApply
                                ).toLocaleDateString()
                              : "N/A"}
                          </p>
                          <p
                            className="card-text mb-2"
                            style={{ fontSize: "14px" }}
                          >
                            <strong>Location:</strong> {job.location || "N/A"}
                          </p>
                          <p
                            className="card-text mb-2"
                            style={{ fontSize: "14px" }}
                          >
                            <strong>Skills Required:</strong>{" "}
                            {job.skillsRequirement
                              ? job.skillsRequirement
                              : "N/A"}
                          </p>
                          <p
                            className="card-text mb-3"
                            style={{ fontSize: "14px" }}
                          >
                            <strong>Salary Range:</strong>{" "}
                            {job.salaryRange
                              ? `₨${job.salaryRange.min} - ₨${job.salaryRange.max}`
                              : "N/A"}
                          </p>
                          <Link
                            to={`/applicants/${job._id}`}
                            className="btn btn-primary btn-block rounded-pill"
                            style={{
                              backgroundColor: "#212529",
                              borderColor: "#212529",
                              fontSize: "14px",
                              padding: "6px 12px",
                            }}
                          >
                            View Applicants
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No jobs found</p>
                )}
              </div>
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${page === 1 ? "disabled" : ""}`}
                    style={{
                      margin: "0 10px",
                      cursor: page === 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        setPage((prevPage) => Math.max(prevPage - 1, 1))
                      }
                      disabled={page === 1}
                      style={{
                        backgroundColor: "#212529",
                        borderColor: "#212529",
                        color: "#fff",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      <i className="fas fa-arrow-left"></i>
                    </button>
                  </li>
                  <li className="page-item" style={{ margin: "0 10px" }}>
                    <span
                      className="page-link page-indicator"
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#212529",
                      }}
                    >
                      Page {page} of {totalPages}
                    </span>
                  </li>
                  <li
                    className={`page-item ${
                      page === totalPages ? "disabled" : ""
                    }`}
                    style={{
                      margin: "0 10px",
                      cursor: page === totalPages ? "not-allowed" : "pointer",
                    }}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        setPage((prevPage) =>
                          prevPage < totalPages ? prevPage + 1 : prevPage
                        )
                      }
                      disabled={page === totalPages}
                      style={{
                        backgroundColor: "#212529",
                        borderColor: "#212529",
                        color: "#fff",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ApplicationList;
