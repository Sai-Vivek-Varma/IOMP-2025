import { useState, useEffect } from 'react';
import '../styles/AnimatedText.css';

const AnimatedText = () => {
    const messages = [
        "Welcome to Swachhta & LiFE Dashboard",
        "AI Powered Monitoring for Post Offices",
        "Smart, Clean, Sustainable"
    ];

    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            // Start fade out
            setFade(false);

            // After fade out, change message and fade in
            setTimeout(() => {
                setCurrentMessageIndex((prevIndex) =>
                    prevIndex === messages.length - 1 ? 0 : prevIndex + 1
                );
                setFade(true);
            }, 500);

        }, 3000); // Change message every 3 seconds

        return () => clearInterval(interval);
    }, [messages.length]);

    return (
        <div className="animated-text-container">
            <div className={`animated-text ${fade ? 'fade-in' : 'fade-out'}`}>
                {messages[currentMessageIndex]}
            </div>
        </div>
    );
};

export default AnimatedText;
