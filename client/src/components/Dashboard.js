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
            <div className="row mb-4">
                <div className="col">
                    <div className="text-center">
                        <h1 className="display-4 fw-bold text-primary">
                            Welcome, <span className="text-success">{role === 'super-admin' ? 'Super Admin' : 'Admin'}</span> <span className="text-dark">{name}</span>!
                        </h1>
                        <p className="text-muted">Empowering your admin experience with insights and control.</p>
                    </div>
                    <hr className="text-muted" />
                </div>
            </div>
            <div className="row g-4 mb-5">
                <div className="col-12 col-sm-6 col-md-4">
                    <div 
                        className="card h-100 border-0 shadow-lg rounded-lg" 
                        style={{
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div className="card-body p-4">
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
                <div className="col-12 col-sm-6 col-md-4">
                    <div 
                        className="card h-100 border-0 shadow-lg rounded-lg"
                        style={{
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div className="card-body p-4">
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
                <div className="col-12 col-sm-6 col-md-4">
                    <div 
                        className="card h-100 border-0 shadow-lg rounded-lg"
                        style={{
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div className="card-body p-4">
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
            <div className="row">
                <div className="col">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Users List</h5>
                            {loading ? (
                                <div className="text-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover">
                                        <thead className="table-dark">
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Role</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user) => (
                                                <tr key={user.id} className="table-row-hover">
                                                    <td>{user.id}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.role}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
