import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const backendURL = process.env.REACT_APP_BackendURL; 

const ApplicationList = () => {
    const [applications, setApplications] = useState([]); // State to hold application data
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit] = useState(4);

    const fetchApplications = async () => {
        try {
            const response = await fetch(`${backendURL}/api/job-applications`); // Updated to use backendURL
            const result = await response.json();
            if (result.data) {
                setApplications(result.data);
                setTotalPages(Math.ceil(result.data.length / limit)); // Update total pages based on fetched applications
            } else {
                toast.error('Failed to fetch applications');
            }
        } catch (error) {
            toast.error('Error fetching applications');
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    // Calculate the applications to display based on the current page
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedApplications = applications.slice(startIndex, endIndex);

    return (
        <div className="text-center">
            <ToastContainer />
            <div className="p-4 pt-5">
                <div className="card shadow">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Applications</h5>
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
                                    <th>Years of Experience</th>
                                    <th>CV</th>
                                    <th>LinkedIn</th>
                                    <th>Portfolio</th>
                                </tr>
                            </thead>
                            <tbody>
                            {paginatedApplications.map((application, index) => (
                                <tr key={application._id}>
                                    <td>{startIndex + index + 1}</td>
                                    <td>{application.firstName} {application.lastName}</td>
                                    <td>{application.email}</td>
                                    <td>{application.phoneNumber}</td>
                                    <td>{application.location}</td>
                                    <td>{application.yearsOfExperience}</td>
                                    <td><a href={application.cv} target="_blank" rel="noopener noreferrer">View CV</a></td>
                                    <td><a href={application.linkedin} >View LinkedIn</a></td>
                                    <td><a href={application.portfolio} target="_blank" rel="noopener noreferrer">View Portfolio</a></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
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
        </div>
    );
};

export default ApplicationList;