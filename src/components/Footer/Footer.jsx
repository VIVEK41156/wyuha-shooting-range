import React, { useRef, useEffect, useState } from 'react';
import { Globe, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

// Plugin registered globally in main.jsx

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Footer = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const contentRefs = useRef([]);

  const addToRefs = (el) => {
    if (el && !contentRefs.current.includes(el)) contentRefs.current.push(el);
  };

  useEffect(() => {
    const footer = footerRef.current;
    const logo = logoRef.current;
    const contents = contentRefs.current;
    if (!footer || !logo || contents.length === 0) return;

    gsap.set(logo, { scale: 3, opacity: 0, rotationX: 80, rotationY: 20, z: 500, transformOrigin: 'center center' });
    gsap.set(contents, { opacity: 0, y: 50, rotationX: -20, transformOrigin: 'top center' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(logo, { scale: 1, opacity: 1, rotationX: 0, rotationY: 0, z: 0, duration: 1.2, ease: 'bounce.out' })
      .to(contents, { opacity: 1, y: 0, rotationX: 0, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)' }, '-=0.6');

    // Kill only this timeline's ScrollTrigger on cleanup
    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <footer className="site-footer" ref={footerRef}>
      <div className="footer-container">
        <div className="footer-grid">

          <div className="footer-col brand-col" ref={addToRefs}>
            <div className="footer-logo-wrapper" ref={logoRef}>
              <a href="#home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <img src="https://i.ibb.co/zWRt8HLJ/logo.png" alt="MVM Mangadu Logo" className="footer-logo" width="160" height="80" loading="lazy" decoding="async" />
              </a>
            </div>
            <p className="brand-desc">Precision, focus, and excellence. The premier destination for professional tactical training.</p>
          </div>

          <div className="footer-col" ref={addToRefs}>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home"><ChevronRight size={16} /> Home</a></li>
              <li><a href="#about"><ChevronRight size={16} /> About Us</a></li>
              <li><a href="#training"><ChevronRight size={16} /> Training Programs</a></li>
              <li><a href="#safety"><ChevronRight size={16} /> Safety & Rules</a></li>
              <li><a href="#gallery"><ChevronRight size={16} /> Gallery</a></li>
              <li><a href="#contact"><ChevronRight size={16} /> Contact</a></li>
            </ul>
          </div>

          <div className="footer-col" ref={addToRefs}>
            <h4 className="footer-heading">Contact Details</h4>
            <ul className="footer-contact-list">
              <li>
                <MapPin size={20} className="contact-icon" />
                <span>Vasanthapuram Main Road, Mangalam Street, Kattupakkam, Mangadu, Chennai-600 122</span>
              </li>
              <li>
                <Phone size={20} className="contact-icon" />
                <div className="phone-numbers">
                  <a href="tel:+917400004444">+91 74000 04444</a> | <a href="tel:+917338999333">+91 73389 99333</a>
                  <a href="tel:04426792861">044 - 26792861/62/63</a>
                </div>
              </li>
              <li>
                <Mail size={20} className="contact-icon" />
                <a href="mailto:info@mvmmangadu.in">info@mvmmangadu.in</a>
              </li>
            </ul>
          </div>

          <div className="footer-col" ref={addToRefs}>
            <h4 className="footer-heading">Connect With Us</h4>
            <div className="social-links">
              <a href="https://www.mvmmangadu.in/#" className="social-icon facebook" aria-label="Facebook"><FacebookIcon /></a>
              <a href="https://www.mvmmangadu.in/#" className="social-icon twitter" aria-label="X (Twitter)"><TwitterIcon /></a>
              <a href="https://www.mvmmangadu.in/#" className="social-icon website" aria-label="Website"><Globe size={24} /></a>
              <a href="https://www.mvmmangadu.in/#" className="social-icon linkedin" aria-label="LinkedIn"><LinkedinIcon /></a>
            </div>
          </div>

        </div>

        <div className="footer-bottom" ref={addToRefs}>
          <p>Copyrights 2026 | All Right Reserved MVM Mangadu</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
