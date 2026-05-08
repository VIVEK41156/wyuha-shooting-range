import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Target, Crosshair, Users } from 'lucide-react';
import './About.css';

// Plugin registered globally in main.jsx

const About = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=3000',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    tl.fromTo('.layer-lanes-img',
      { scale: 1, z: 0, opacity: 0.4 },
      { scale: 1.15, z: 50, opacity: 0.7, duration: 2, ease: 'power1.inOut' }
    )
    .fromTo('.about-card-1',
      { opacity: 0, y: 100, rotationX: -15 },
      { opacity: 1, y: 0, rotationX: 0, duration: 1.5, ease: 'back.out(1.7)' },
      '<0.5'
    )
    .to('.about-card-1', { opacity: 0, y: -100, rotationX: 15, duration: 1.5, ease: 'power1.in' }, '+=1')
    .fromTo('.layer-coaches',
      { y: '100%', opacity: 0, scale: 0.8 },
      { y: '10%', opacity: 1, scale: 1, duration: 2.5, ease: 'power2.out' },
      '<'
    )
    .to('.layer-lanes-img', { opacity: 0.2, duration: 1 }, '<')
    .fromTo('.about-card-2',
      { opacity: 0, x: -100, rotationY: -15 },
      { opacity: 1, x: 0, rotationY: 0, duration: 1.5, ease: 'power2.out' },
      '-=1'
    )
    .to({}, { duration: 1 });

  }, { scope: containerRef });

  return (
    <section id="about" className="about-3d-wrapper" ref={containerRef}>
      <div className="parallax-layer layer-bg">
        <img src="/about_bg_indian.png" alt="15-Lane Shooting Range" className="layer-lanes-img" loading="lazy" decoding="async" />
        <div className="layer-overlay dark-wood-overlay"></div>
      </div>

      <div className="parallax-layer layer-coaches">
        <div className="coaches-img-wrapper">
          <img src="/about_coaches_indian.png" alt="Expert Coaches" loading="lazy" decoding="async" />
          <div className="coaches-gradient"></div>
        </div>
      </div>

      <div className="parallax-layer layer-content">
        <div className="content-container">
          <div className="about-card about-card-1 glass-dark">
            <div className="section-badge">The Facility</div>
            <h2 className="section-title">
              Traditional Feel. <br />
              <span className="highlight">Tactical Precision.</span>
            </h2>
            <p className="card-desc">
              Wyuha is built on a massive 15-lane setup designed to accommodate both traditional marksmen and modern tactical operators. The environment blends deep wood accents with state-of-the-art ballistic containment.
            </p>
            <div className="card-stats">
              <div className="stat">
                <Target className="stat-icon" />
                <span>15 High-Caliber Lanes</span>
              </div>
              <div className="stat">
                <Crosshair className="stat-icon cyan-glow" />
                <span>3 Electronic Precision Lanes</span>
              </div>
            </div>
            <p className="electronic-desc">
              Experience the future of shooting with our 3 advanced electronic lanes, featuring auto-scoring, dynamic scenarios, and instant shot-placement feedback on tactical touch screens.
            </p>
          </div>

          <div className="about-card about-card-2 glass-dark">
            <div className="section-badge">The Mentors</div>
            <h2 className="section-title">
              Elite <span className="highlight">Guidance.</span>
            </h2>
            <p className="card-desc">
              Precision isn't born; it's forged. Wyuha is home to 2 of the region's most elite tactical coaches. With decades of combined experience in law enforcement and competitive marksmanship, they are here to refine your trigger control, stance, and target acquisition.
            </p>
            <ul className="coach-features">
              <li><Users className="list-icon"/> 1-on-1 Tactical Coaching</li>
              <li><Target className="list-icon"/> Stress-Scenario Training</li>
              <li><Crosshair className="list-icon"/> Advanced Ballistics Theory</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
