import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../firebaseMethods/auth.js';
import { useDispatch } from 'react-redux';
import { login as storeLogin } from '../store/authSlice.js';
import "../styles/login.css";
import googleIcon from '../assets/google.svg';
import microsoftIcon from '../assets/microsoft.svg';
import AnimatedText from './AnimatedText';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            setLoading(true);
            const session = await authService.login({
                email: formData.email,
                password: formData.password
            });

            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(storeLogin(userData));
                    navigate('/home');
                }
            }
        } catch (error) {
            setError(error.message || 'Login failed. Please try again.');
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider) => {
        try {
            setLoading(true);
            // Implement social login logic here
            // For now, we'll just show an alert
            alert(`${provider} login will be implemented soon`);
            setLoading(false);
        } catch (error) {
            setError(`Failed to sign in with ${provider}`);
            setLoading(false);
        }
    };

    return (
        <main className="main-container">
            <section className="login-section">
                <div className="login-form-container">
                    <header className="welcome-header">
                        <h1 className="welcome-title">Welcome back!</h1>
                        <p className="welcome-subtitle">Enter your Credentials to access your account</p>
                    </header>

                    {error && <div className="error-message">{error}</div>}

                    <form className="form-section" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email" className="input-label">Email address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-input"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <div className="password-header">
                                <label htmlFor="password" className="input-label">Password</label>
                                <Link to="/forgot-password" className="forgot-password">
                                    Forgot password?
                                </Link>
                            </div>
                            <input
                                type={formData.rememberMe ? "text" : "password"}
                                id="password"
                                name="password"
                                className="form-input"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                id="showPassword"
                                name="rememberMe"
                                className="checkbox"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                            />
                            <label htmlFor="showPassword" className="checkbox-label">
                                {formData.rememberMe ? 'Hide Password' : 'Show Password'}
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>

                        <div className="divider-section">
                            <div className="divider-line"></div>
                            <span className="divider-text or-text">Or</span>
                            <div className="divider-line"></div>
                        </div>
                    </form>

                    <div className="social-login-section">
                        <div className="social-buttons">
                            <button
                                type="button"
                                className="social-button"
                                onClick={() => handleSocialLogin('Google')}
                                disabled={loading}
                            >
                                <img src={googleIcon} alt="Google" className="social-icon" />
                                Sign in with Google
                            </button>
                            <button
                                type="button"
                                className="social-button"
                                onClick={() => handleSocialLogin('Apple')}
                                disabled={loading}
                            >
                                <img src={microsoftIcon} alt="Apple" className="social-icon" />
                                Sign in with Microsoft
                            </button>
                        </div>

                        <p className="signup-text">
                            Don't have an account?
                            <Link to="/signup" className="signup-link">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </section>

            <section className="image-section">
                <img
                    src="/login.jpg"
                    alt="Login"
                    className="botanical-image"
                />
                <AnimatedText />
            </section>
        </main>
    );
};

export default Login;