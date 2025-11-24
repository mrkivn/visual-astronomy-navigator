import { BrowserRouter } from 'react-router-dom';
import Particles from './components/Particles/Particles';
import NasaSection from './components/NasaSection/NasaSection';
import PillNav from './components/PillNav/PillNav';
import BlurText from './components/BlurText/BlurText';
import logo from './assets/van-logo.svg';

function App() {
  const today = new Date().toISOString().split("T")[0];

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  return (
    <BrowserRouter>
      <div style={{ width: '100%', minHeight: '100vh', position: 'relative', backgroundColor: '#000', fontFamily: "'Rajdhani', sans-serif" }}>
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>

        <PillNav
          logo={logo}
          logoAlt="VAN Logo"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Time Travel', href: '#cosmos' }
          ]}
          activeHref="/"
          className="custom-nav"
          baseColor="#000"
          pillColor="#fff"
          hoveredPillTextColor="#fff"
          pillTextColor="#000"
        />

        <div style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
          {/* Hero Section */}
          <div
            style={{
              height: '100vh',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              padding: '0 2%',
              gap: '2rem'
            }}
          >
            {/* Left Side: Title & Acronym */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', textAlign: 'left', pointerEvents: 'auto' }}>
              <BlurText
                text="VAN"
                delay={150}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="text-2xl mb-8"
                style={{ fontSize: '8rem', marginBottom: '0', fontWeight: 'bold', letterSpacing: '10px', lineHeight: '1', color: '#fff' }}
              />
              <p style={{ fontSize: '1.5rem', letterSpacing: '2px', color: '#aaa', marginTop: '1rem' }}>Visual Astronomy Navigator</p>
              <div style={{ marginTop: '3rem', animation: 'bounce 2s infinite' }}>
                ↓ Scroll for Birthday Picture
              </div>
            </div>

            {/* Center & Right: APOD Hero (Image + Description) */}
            {/* NasaSection handles the layout for Image + Description in 'hero' mode via CSS */}
            <div style={{ flex: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', pointerEvents: 'auto' }}>
              <NasaSection displayMode="hero" enableDatePicker={false} initialDate={today} className="hero-nasa" />
            </div>
          </div>

          {/* Birthday Section */}
          <div id="cosmos" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.8)', pointerEvents: 'auto', paddingBottom: '4rem' }}>
            <BlurText
              text="Your Birthday Cosmos"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-2xl mb-8"
              style={{ fontSize: '3rem', marginBottom: '2rem', color: '#fff' }}
            />
            <NasaSection displayMode="full" enableDatePicker={true} initialDate="" />
          </div>

          {/* Footer */}
          <footer style={{
            width: '100%',
            padding: '2rem',
            textAlign: 'center',
            color: '#888',
            fontSize: '0.9rem',
            background: 'rgba(0,0,0,0.9)',
            pointerEvents: 'auto'
          }}>
            <p>&copy; {new Date().getFullYear()} Marck Ivan Deala. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
