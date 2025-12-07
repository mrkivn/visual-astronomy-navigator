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
 * @param {string} props.easing - Easing function (default: 'easeOutExpo')
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

        // Cleanup on unmount
        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, [lerp, duration, smoothWheel]);

    // Expose lenis instance for external control if needed
    useEffect(() => {
        // Make lenis available globally for debugging/external access
        window.lenis = lenisRef.current;
    }, []);

    return <>{children}</>;
}

export default SmoothScroll;
