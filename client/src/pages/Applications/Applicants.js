import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchApplicants } from '../../services/ApplicationService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApplicantDetailsModal from './ApplicantDetailsModal'; // Import the modal component

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
    setSelectedApplicant(null); // Close the modal
  };

  // Prevent opening the modal when the action buttons are clicked
  const handleActionClick = (e) => {
    e.stopPropagation(); // Stop event from bubbling up to row
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <div className="p-4 pt-5">
        <div className="card shadow">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Applicants for the job</h5>
          </div>
          <div className="card-body">
            <table className="table">
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
                      onClick={() => handleApplicantClick(applicant)} // Open modal on row click
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
                          <button className="btn btn-dark btn-sm" onClick={handleActionClick}>
                            VIEW CV
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

            {/* Pagination */}
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-start">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
                    disabled={page === 1}
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
                    onClick={() => setPage(prevPage => (prevPage < totalPages ? prevPage + 1 : prevPage))}
                    disabled={page === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Render the modal component */}
      {selectedApplicant && <ApplicantDetailsModal applicant={selectedApplicant} onClose={handleCloseModal} />}
    </div>
  );
};

export default Applicants;
