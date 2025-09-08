import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../firebaseMethods/auth.js';
import { useDispatch } from 'react-redux';
import { login as storeLogin } from '../store/authSlice.js';
import "../styles/login.css";
import googleIcon from '../assets/google.svg';
import microsoftIcon from '../assets/microsoft.svg';
import AnimatedText from './AnimatedText';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        termsAccepted: false
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

        if (!formData.termsAccepted) {
            setError('Please agree to the terms and policy');
            return;
        }

        try {
            setLoading(true);
            const userData = {
                name: formData.name,
                email: formData.email,
                password: formData.password
            };

            const session = await authService.createAccount(userData);

            if (session) {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) {
                    dispatch(storeLogin(currentUser));
                    navigate('/home');
                }
            }
        } catch (error) {
            setError(error.message || 'Signup failed. Please try again.');
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider) => {
        try {
            setLoading(true);
            // Implement social login logic here
            alert(`${provider} signup will be implemented soon`);
            setLoading(false);
        } catch (error) {
            setError(`Failed to sign up with ${provider}`);
            setLoading(false);
        }
    };

    return (
        <main className="main-container signup-page">
            <section className="login-section">
                <div className="login-form-container">
                    <header className="welcome-header">
                        <h1 className="welcome-title">Get Started Now</h1>
                    </header>

                    {error && <div className="error-message">{error}</div>}

                    <form className="form-section" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="name" className="input-label">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-input"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

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
                            <label htmlFor="password" className="input-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-input"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                minLength="6"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <div className="checkbox-container">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    name="termsAccepted"
                                    className="checkbox"
                                    checked={formData.termsAccepted || false}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="terms" className="checkbox-label">
                                    I agree to the terms & policy
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
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
                                Sign up with Google
                            </button>
                            <button
                                type="button"
                                className="social-button"
                                onClick={() => handleSocialLogin('Microsoft')}
                                disabled={loading}
                            >
                                <img src={microsoftIcon} alt="Microsoft" className="social-icon" />
                                Sign up with Microsoft
                            </button>
                        </div>

                        <p className="signup-text">
                            Already have an account?{' '}
                            <Link to="/login" className="signup-link">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </section>

            <section className="image-section">
                <img
                    src="/login.jpg"
                    alt="Sign Up"
                    className="botanical-image"
                />
                <AnimatedText />
            </section>
        </main>
    );
};

export default Signup;
