import React from 'react';

const ContactUs = () => {
    return (
        <div className="contact-us">
            <h1>Contact Us</h1>
            <p>If you have any questions or need assistance, please reach out to us:</p>
            <div className="contact-info">
                <div className="contact-item">
                    <h2>Email</h2>
                    <p>support@makeithappen.io</p>
                </div>
                <div className="contact-item">
                    <h2>Phone</h2>
                    <p>+1 (123) 456-7890</p>
                </div>
                <div className="contact-item">
                    <h2>Address</h2>
                    <p>123 Make It Happen Lane, Success City, 12345</p>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;