import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const gunRef = useRef(null);
  const bulletRef = useRef(null);
  const targetRef = useRef(null);
  const flashRef = useRef(null);
  const ringsRef = useRef([]);
  const logoRef = useRef(null);
  const taglineRef = useRef(null);
  const curtainRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // === PHASE 1: Setup ===
    gsap.set(gunRef.current, { x: -300, opacity: 0 });
    gsap.set(bulletRef.current, { opacity: 0, x: 0, scaleX: 1 });
    gsap.set(targetRef.current, { scale: 0, opacity: 0, rotation: -45 });
    gsap.set(flashRef.current, { scale: 0, opacity: 0 });
    gsap.set(ringsRef.current, { scale: 0, opacity: 0 });
    gsap.set(logoRef.current, { scale: 3, opacity: 0, rotationX: 90 });
    gsap.set(taglineRef.current, { opacity: 0, y: 20 });

    // === PHASE 2: Target appears ===
    tl.to(targetRef.current, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.8,
      ease: 'back.out(1.7)'
    }, 0.3)

    // === PHASE 3: Gun slides in ===
    .to(gunRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power3.out'
    }, 0.6)

    // === PHASE 4: Gun slight recoil (pre-fire) ===
    .to(gunRef.current, {
      x: -15,
      duration: 0.1,
      ease: 'power2.in'
    }, 1.4)

    // === PHASE 5: Muzzle Flash ===
    .to(flashRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.06,
      ease: 'power4.out'
    }, 1.5)
    .to(flashRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.12,
      ease: 'power2.in'
    }, 1.56)

    // === PHASE 6: Bullet fires ===
    .to(bulletRef.current, {
      opacity: 1,
      duration: 0.05
    }, 1.5)
    .to(bulletRef.current, {
      x: 600,  // travels across screen
      scaleX: 3, // stretch = motion blur effect
      duration: 0.35,
      ease: 'power3.in'
    }, 1.5)

    // === PHASE 7: Gun recoil back ===
    .to(gunRef.current, {
      x: 0,
      duration: 0.2,
      ease: 'elastic.out(1.2, 0.5)'
    }, 1.52)

    // === PHASE 8: Target Impact — rings pulse out ===
    .to(ringsRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.08,
      stagger: 0.08,
      ease: 'power4.out'
    }, 1.84)
    .to(ringsRef.current, {
      scale: 4,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out'
    }, 1.92)

    // Target shudder on impact
    .to(targetRef.current, {
      x: 8,
      duration: 0.05,
      yoyo: true,
      repeat: 5,
      ease: 'power1.inOut'
    }, 1.85)

    // === PHASE 9: Gun slides out ===
    .to(gunRef.current, {
      x: -400,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in'
    }, 2.1)

    // === PHASE 10: Target shrinks to center ===
    .to(targetRef.current, {
      scale: 0.5,
      duration: 0.4,
      ease: 'power2.inOut'
    }, 2.2)

    // === PHASE 11: Logo STAMPS in ===
    .to(logoRef.current, {
      scale: 1,
      opacity: 1,
      rotationX: 0,
      duration: 0.7,
      ease: 'back.out(2.5)'
    }, 2.5)

    // === PHASE 12: Tagline fades in ===
    .to(taglineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, 3.0)

    // === PHASE 13: Curtain wipe exit ===
    .to(curtainRef.current, {
      scaleY: 1,
      duration: 0.5,
      ease: 'power3.in'
    }, 3.7)
    .to(preloaderRef.current, {
      yPercent: -100,
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete: () => {
        if (onComplete) onComplete();
      }
    }, 4.1);

  }, [onComplete]);

  return (
    <div className="preloader" ref={preloaderRef}>
      {/* Grid background */}
      <div className="preloader-grid" />

      {/* === GUN === */}
      <div className="gun-wrapper" ref={gunRef}>
        {/* Muzzle flash */}
        <div className="muzzle-flash" ref={flashRef}></div>

        <svg className="gun-svg" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Barrel */}
          <rect x="80" y="28" width="115" height="12" rx="4" fill="#7A0F18" opacity="0.9"/>
          {/* Barrel tip highlight */}
          <rect x="185" y="28" width="10" height="12" rx="2" fill="#f5d0d2"/>
          {/* Slide */}
          <rect x="70" y="22" width="100" height="20" rx="5" fill="#6b2ee0"/>
          {/* Ejection port */}
          <rect x="100" y="24" width="30" height="8" rx="2" fill="#0a0a0c"/>
          {/* Frame / body */}
          <path d="M70 38 L75 60 Q77 65 82 65 L120 65 Q125 65 127 60 L130 38 Z" fill="#5a0a11"/>
          {/* Grip */}
          <rect x="80" y="60" width="35" height="18" rx="4" fill="#5a10c0"/>
          {/* Trigger guard */}
          <path d="M90 55 Q105 70 120 55" stroke="#4a0ea0" strokeWidth="4" fill="none" strokeLinecap="round"/>
          {/* Trigger */}
          <rect x="100" y="52" width="5" height="12" rx="2" fill="#f5d0d2" opacity="0.8"/>
          {/* Sight */}
          <rect x="80" y="20" width="6" height="4" rx="1" fill="#f5d0d2" opacity="0.6"/>
          <rect x="155" y="20" width="10" height="4" rx="1" fill="#f5d0d2" opacity="0.6"/>
        </svg>
      </div>

      {/* === BULLET === */}
      <div className="bullet-wrapper" ref={bulletRef}>
        <div className="bullet"></div>
        <div className="bullet-trail"></div>
      </div>

      {/* === TARGET / BULLSEYE === */}
      <div className="target-wrapper" ref={targetRef}>
        {/* Impact pulse rings */}
        {[0, 1, 2].map(i => (
          <div key={i} className="impact-ring" ref={el => ringsRef.current[i] = el}></div>
        ))}
        <svg className="target-svg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          {/* Outer ring */}
          <circle cx="60" cy="60" r="55" stroke="#7A0F18" strokeWidth="3" fill="none" opacity="0.5"/>
          {/* Ring 4 */}
          <circle cx="60" cy="60" r="44" stroke="#7A0F18" strokeWidth="2" fill="none" opacity="0.6"/>
          {/* Ring 3 */}
          <circle cx="60" cy="60" r="33" stroke="#7A0F18" strokeWidth="2.5" fill="none" opacity="0.7"/>
          {/* Ring 2 */}
          <circle cx="60" cy="60" r="22" stroke="#f5d0d2" strokeWidth="2.5" fill="#7A0F18" fillOpacity="0.2" opacity="0.85"/>
          {/* Bullseye */}
          <circle cx="60" cy="60" r="10" fill="#7A0F18" opacity="0.95"/>
          <circle cx="60" cy="60" r="4" fill="#ffffff"/>
          {/* Crosshair lines */}
          <line x1="60" y1="0" x2="60" y2="40" stroke="#7A0F18" strokeWidth="1.5" opacity="0.4"/>
          <line x1="60" y1="80" x2="60" y2="120" stroke="#7A0F18" strokeWidth="1.5" opacity="0.4"/>
          <line x1="0" y1="60" x2="40" y2="60" stroke="#7A0F18" strokeWidth="1.5" opacity="0.4"/>
          <line x1="80" y1="60" x2="120" y2="60" stroke="#7A0F18" strokeWidth="1.5" opacity="0.4"/>
        </svg>
      </div>

      {/* === LOGO & TEXT === */}
      <div className="preloader-brand" ref={logoRef}>
        <img src="https://i.ibb.co/zWRt8HLJ/logo.png" alt="Logo" className="preloader-logo" />
      </div>
      <p className="preloader-tagline" ref={taglineRef}>
        Precision. Focus. Excellence.
      </p>

      {/* Curtain exit */}
      <div className="preloader-curtain" ref={curtainRef}></div>
    </div>
  );
};

export default Preloader;
