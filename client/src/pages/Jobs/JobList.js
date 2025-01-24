import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(4); // Set the number of jobs per page
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_BackendURL; 

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${backendURL}/api/jobs`);

        if (response.ok) {
          const result = await response.json();
          console.log('Fetched jobs:', result);
          setJobs(result || []);
          setTotalPages(Math.ceil(result.length / limit)); // Calculate total pages
          console.log('Jobs state updated:', result || []);
        } else {
          console.error('Failed to fetch jobs:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  // Calculate the jobs to display based on the current page
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // Filter jobs based on search query
  const filteredJobs = jobs.filter(job => 
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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this job?');
    if (confirmDelete) {
      try {
        const response = await fetch(`${backendURL}/api/jobs/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete job');
        alert('Job deleted successfully');
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
      } catch (err) {
        console.error('Error deleting job:', err.message);
      }
    }
  };

  return (
    <div>
      <div className="text-center">
        <div className='p-4 pt-5'>
          <div className="card shadow">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Jobs</h5>
              <a href="# " onClick={handleAddJob} className="btn btn-primary">Add Job</a>
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
                  style={{ width: '50%' }} // Set width to 50% and left-align it
                />
              </div>
              <table className="table">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Last Date to Apply</th>
                    <th>Location</th>
                    <th>Salary Range</th>
                    <th>Skills</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedJobs.length > 0 ? (
                    paginatedJobs.map((job, index) => (
                      <tr key={job._id}>
                        <td>{startIndex + index + 1}</td>
                        <td>{parse(job.title || 'N/A')}</td>
                        <td>{job.description || 'N/A'}</td>
                        <td>{job.lastDateToApply ? new Date(job.lastDateToApply).toLocaleDateString() : 'N/A'}</td>
                        <td>{job.location || 'N/A'}</td>
                        <td>{job.salaryRange ? `$${job.salaryRange.min} - $${job.salaryRange.max}` : 'N/A'}</td>
                        <td>{job.skillsRequirement ? job.skillsRequirement.join(', ') : 'N/A'}</td>
                        <td>
                          <button onClick={() => navigate(`/update/${job._id}`)} className="view-button">Update</button>
                          <button onClick={() => handleDelete(job._id)} className="view-button">Delete</button>
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
                    <button className="page-link" onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))} disabled={page === 1}>
                      Previous
                    </button>
                  </li>
                  <span>Page {page} of {totalPages}</span>
                  <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setPage(prevPage => (prevPage < totalPages ? prevPage + 1 : prevPage))} disabled={page === totalPages}>
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
