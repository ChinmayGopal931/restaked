import { useState, useEffect } from 'react';
import analyticsImg from '../Images/analytics.jpg';
import avsImg from '../Images/AVS.jpg';
import ethImg from '../Images/eth.jpg';
import Card from '../Card/Card';

const carouselItems = [
    <Card img={analyticsImg} />,
    <Card img={avsImg} />,
    <Card img={ethImg} />,
];

function Carousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % carouselItems.length);
        }, 3000); 

        return () => clearInterval(interval); 
    }, []);

    return (
        <div className="carousel-container">
            {carouselItems.map((item, index) => (
                <div
                    key={index}
                    className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
                >
                    {item}
                </div>
            ))}
        </div>
    );
}

export default Carousel;
