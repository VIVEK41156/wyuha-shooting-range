import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Crosshair, ChevronRight } from 'lucide-react';
import heroBgVideo from '../../assets/hero.bg.mp4';
import './Hero.css';

// Plugin registered globally in main.jsx

const Hero = ({ openModal }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Entry animations (replaces Framer Motion initial/animate)
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.from('.hero-badge',        { opacity: 0, scale: 0.8, duration: 0.5, delay: 0.2 })
      .from('.hero-title',        { opacity: 0, y: 20,      duration: 0.6 }, '-=0.2')
      .from('.hero-subtitle',     { opacity: 0,             duration: 0.6 }, '-=0.3')
      .from('.hero-cta-group',    { opacity: 0, y: 20,      duration: 0.6 }, '-=0.3');

    // Parallax on scroll (replaces Framer Motion useScroll / useTransform)
    gsap.to('.hero-video-container', {
      yPercent: 30,
      scale: 1.1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    gsap.to('.hero-content', {
      yPercent: 50,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '80% top',
        scrub: true,
      }
    });
  }, { scope: containerRef });

  return (
    <section id="home" className="hero-section" ref={containerRef}>
      {/* Background Video */}
      <div className="hero-video-container">
        <video
          className="hero-video"
          src={heroBgVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          fetchpriority="high"
        ></video>
        <div className="hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-text-container">
          <div className="hero-badge">
            <Crosshair size={16} />
            <span>Precision. Focus. Excellence.</span>
          </div>

          <h1 className="hero-title">
            The Vision of <span className="highlight">Wyuha.</span>
          </h1>

          <p className="hero-subtitle">
            The premier shooting academy designed for elite training.
            Master your skills in our state-of-the-art facilities with professional instructors.
          </p>

          <div className="hero-cta-group">
            <a href="#training" className="btn-primary hero-btn">
              Join the Academy
              <ChevronRight size={20} />
            </a>
            <button onClick={openModal} className="btn-glass hero-btn">
              Book a Lane
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
