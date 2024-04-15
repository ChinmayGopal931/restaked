import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CallToAction(){
    const navigate = useNavigate();

    const navigateToDashboard = () => {
        navigate('/dashboard');  // Navigate to the Dashboard route
    };

    return (
        <div className="cta-container">
            <h2 className="cta-title d-flex text-center m-4">Ready to Dive Deeper?</h2>
            <h6 className="cta-description text-center m-4">Explore our dashboard!</h6>
            <button className="cta-button btn btn-light btn-lg" onClick={navigateToDashboard}>Explore</button>
        </div>
    );
};
