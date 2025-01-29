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
        <div className="text-center">
            {/* ToastContainer outside any conditional rendering */}
            <ToastContainer />

            <div className="p-4 pt-5">
                <div className="card shadow">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Add Admin</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 text-start">
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
                            <div className="mb-3 text-start">
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
                            <div className="mb-3 text-start">
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
                            <button type="submit" className="btn btn-dark w-100">Add Admin</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAdmin;
