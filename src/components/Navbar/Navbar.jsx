import React, { useState, useEffect, useRef } from 'react';
import { Home, Info, Target, ShieldAlert, Image as ImageIcon, Phone } from 'lucide-react';
import './Navbar.css';
import logo from '../../assets/logo.PNG';

const navLinks = [
  { id: 'home',     label: 'Home',              icon: Home },
  { id: 'about',    label: 'About Us',           icon: Info },
  { id: 'training', label: 'Training Programs',  icon: Target },
  { id: 'safety',   label: 'Safety & Rules',     icon: ShieldAlert },
  { id: 'gallery',  label: 'Gallery',            icon: ImageIcon },
  { id: 'contact',  label: 'Contact',            icon: Phone },
];

const Navbar = ({ openModal }) => {
  const [active, setActive]         = useState('home');
  const [scrolled, setScrolled]     = useState(false);
  const [isScrolling, setScrolling] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Single scroll listener handles both scrolled state and hide-on-scroll
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setScrolling(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setScrolling(false), 400);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // IntersectionObserver for active section detection
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.5 }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timeoutRef.current);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Navbar — CSS transition replaces Framer Motion */}
      <nav className={`navbar-desktop${scrolled ? ' glass scrolled' : ''} navbar-enter`}>
        <div className="navbar-container">
          <div className="navbar-logo">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>
              <img
                src={logo}
                alt="MVM Mangadu Logo"
                className="logo-img"
                style={{ height: '65px', width: 'auto' }}
                width="65"
                height="65"
                fetchpriority="high"
                decoding="async"
              />
            </a>
          </div>

          <ul className="nav-links">
            {navLinks.map(({ id, label }) => (
              <li key={id} className="nav-item">
                <a
                  href={`#${id}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                  className={`nav-link${active === id ? ' active' : ''}`}
                >
                  {label}
                  {active === id && <span className="active-indicator" />}
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar-actions">
            <button className="btn-primary" onClick={openModal}>Book Range</button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navbar — CSS transform replaces Framer Motion spring */}
      <nav className={`navbar-mobile glass${isScrolling ? ' mobile-nav-hidden' : ''}`}>
        <ul className="mobile-nav-links">
          {navLinks.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <li key={id} className="mobile-nav-item">
                <a
                  href={`#${id}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                  className={`mobile-nav-link${isActive ? ' active' : ''}`}
                >
                  <div className="icon-container">
                    <Icon size={24} className="icon" />
                    {isActive && <span className="mobile-active-bg" />}
                  </div>
                  {isActive && <span className="mobile-nav-label">{label}</span>}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
