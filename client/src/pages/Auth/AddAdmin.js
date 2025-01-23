import React, { useState } from 'react';
import { addAdmin } from '../../services/authApi';

const AddAdmin = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'admin' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await addAdmin(formData, token);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" onChange={handleChange} placeholder="Name" required />
            <input name="email" onChange={handleChange} placeholder="Email" required />
            <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
            <select name="role" onChange={handleChange}>
                <option value="admin">Admin</option>
                <option value="super-admin">Super Admin</option>
            </select>
            <button type="submit">Add Admin</button>
        </form>
    );
};

export default AddAdmin; 