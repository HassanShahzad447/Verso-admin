import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Admin } from '../../services/authApi';

const AddAdmin = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'admin' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        // Check if any field is empty
        if (!formData.name || !formData.email || !formData.password) {
            toast.warning('Please fill out all fields');
            return;
        }

        try {
            const result = await Admin(formData, token);

            if (result._id) {
                setFormData({ name: '', email: '', password: '', role: 'admin' });

                toast.success('Admin added successfully');

                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000); 
            } else {
                toast.error('Failed to add admin. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error); // Log any error
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container py-5">
            {/* ToastContainer outside any conditional rendering */}
            <ToastContainer />

            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-12">
                    <div className="card shadow-lg border-0 rounded-3">
                        <div className="card-header text-white text-center rounded-top"  style={{ backgroundColor: '#212529' }}>
                            <h5 className="mb-0">Add Admin</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter admin name"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter admin email"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100 py-2 rounded-pill" style={{ backgroundColor: '#212529', borderColor:'#212529' }}>
                                    Add Admin
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAdmin;
