import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchApplicants } from '../../services/ApplicationService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApplicantDetailsModal from './ApplicantDetailsModal'; 
const Applicants = () => {
  const { jobId } = useParams(); // Get the jobId from the URL
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedApplicant, setSelectedApplicant] = useState(null); // Store selected applicant for modal
  useEffect(() => {
    const loadApplicants = async () => {
      try {
        const result = await fetchApplicants(jobId);
        setApplicants(result);
        setTotalPages(Math.ceil(result.length / limit)); // Update total pages based on fetched data
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Failed to fetch applicants:', error);
      }
    };
    loadApplicants();
  }, [jobId, limit]);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedApplicants = applicants.slice(startIndex, endIndex);
  if (loading) {
    return <p>Loading applicants...</p>;
  }

  const handleApplicantClick = (applicant) => {
    setSelectedApplicant(applicant); // Set the clicked applicant for modal
  };

  const handleCloseModal = () => {
    setSelectedApplicant(null); 
  };

  const handleActionClick = (e) => {
    e.stopPropagation(); 
  };
  return (
    <div className="container mt-4">
      <ToastContainer />
      <div className="p-4 pt-5">
        <div className="card shadow-lg rounded-lg border-0">
          <div className="card-header d-flex justify-content-between align-items-center text-white rounded-top" style={{ backgroundColor: '#212529' }}>
            <h5 className="mb-0">Applicants for the job</h5>
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Location</th>
                  <th>Experience</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedApplicants.length > 0 ? (
                  paginatedApplicants.map((applicant, index) => (
                    <tr
                      key={applicant._id}
                      onClick={() => handleApplicantClick(applicant)} 
                      style={{ cursor: 'pointer' }}
                    >
                      <td>{startIndex + index + 1}</td>
                      <td>{applicant.firstName} {applicant.lastName}</td>
                      <td>{applicant.email}</td>
                      <td>{applicant.phoneNumber}</td>
                      <td>{applicant.location}</td>
                      <td>{applicant.yearsOfExperience}</td>
                      <td>
                        {/* CV Button without triggering modal */}
                        <a href={applicant.cv} target="_blank" rel="noopener noreferrer">
                          <button className="btn btn-primary btn-sm" 
                          style={{ backgroundColor: '#212529',borderColor:'#212529' }}
                          onClick={handleActionClick}>
                            View CV
                          </button>
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">No applicants found for this job.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                <li 
                                    className={`page-item ${page === 1 ? 'disabled' : ''}`}
                                    style={{ margin: '0 10px', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
                                        disabled={page === 1}
                                        style={{
                                            backgroundColor: '#212529',
                                            borderColor: '',
                                            color: '#fff',
                                            transition: 'background-color 0.3s ease',
                                        }}
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
                                        className="page-link"
                                        onClick={() => setPage(prevPage => (prevPage < totalPages ? prevPage + 1 : prevPage))}
                                        disabled={page === totalPages}
                                        style={{
                                            backgroundColor: '#212529',
                                            borderColor: '#212529',
                                            color: '#fff',
                                            transition: 'background-color 0.3s ease',
                                        }}
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
      </div>
      {selectedApplicant && <ApplicantDetailsModal applicant={selectedApplicant} onClose={handleCloseModal} />}
    </div>
  );
};
export default Applicants;
