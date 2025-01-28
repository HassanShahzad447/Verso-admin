import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify'; // Corrected imports
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const Setting = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); 
  const backendURL = process.env.REACT_APP_BackendURL;
  const userId = localStorage.getItem('id'); 

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${backendURL}/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setUser(result); 
          setName(result.name); // Update here to set name
          setEmail(result.email);
        } else {
          console.error('Failed to fetch user details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [backendURL, userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate({ name, email, password });
  };

  const handleUpdate = async (updatedDetails) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${backendURL}/api/users/${userId}`, { 
        method: 'PUT', 
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDetails),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Update successful:', result);
        toast.success('Profile updated successfully!'); // Success toast
      } else {
        console.error('Failed to update user:', response.statusText);
        toast.error('Failed to update profile'); // Error toast
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('An error occurred while updating your profile.'); // Error toast
    }
  };

  return (
    <div>
      <div className="text-center">
        <div className="p-4 pt-5">
          <div className="card shadow">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Profile</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="row gx-3 gy-2 align-items-center">
                <div className="col-sm-4">
                  <label className="visually-hidden" htmlFor="name">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} // Change here for name
                  />
                </div>
                <div className="col-sm-4">
                  <label className="visually-hidden" htmlFor="email">Email:</label>
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-sm-4">
                  <label className="visually-hidden" htmlFor="password">Password:</label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="col-auto">
                  <button type="submit" className="btn btn-dark">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ToastContainer for showing notifications */}
      <ToastContainer />
    </div>
  );
};

export default Setting;
