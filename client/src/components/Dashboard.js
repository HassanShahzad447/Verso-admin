import React from 'react';

const Dashboard = () => {
    // Retrieve name and role from local storage
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');

    return (
        <div>
            <h1>Welcome {role === 'super-admin' ? 'Super Admin' : 'Admin'}, {name}!</h1>
            {/* Add more dashboard content here */}
        </div>
    );
};

export default Dashboard; 