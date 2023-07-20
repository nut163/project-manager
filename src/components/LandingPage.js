import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <header className="landing-header">
                <h1>Welcome to MakeItHappen.io</h1>
                <p>Turn your project ideas into reality</p>
            </header>
            <div className="login-signup">
                <Link to="/login" className="login-link">Login</Link>
                <Link to="/signup" className="signup-link">Sign Up</Link>
            </div>
            <div className="landing-content">
                <h2>Manage Your Projects Efficiently</h2>
                <p>With MakeItHappen.io, you can create and manage your projects, set high-level goals, assign duties, and track progress all in one place.</p>
            </div>
            <footer className="landing-footer">
                <Link to="/contact" className="contact-link">Contact Us</Link>
            </footer>
        </div>
    );
}

export default LandingPage;