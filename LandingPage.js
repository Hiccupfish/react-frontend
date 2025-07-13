
import React, { useState } from 'react';
import './LandingPage.css';

const LandingPage = () => {
    const [selectedAccountType, setSelectedAccountType] = useState(null);
    const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

    const features = [
        {
            title: "Secure Data Encryption and Backup",
            description: "Health records are encrypted and securely stored using Advanced Encryption, ensuring data privacy and protection against unauthorized access. Regular backups safeguard against data loss."
        },
        {
            title: "Real-time Collaboration",
            description: "Connect with healthcare providers or patients securely through our platform. Share records, schedule appointments, and communicate with ease."
        },
        {
            title: "Mobile Access Anywhere",
            description: "Access your health information securely from any device, anytime, anywhere. Our responsive design ensures a seamless experience across all platforms."
        }
    ];

    const selectAccountType = (type) => {
        setSelectedAccountType(type);
        // Navigate to register page with account type after a short delay
        setTimeout(() => {
            // Replace with your navigation logic, e.g., using React Router
            console.log(`Navigating to /register/${type}`);
        }, 300);
    };

    const nextFeature = () => {
        setCurrentFeatureIndex((currentFeatureIndex + 1) % features.length);
    };

    const previousFeature = () => {
        setCurrentFeatureIndex((currentFeatureIndex - 1 + features.length) % features.length);
    };

    return (
        <div className="content-box">
            <h2>Let's Get Started</h2>

            <div className="feature-card">
                <h3>{features[currentFeatureIndex].title}</h3>
                <p>{features[currentFeatureIndex].description}</p>
                <div className="feature-navigation">
                    <button onClick={previousFeature} aria-label="Previous feature" className="btn btn-outline-primary">&#8592;</button>
                    <button onClick={nextFeature} aria-label="Next feature" className="btn btn-outline-primary">&#8594;</button>
                </div>
                <div className="swipe-indicator">Swipe left for key features</div>
            </div>

            <div className="account-selection">
                <h3>Select account type</h3>
                <button
                    className={`btn btn-primary account-type-btn ${selectedAccountType === 'healthcare' ? 'selected' : ''}`}
                    onClick={() => selectAccountType('healthcare')}
                >
                    Healthcare Professional
                </button>
                <button
                    className={`btn btn-primary account-type-btn ${selectedAccountType === 'patient' ? 'selected' : ''}`}
                    onClick={() => selectAccountType('patient')}
                >
                    Patient
                </button>
            </div>

            <div className="terms-notice">
                <p>
                    By creating account or logging in,<br />
                    you agree to our
                    <a href="/terms">Terms &amp; Conditions</a> and <a href="/privacy">Privacy Policy</a>
                </p>
            </div>
        </div>
    );
};

export default LandingPage;
