import React, { useState, useEffect } from 'react';
import Squares from '../Squares/Squares';
import BlurText from '../BlurText/BlurText';

const WelcomeScreen = ({ onEnter }) => {
    const [visible, setVisible] = useState(true);
    const [fadingOut, setFadingOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadingOut(true);
            setTimeout(() => {
                setVisible(false);
                onEnter();
            }, 1000); // Match transition duration
        }, 4000); // Wait 4 seconds before starting fade out (total 5s)

        return () => clearTimeout(timer);
    }, [onEnter]);

    if (!visible) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 9999,
                backgroundColor: '#000',
                opacity: fadingOut ? 0 : 1,
                transition: 'opacity 1s ease-in-out',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
                <Squares
                    speed={0.5}
                    squareSize={40}
                    direction='diagonal'
                    borderColor='#fff'
                    hoverFillColor='#222'
                />
            </div>

            {/* Vignette Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                background: 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.95) 100%)',
                pointerEvents: 'none'
            }}></div>

            <div style={{ zIndex: 1, textAlign: 'center', pointerEvents: 'none' }}>
                <BlurText
                    text="Welcome to VAN"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    className="mb-8 text-white font-bold"
                    style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', lineHeight: 1, fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.1em', justifyContent: 'center' }}
                />
            </div>
        </div>
    );
};

export default WelcomeScreen;
