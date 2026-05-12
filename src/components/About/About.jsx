import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Target, Crosshair, Users } from 'lucide-react';
import './About.css';

// Plugin registered globally in main.jsx

import img1 from '../../assets/image-1.webp';
import img2 from '../../assets/image-2.webp';
import img3 from '../../assets/image-3.webp';
import img4 from '../../assets/image-4.webp';
import img6 from '../../assets/image-6.webp';

const About = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia(containerRef);

    // --- Desktop Animation ---
    mm.add("(min-width: 769px)", () => {
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
      .fromTo('.img-1', { x: -200, y: -200, rotation: -45, opacity: 0 }, { x: 0, y: 0, rotation: -8, opacity: 1, duration: 2, ease: 'power3.out' }, '<0.2')
      .fromTo('.img-2', { x: 200,  y: -200, rotation: 45,  opacity: 0 }, { x: 0, y: 0, rotation: 5,  opacity: 1, duration: 2, ease: 'power3.out' }, '<0.1')
      .fromTo('.img-3', { x: -300, y: 0,    rotation: -30, opacity: 0 }, { x: 0, y: 0, rotation: 3,  opacity: 1, duration: 2, ease: 'power3.out' }, '<0.1')
      .fromTo('.img-4', { x: 300,  y: 0,    rotation: 30,  opacity: 0 }, { x: 0, y: 0, rotation: -5, opacity: 1, duration: 2, ease: 'power3.out' }, '<0.1')
      .fromTo('.img-6', { x: 200,  y: 200,  rotation: 60,  opacity: 0 }, { x: 0, y: 0, rotation: -3, opacity: 1, duration: 2, ease: 'power3.out' }, '<0.1')
      .to('.layer-lanes-img', { opacity: 0.2, duration: 1 }, '<')
      .fromTo('.about-card-2',
        { opacity: 0, x: -100, rotationY: -15 },
        { opacity: 1, x: 0, rotationY: 0, duration: 1.5, ease: 'power2.out' },
        '-=1.5'
      )
      .to({}, { duration: 1 });
    });

    // --- Mobile Animation ---
    mm.add("(max-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=4500',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      tl.fromTo('.layer-lanes-img',
        { scale: 1, opacity: 0.3 },
        { scale: 1.2, opacity: 0.1, duration: 20, ease: 'none' }
      );
      
      tl.fromTo('.about-card-1',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.1
      );
      
      // Card disappears immediately upon further scrolling
      tl.to('.about-card-1', { opacity: 0, y: -50, duration: 0.5, ease: 'power2.in' }, '+=0');
      
      tl.set('.layer-coaches', { y: 0, opacity: 1 }, '<');

      const photos = ['.img-1', '.img-2', '.img-3', '.img-4', '.img-6'];
      
      photos.forEach((selector, index) => {
        // Start first photo exactly as card leaves ('<')
        const delay = index === 0 ? '<' : '-=1.0';
        tl.fromTo(selector, 
          { opacity: 0, yPercent: 50, xPercent: -50, scale: 0.8 },
          { opacity: 1, yPercent: -50, xPercent: -50, scale: 1, duration: 2, ease: 'power2.out' },
          delay
        );
        tl.to(selector, { opacity: 0, yPercent: -150, scale: 0.8, duration: 2, ease: 'power2.in' }, '+=1.5');
      });
      
      tl.fromTo('.about-card-2',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 2, ease: 'power2.out' },
        '-=0.5'
      );
      
      tl.to({}, { duration: 1 });
    });

  }, { scope: containerRef });

  return (
    <section id="about" className="about-3d-wrapper" ref={containerRef}>
      <div className="parallax-layer layer-bg">
        <img src="/school_range_bg_clean.png" alt="School Shooting Range" className="layer-lanes-img" loading="lazy" decoding="async" />
        <div className="layer-overlay dark-wood-overlay"></div>
      </div>

      <div className="parallax-layer layer-coaches">
        <div className="coaches-img-wrapper about-collage">
          <div className="collage-inner">
            <img src={img1} alt="Facility 1" className="collage-img img-1" width="300" height="400" loading="lazy" decoding="async" />
            <img src={img2} alt="Facility 2" className="collage-img img-2" width="300" height="400" loading="lazy" decoding="async" />
            <img src={img3} alt="Facility 3" className="collage-img img-3" width="300" height="400" loading="lazy" decoding="async" />
            <img src={img4} alt="Facility 4" className="collage-img img-4" width="300" height="400" loading="lazy" decoding="async" />
            <img src={img6} alt="Facility 6" className="collage-img img-6" width="300" height="400" loading="lazy" decoding="async" />
          </div>
          <div className="coaches-gradient"></div>
        </div>
      </div>

      <div className="parallax-layer layer-content">
        <div className="content-container">
          <div className="about-card about-card-1 glass-dark">
            <div className="section-badge">Our Mission</div>
            <h2 className="section-title">
              Promoting <span className="highlight">Excellence.</span>
            </h2>
            <p className="card-desc">
              With an aim to promote sports excellence and holistic development, we have established ‘Wyuha’ - a dedicated target shooting facility in Mangadu, Chennai.
            </p>
            <p className="card-desc">
              We believe that introducing precision sports at a young age fosters discipline, focus, and mental acuity. Our new range is designed to support training in Air Pistol and Air Rifle disciplines, providing our students with much-needed exposure to this renowned and esteemed sport.
            </p>
          </div>

          <div className="about-card about-card-2 glass-dark">
            <div className="section-badge">The Facility</div>
            <h2 className="section-title">
              15-Lane <span className="highlight">Setup.</span>
            </h2>
            <p className="card-desc">
              The facility features a 15-lane shooting range, meticulously configured to support both traditional and advanced training needs:
            </p>
            <div className="card-stats">
              <div className="stat">
                <Target className="stat-icon" />
                <span>12 Manual Precision Lanes</span>
              </div>
              <div className="stat">
                <Crosshair className="stat-icon cyan-glow" />
                <span>3 Electronic Target Lanes</span>
              </div>
            </div>
            <p className="electronic-desc">
              Providing our students with elite exposure to international-standard equipment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
