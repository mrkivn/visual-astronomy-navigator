import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Particles from './components/Particles/Particles';
import NasaSection from './components/NasaSection/NasaSection';
import PillNav from './components/PillNav/PillNav';
import BlurText from './components/BlurText/BlurText';
import GradualBlur from './components/GradualBlur/GradualBlur';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import SmoothScroll from './components/SmoothScroll/SmoothScroll';
import logo from './assets/van-logo.svg';
import './App.css';

function App() {
  const today = new Date().toISOString().split("T")[0];
  const [showWelcome, setShowWelcome] = useState(true);

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  return (
    <BrowserRouter>
      <SmoothScroll lerp={0.08} duration={1.4}>
        {showWelcome && <WelcomeScreen onEnter={() => setShowWelcome(false)} />}
        <div className="app-container">
          <div className="particles-container">
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
              { label: 'Home', href: '#hero' },
              { label: 'Time Travel', href: '#cosmos' }
            ]}
            activeHref="/"
            className="custom-nav"
            baseColor="#000"
            pillColor="#fff"
            hoveredPillTextColor="#fff"
            pillTextColor="#000"
          />

          <div className="content-wrapper">
            {/* Hero Section */}
            <div id="hero" className="hero-section">
              {/* Left Side: Title & Acronym */}
              <div className="hero-left">
                <BlurText
                  text="VAN"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete}
                  className="text-2xl mb-8 van-title"
                  style={{}} // Style moved to CSS class .van-title, but BlurText might need style prop reset if it merges
                />
                <p className="van-subtitle">Visual Astronomy Navigator</p>
                <div className="scroll-indicator">
                  ↓ Scroll for Birthday Cosmos
                </div>
              </div>

              {/* Center & Right: APOD Hero (Image + Description) */}
              {/* NasaSection handles the layout for Image + Description in 'hero' mode via CSS */}
              <div className="hero-right">
                <NasaSection displayMode="hero" enableDatePicker={false} initialDate={today} className="hero-nasa" />
              </div>
            </div>

            <GradualBlur
              position="bottom"
              height="6rem"
              strength={2}
              divCount={5}
              curve="bezier"
              exponential={true}
              opacity={1}
              target="page"
            />

            <GradualBlur
              position="top"
              height="6rem"
              strength={2}
              divCount={5}
              curve="bezier"
              exponential={true}
              opacity={1}
              target="page"
            />

            {/* Birthday Section */}
            <div id="cosmos" className="birthday-section">
              <NasaSection
                displayMode="full"
                enableDatePicker={true}
                initialDate=""
                customTitle={
                  <BlurText
                    text="Your Birthday Cosmos"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="birthday-title-text"
                  />
                }
              />
            </div>

            {/* Footer */}
            <footer className="app-footer">
              <p>&copy; {new Date().getFullYear()} Marck Ivan Deala. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </SmoothScroll>
    </BrowserRouter>
  );
}

export default App;
