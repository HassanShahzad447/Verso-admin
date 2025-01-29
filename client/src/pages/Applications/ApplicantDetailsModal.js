import React from 'react';
import PropTypes from 'prop-types';

const ApplicantDetailsModal = ({ applicant, onClose }) => {
  if (!applicant) return null; // If no applicant, don't render the modal

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Applicant Details</h5>
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row mb-3">
              <div className="col-md-4">
                <h6>Name</h6>
                <p>{applicant.firstName} {applicant.lastName}</p>
              </div>
              <div className="col-md-4">
                <h6>Email</h6>
                <p>{applicant.email}</p>
              </div>
              <div className="col-md-4">
                <h6>Phone</h6>
                <p>{applicant.phoneNumber}</p>
              </div>
            </div>

            <div className="mb-3">
              <h6>Cover Letter</h6>
              <pre>{applicant.coverLetter}</pre>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <h6>LinkedIn</h6>
                <a href={applicant.linkedin} target="_blank" rel="noopener noreferrer">
                  <button className="btn btn-info w-100">View LinkedIn</button>
                </a>
              </div>
              <div className="col-md-4">
                <h6>Portfolio</h6>
                <a href={applicant.portfolio} target="_blank" rel="noopener noreferrer">
                  <button className="btn btn-success w-100">View Portfolio</button>
                </a>
              </div>
              <div className="col-md-4">
                <h6>CV</h6>
                <a href={applicant.cv} target="_blank" rel="noopener noreferrer">
                  <button className="btn btn-primary w-100">View CV</button>
                </a>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

ApplicantDetailsModal.propTypes = {
  applicant: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default ApplicantDetailsModal;
