import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { toast, ToastContainer } from 'react-toastify';
import ModalComponent from './Modal';
import { fetchJobs, deleteJob } from '../../services/jobService'; 
import 'react-toastify/dist/ReactToastify.css';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(4);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const result = await fetchJobs(); // Call JobService to fetch jobs
        console.log('Fetched jobs:', result);
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
    job.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleAddJob = () => {
    navigate('/job');
  };

  const handleDelete = async () => {
    try {
      await deleteJob(jobToDelete._id); // Call JobService to delete the job
      toast.success('Job deleted successfully');
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobToDelete._id));
      setShowModal(false);
    } catch (error) {
      toast.error('Failed to delete job');
    }
  };

  return (
    <div>
      <div className="text-center">
        <div className="p-4 pt-5">
          <div className="card shadow">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Jobs</h5>
              <a href="# " onClick={handleAddJob} className="btn btn-primary">
                Add Job
              </a>
            </div>
            <div className="card-body">
              {/* Search Bar */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by title or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '50%' }}
                />
              </div>
              <table className="table">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Last Date to Apply</th>
                    <th>Location</th>
                    <th>Salary Range</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedJobs.length > 0 ? (
                    paginatedJobs.map((job, index) => (
                      <tr key={job._id}>
                        <td>{startIndex + index + 1}</td>
                        <td>{job.title || 'N/A'}</td>
                        <td>
                          {job.skillsRequirement ? job.skillsRequirement.join(', ') : 'N/A'}
                        </td>
                        <td>{job.lastDateToApply ? new Date(job.lastDateToApply).toLocaleDateString() : 'N/A'}</td>
                        <td>{job.location || 'N/A'}</td>
                        <td>
                          {job.salaryRange
                            ? `₨${job.salaryRange.min} - ₨${job.salaryRange.max}`
                            : 'N/A'}
                        </td>
                        
                        <td>
                          <button
                            onClick={() => navigate(`/update/${job._id}`)}
                            className="view-button"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => {
                              setJobToDelete(job);
                              setShowModal(true);
                            }}
                            className="view-button"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8">No jobs found</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-start">
                  <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
                    >
                      Previous
                    </button>
                  </li>
                  <span>
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

      {/* Modal for Confirmation */}
      <ModalComponent
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Delete Job"
        message="Are you sure you want to delete this job?"
      />

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
