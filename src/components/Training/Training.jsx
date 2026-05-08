import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ShieldCheck, Zap, Crosshair } from 'lucide-react';
import './Training.css';

// Plugin registered globally in main.jsx

const programs = [
  {
    id: 'beginner',
    title: 'Beginner Module',
    subtitle: 'Foundation & Safety',
    description: 'Master the absolute core principles of firearm safety, handling, and basic marksmanship in a highly controlled, welcoming environment. Perfect for first-time shooters looking to build confidence.',
    icon: ShieldCheck,
    image: '/training_beginner_new.png',
  },
  {
    id: 'intermediate',
    title: 'Intermediate Module',
    subtitle: 'Tactical Dynamics',
    description: 'Elevate your skills from static shooting to dynamic movement. Focus on rapid target acquisition, barricade drills, and handling modern sporting rifles under controlled stress.',
    icon: Zap,
    image: '/training_intermediate_perfect.png',
  },
  {
    id: 'competitive',
    title: 'Competitive Module',
    subtitle: 'Elite Precision',
    description: 'Refine your accuracy to a surgical level. Designed for aspiring competitive shooters and snipers. Focuses intensely on breathing, trigger control, and advanced ballistics over long distances.',
    icon: Crosshair,
    image: '/training_competitive_new.png',
  }
];

const Training = () => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray('.training-panel');

    const scrollTween = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => '+=' + sliderRef.current.offsetWidth,
      }
    });

    panels.forEach((panel) => {
      const image = panel.querySelector('.panel-image img');
      const content = panel.querySelector('.panel-content');

      gsap.to(image, {
        xPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: true,
          containerAnimation: scrollTween,
          start: 'left right',
          end: 'right left',
        }
      });

      gsap.from(content, {
        opacity: 0,
        rotateY: 45,
        z: -300,
        x: 100,
        scrollTrigger: {
          trigger: panel,
          containerAnimation: scrollTween,
          start: 'left center',
          toggleActions: 'play none none reverse'
        }
      });
    });

  }, { scope: containerRef });

  return (
    <section id="training" className="training-3d-wrapper" ref={containerRef}>
      <div className="training-intro-overlay">
        <h2 className="section-title text-center">
          Wyuha <span className="highlight">Curriculum.</span>
        </h2>
        <p className="scroll-hint">Scroll to explore modules</p>
      </div>

      <div className="training-slider" ref={sliderRef}>
        {programs.map((program) => {
          const Icon = program.icon;
          return (
            <div key={program.id} className="training-panel">
              <div className="panel-image">
                <img src={program.image} alt={program.title} loading="lazy" decoding="async" />
                <div className="panel-gradient"></div>
              </div>
              <div className="panel-content glass-dark">
                <div className="panel-icon-wrapper">
                  <Icon size={32} />
                </div>
                <div className="section-badge">{program.subtitle}</div>
                <h3 className="panel-title">{program.title}</h3>
                <p className="panel-desc">{program.description}</p>
                <button className="btn-glass mt-8">Explore Curriculum</button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Training;
