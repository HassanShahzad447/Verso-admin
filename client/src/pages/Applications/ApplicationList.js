import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { fetchJobs } from '../../services/jobService';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import 'react-toastify/dist/ReactToastify.css';

const ApplicationList = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(4);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const result = await fetchJobs();
        const sortedJobs = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setJobs(sortedJobs || []);
        setTotalPages(Math.ceil(sortedJobs.length / limit));
      } catch (error) {
        toast.error('Failed to fetch jobs');
      }
    };
    loadJobs();
  }, [limit]);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (job.skillsRequirement && typeof job.skillsRequirement === 'string'
      ? job.skillsRequirement.toLowerCase().includes(searchQuery.toLowerCase())
      : Array.isArray(job.skillsRequirement)
      ? job.skillsRequirement.join(' ').toLowerCase().includes(searchQuery.toLowerCase())
      : false)
  );

  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  return (
    <div className="application-list-container">
      <div className="text-center">
        <div className="p-4 pt-5">
          <div className="card shadow rounded-lg">
            <div className="card-header d-flex justify-content-between align-items-center bg-dark text-white">
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
                />
              </div>

              {/* Cards for Jobs */}
              <div className="row">
                {paginatedJobs.length > 0 ? (
                  paginatedJobs.map((job) => (
                    <div className="col-md-4" key={job._id}>
                      <div className="card job-card mb-4 shadow-sm">
                        <div className="card-body">
                          <h5 className="card-title text-dark">{job.title || 'N/A'}</h5>
                          <p className="card-text">
                            <strong>Last Date to Apply:</strong> {job.lastDateToApply ? new Date(job.lastDateToApply).toLocaleDateString() : 'N/A'}
                          </p>
                          <p className="card-text">
                            <strong>Location:</strong> {job.location || 'N/A'}
                          </p>
                          <p className="card-text">
                            <strong>Skills Required:</strong> {job.skillsRequirement ? job.skillsRequirement : 'N/A'}
                          </p>
                          <p className="card-text">
                            <strong>Salary Range:</strong> {job.salaryRange ? `₨${job.salaryRange.min} - ₨${job.salaryRange.max}` : 'N/A'}
                          </p>
                          <Link to={`/applicants/${job._id}`} className="btn btn-dark btn-block">View Applicants</Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No jobs found</p>
                )}
              </div>

              {/* Pagination */}
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
                    >
                      Previous
                    </button>
                  </li>
                  <span className="page-text">
                    Page {page} of {totalPages}
                  </span>
                  <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage))}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default ApplicationList;
