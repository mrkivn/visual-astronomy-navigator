import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScroll Component
 * Wraps your content with buttery smooth scrolling powered by Lenis + GSAP
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to wrap
 * @param {number} props.lerp - Smoothness factor (0-1, lower = smoother, default: 0.1)
 * @param {number} props.duration - Duration of scroll animation (default: 1.2)
 * @param {boolean} props.smoothWheel - Enable smooth wheel scrolling (default: true)
 */
function SmoothScroll({
    children,
    lerp = 0.1,
    duration = 1.2,
    smoothWheel = true
}) {
    const lenisRef = useRef(null);

    useEffect(() => {
        // Initialize Lenis smooth scroll
        const lenis = new Lenis({
            lerp,
            duration,
            smoothWheel,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Add Lenis to GSAP ticker for smooth animation frame sync
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Disable GSAP's default lag smoothing for best performance
        gsap.ticker.lagSmoothing(0);

        // Handle anchor link clicks for smooth scrolling
        const handleAnchorClick = (e) => {
            const target = e.target.closest('a[href^="#"]');
            if (target) {
                e.preventDefault();
                const targetId = target.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    lenis.scrollTo(targetElement, {
                        offset: 0,
                        duration: 1.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
                    });
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);

        // Make lenis available globally
        window.lenis = lenis;

        // Cleanup on unmount
        return () => {
            document.removeEventListener('click', handleAnchorClick);
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, [lerp, duration, smoothWheel]);

    return <>{children}</>;
}

export default SmoothScroll;
