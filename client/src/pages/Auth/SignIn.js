import React, { useState } from 'react';
import { signIn } from '../../services/authApi';
import { useNavigate } from 'react-router-dom';
import './Signin.css';

const SignIn = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await signIn(formData);
        if (response.token) {
            // Store token, name, role, and id in localStorage
            localStorage.setItem('token', response.token);
            localStorage.setItem('name', response.user.name);
            localStorage.setItem('role', response.user.role);
            localStorage.setItem('id', response.user.id);  // Store the user's id
    
            navigate('/dashboard');
        } else {
            setError(response.message || 'An error occurred.');
        }
    };
    

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-form-container login-sign-in-container">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h1 className="login-heading">Sign in</h1>
                        <div className="login-social-container"></div>
                        <div className="login-infield">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="login-infield">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        {/* <a href="#" className="forgot">Forgot your password?</a> */}
                        <button className="login-button">Sign In</button>
                    </form>
                </div>
                <div className="login-overlay-container">
                    <div className="login-overlay">
                        <div className="login-overlay-panel login-overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button>Sign In</button>
                        </div>
                        <div className="login-overlay-panel login-overlay-right">
                            <h1>Verso Admin!</h1>
                            <p>Verso: Versatile, dynamic, and full of personality.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
