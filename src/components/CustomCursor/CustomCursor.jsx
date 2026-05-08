import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const posRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let rafId;

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const loop = () => {
      gsap.set(cursor, {
        x: posRef.current.x,
        y: posRef.current.y,
      });
      rafId = requestAnimationFrame(loop);
    };

    // Smooth lag follow using gsap quickTo
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.18, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.18, ease: 'power3.out' });

    const onMoveSmoothd = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    // Pulse rings animation
    const rings = cursor.querySelectorAll('.cc-ring');
    rings.forEach((ring, i) => {
      gsap.to(ring, {
        scale: 1.18,
        opacity: 0.3,
        duration: 0.9 + i * 0.25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.18,
      });
    });

    // Rotate crosshair slowly
    gsap.to(cursor.querySelector('.cc-crosshair'), {
      rotation: 45,
      duration: 6,
      repeat: -1,
      ease: 'none',
    });

    window.addEventListener('mousemove', onMoveSmoothd);

    // Click burst
    const onClick = () => {
      gsap.fromTo(
        cursor.querySelector('.cc-center'),
        { scale: 1 },
        { scale: 2.5, opacity: 0, duration: 0.35, ease: 'power2.out',
          onComplete: () => gsap.set(cursor.querySelector('.cc-center'), { scale: 1, opacity: 1 }) }
      );
    };
    window.addEventListener('click', onClick);

    // Grow on hoverable elements
    const onEnter = () => gsap.to(cursor, { scale: 1.35, duration: 0.25 });
    const onLeave = () => gsap.to(cursor, { scale: 1, duration: 0.25 });
    const interactables = document.querySelectorAll('a, button, [role="button"], input, textarea, select, label');
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMoveSmoothd);
      window.removeEventListener('click', onClick);
      cancelAnimationFrame(rafId);
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <div className="custom-cursor" ref={cursorRef} aria-hidden="true">
      {/* Outer pulsing rings */}
      <svg className="cc-rings" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <circle className="cc-ring" cx="60" cy="60" r="55" />
        <circle className="cc-ring" cx="60" cy="60" r="44" />
        <circle className="cc-ring" cx="60" cy="60" r="33" />
        <circle className="cc-ring" cx="60" cy="60" r="22" />
      </svg>

      {/* Crosshair lines */}
      <svg className="cc-crosshair" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        {/* Top */}
        <line x1="60" y1="0"  x2="60" y2="44" />
        {/* Bottom */}
        <line x1="60" y1="76" x2="60" y2="120" />
        {/* Left */}
        <line x1="0"  y1="60" x2="44" y2="60" />
        {/* Right */}
        <line x1="76" y1="60" x2="120" y2="60" />
      </svg>

      {/* Center dot */}
      <div className="cc-center" />
    </div>
  );
};

export default CustomCursor;
