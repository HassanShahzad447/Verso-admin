import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import ModalComponent from './Modal';
import { fetchJobs, deleteJob } from '../../services/jobService';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

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
    job.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   navigate('/');
  // };

  const handleAddJob = () => {
    navigate('/job');
  };

  const handleDelete = async () => {
    try {
      await deleteJob(jobToDelete._id);
      toast.success('Job deleted successfully');
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobToDelete._id));
      setShowModal(false);
    } catch (error) {
      toast.error('Failed to delete job');
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0 rounded " >
      <div
  className="card-header text-white d-flex justify-content-between align-items-center"
  style={{ backgroundColor: '#212529' }}
>
          <h5 className="mb-0">Jobs</h5>
          <button
            className="btn btn-light"
            onClick={handleAddJob}
            style={{
              transition: 'transform 0.3s ease',
          
            }}
          >
            Add Job
          </button>
        </div>
        <div className="card-body">
          <div className="mb-4">
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Search by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ maxWidth: '100%', margin: '0 auto' }}
            />
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th style={{ width: '150px' }}>Last Date to Apply</th> 
                  <th>Location</th>
                  <th>Salary Range</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedJobs.length > 0 ? (
                  paginatedJobs.map((job, index) => (
                    <tr key={job._id}>
                      <td>{startIndex + index + 1}</td>
                      <td>{job.title || 'N/A'}</td>
                      <td>{job.skillsRequirement ? job.skillsRequirement.join(', ') : 'N/A'}</td>
                      <td>{job.lastDateToApply ? new Date(job.lastDateToApply).toLocaleDateString() : 'N/A'}</td>
                      <td>{job.location || 'N/A'}</td>
                      <td>{job.salaryRange ? `₨${job.salaryRange.min} - ₨${job.salaryRange.max}` : 'N/A'}</td>
                      <td>
                        <button
                          onClick={() => navigate(`/update/${job._id}`)}
                          className="btn btn-warning btn-sm me-2"
                          style={{ transition: 'transform 0.3s ease' }}
                          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        >
                          <i className="fas fa-edit"></i> 
                        </button>

                        <button
                          onClick={() => {
                            setJobToDelete(job);
                            setShowModal(true);
                          }}
                          className="btn btn-danger btn-sm"
                          style={{ transition: 'transform 0.3s ease' }}
                          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        >
                          <i className="fas fa-trash"></i> 
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">No jobs found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center" style={{ paddingTop: '20px' }}>
              <li
                className={`page-item ${page === 1 ? 'disabled' : ''}`}
                style={{ margin: '0 10px', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
              >
                <button
                  className="page-link custom-pagination-button"
                  style={{
                    backgroundColor: '#212529',
                    borderColor: '#212529',
                    color: '#fff',
                    transition: 'transform 0.3s ease, background-color 0.3s ease',
                  }}
                  onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                  <i className="fas fa-arrow-left"></i>
                </button>
              </li>
              <li className="page-item" style={{ margin: '0 10px' }}>
                <span
                  className="page-link page-indicator"
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#212529',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#0056b3'}
                  onMouseLeave={(e) => e.target.style.color = '#007bff'}
                >
                  Page {page} of {totalPages}
                </span>
              </li>
              <li
                className={`page-item ${page === totalPages ? 'disabled' : ''}`}
                style={{ margin: '0 10px', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
              >
                <button
                  className="page-link custom-pagination-button"
                  style={{
                    backgroundColor: '#212529',
                    borderColor: '#212529',
                    color: '#fff',
                    transition: 'transform 0.3s ease, background-color 0.3s ease',
                  }}
                  onClick={() => setPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage))}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                  <i className="fas fa-arrow-right"></i> 
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <ModalComponent
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Delete Job"
        message="Are you sure you want to delete this job?"
      />
      <ToastContainer />
    </div>
  );
}
