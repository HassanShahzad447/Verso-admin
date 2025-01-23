import React, { useState } from 'react';
import { signUp } from '../../services/authApi';

const SignUp = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signUp(formData);
        // Handle success (e.g., redirect to sign in)
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" onChange={handleChange} placeholder="Name" required />
            <input name="email" onChange={handleChange} placeholder="Email" required />
            <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUp; 