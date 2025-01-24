import React from 'react';

const Dashboard = () => {
    // Retrieve name and role from local storage
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');

    // Placeholder data for the dashboard cards
    const totalAdmins = 10;  // You can replace these with real data from your backend
    const totalJobsPosted = 50;
    const totalApplicationsReceived = 120;

    return (
        <div className="container mt-5">
            <h1>Welcome {role === 'super-admin' ? 'Super Admin' : 'Admin'}, {name}!</h1>

            <div className="row mt-4">
                {/* Total Admins Card */}
                <div className="col-md-4 mb-4">
                    <div className="card text-white bg-primary">
                        <div className="card-body">
                            <h5 className="card-title">Total Admins</h5>
                            <p className="card-text">{totalAdmins}</p>
                        </div>
                    </div>
                </div>

                {/* Jobs Posted Card */}
                <div className="col-md-4 mb-4">
                    <div className="card text-white bg-success">
                        <div className="card-body">
                            <h5 className="card-title">Jobs Posted</h5>
                            <p className="card-text">{totalJobsPosted}</p>
                        </div>
                    </div>
                </div>

                {/* Applications Received Card */}
                <div className="col-md-4 mb-4">
                    <div className="card text-white bg-warning">
                        <div className="card-body">
                            <h5 className="card-title">Applications Received</h5>
                            <p className="card-text">{totalApplicationsReceived}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add more dashboard content here */}
        </div>
    );
};

export default Dashboard;
