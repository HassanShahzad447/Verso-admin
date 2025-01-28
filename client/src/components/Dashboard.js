import React, { useState, useEffect } from 'react';
const backendURL = process.env.REACT_APP_BackendURL;

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalAdmins, setTotalAdmins] = useState(0);
    const [totalJobs, setTotalJobs] = useState(0);
    const [totalApplications, setTotalApplications] = useState(0);
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${backendURL}/api/users/get`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (!response.ok) throw new Error('Failed to fetch users');
                const data = await response.json();
                setUsers(data);
                setTotalAdmins(data.filter(user => user.role === 'admin').length);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchJobs = async () => {
            try {
                const response = await fetch(`${backendURL}/api/jobs`);
                if (response.ok) {
                    const result = await response.json();
                    setTotalJobs(result.length);
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        const fetchApplications = async () => {
            try {
                const response = await fetch(`${backendURL}/api/job-applications`);
                const result = await response.json();
                if (result.data) setTotalApplications(result.data.length);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchUsers();
        fetchJobs();
        fetchApplications();
    }, []);

    return (
        <div className="container py-5">
            {/* Header Section */}
            <div className="row mb-4">
                <div className="col">
                    <h1 className="display-5 fw-bold text-dark mb-3">
                        Welcome {role === 'super-admin' ? 'Super Admin' : 'Admin'}, {name}!
                    </h1>
                    <hr className="text-muted" />
                </div>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-5">
                {/* Total Admins Card */}
                <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                    <div className="rounded-circle p-3 bg-primary bg-opacity-10">
                                        <i className="bi bi-people-fill text-primary fs-4"></i>
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="text-muted mb-1">Total Admins</h6>
                                    <h2 className="mb-0 fw-bold">
                                        {loading ? (
                                            <div className="spinner-border spinner-border-sm text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : totalAdmins}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Jobs Posted Card */}
                <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                    <div className="rounded-circle p-3 bg-success bg-opacity-10">
                                        <i className="bi bi-briefcase-fill text-success fs-4"></i>
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="text-muted mb-1">Jobs Posted</h6>
                                    <h2 className="mb-0 fw-bold">
                                        {loading ? (
                                            <div className="spinner-border spinner-border-sm text-success" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : totalJobs}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Applications Card */}
                <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                    <div className="rounded-circle p-3 bg-warning bg-opacity-10">
                                        <i className="bi bi-file-earmark-text-fill text-warning fs-4"></i>
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="text-muted mb-1">Applications Received</h6>
                                    <h2 className="mb-0 fw-bold">
                                        {loading ? (
                                            <div className="spinner-border spinner-border-sm text-warning" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : totalApplications}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3">
                    <h5 className="card-title mb-0 fw-bold">All Users</h5>
                </div>
                <div className="card-body">
                    {loading ? (
                        <div className="text-center py-4">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 ? (
                                        users.map((user, index) => (
                                            <tr key={user._id}>
                                                <td>{index + 1}</td>
                                                <td className="fw-medium">{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <span className={`badge bg-${user.role === 'admin' ? 'primary' : 'secondary'} rounded-pill`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-4">
                                                <p className="text-muted mb-0">No users found</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;