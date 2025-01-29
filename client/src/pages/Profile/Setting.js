import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserDetails } from '../../services/authApi';

const Setting = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userId = localStorage.getItem('id');

  // useEffect(() => {
  //   const loadUserDetails = async () => {
  //     try {
  //       const user = await fetchUserDetails(userId);
  //       setName(user.name);
  //       setEmail(user.email);
  //     } catch (error) {
  //       toast.error('Failed to fetch user details');
  //     }
  //   };

  //   loadUserDetails();
  // }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { name, email, password };
      await updateUserDetails(userId, updatedUser);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
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
                    onChange={(e) => setName(e.target.value)}
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
      <ToastContainer />
    </div>
  );
};

export default Setting;
