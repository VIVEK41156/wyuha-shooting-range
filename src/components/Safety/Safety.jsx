import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ShieldAlert, Target, Eye, AlertTriangle, ChevronDown } from 'lucide-react';
import './Safety.css';

// Plugin registered globally in main.jsx

const commands = [
  {
    id: 1,
    title: 'CEASE FIRE',
    description: 'Immediately stop shooting, keep the firearm pointed downrange, remove your finger from the trigger, and await further instructions from the Range Officer. This can be called by ANYONE.',
    icon: AlertTriangle,
    color: '#ff3b3b',
  },
  {
    id: 2,
    title: 'MAKE SAFE',
    description: 'Unload the firearm, open the action, remove the magazine, and place the weapon on the bench facing downrange. Step back from the firing line.',
    icon: ShieldAlert,
    color: '#ffb020',
  },
  {
    id: 3,
    title: 'EYES & EARS',
    description: 'Ensure that all eye and ear protection is properly worn before anyone is permitted to approach the firing line or handle a weapon.',
    icon: Eye,
    color: '#47bfff',
  },
  {
    id: 4,
    title: 'RANGE IS HOT',
    description: 'The line is active. Shooters may approach the bench, load their firearms, and commence firing at their designated targets.',
    icon: Target,
    color: '#7A0F18',
  }
];

const Safety = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=4000',
        scrub: 1.5,
        pin: true,
      }
    });

    tl.to('.safety-bg-img', {
      scale: 2.5,
      filter: 'brightness(0.2)',
      ease: 'power1.inOut'
    }, 0);

    tl.to('.safety-intro', {
      opacity: 0,
      scale: 1.5,
      z: 500,
      ease: 'power2.in'
    }, 0);

    const cards = gsap.utils.toArray('.command-card-3d');
    cards.forEach((card, i) => {
      const startTime = i * 0.2 + 0.1;
      tl.fromTo(card,
        { z: -2000, opacity: 0, rotationX: 10, rotationY: (i % 2 === 0 ? 15 : -15) },
        { z: 300, opacity: 1, rotationX: 0, rotationY: 0, ease: 'power2.inOut', duration: 0.6 },
        startTime
      );
      tl.to(card, { opacity: 0, z: 800, scale: 1.5, duration: 0.2 }, startTime + 0.5);
    });

  }, { scope: containerRef });

  return (
    <section id="safety" className="safety-3d-wrapper" ref={containerRef}>
      <div className="safety-bg-container">
        <img src="/safety_bg.png" alt="Tactical Range Tunnel" className="safety-bg-img" loading="lazy" decoding="async" />
        <div className="safety-gradient-overlay"></div>
      </div>

      <div className="safety-scene">
        <div className="safety-intro">
          <div className="section-badge mx-auto danger-badge">Mandatory Protocol</div>
          <h2 className="section-title text-center">
            Range <span style={{ color: '#ff3b3b', textShadow: '0 0 20px rgba(255,59,59,0.5)' }}>Commands.</span>
          </h2>
          <p className="section-subtitle text-center">
            Scroll down to enter the active line and review crucial safety commands.
          </p>
          <ChevronDown className="scroll-arrow mx-auto mt-8" size={32} />
        </div>

        {commands.map((cmd) => {
          const Icon = cmd.icon;
          return (
            <div key={cmd.id} className="command-card-3d glass-dark">
              <div className="command-icon-wrapper" style={{ backgroundColor: `${cmd.color}20`, color: cmd.color, border: `1px solid ${cmd.color}50` }}>
                <Icon size={40} />
              </div>
              <h3 className="command-title" style={{ color: cmd.color }}>{cmd.title}</h3>
              <p className="command-desc">{cmd.description}</p>
              <div className="card-crosshair top-left"></div>
              <div className="card-crosshair top-right"></div>
              <div className="card-crosshair bottom-left"></div>
              <div className="card-crosshair bottom-right"></div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Safety;
