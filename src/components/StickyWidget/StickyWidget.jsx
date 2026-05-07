import React, { useEffect, useRef, useState } from 'react';
import './StickyWidget.css';

const StickyWidget = ({ openModal }) => {
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setVisible(false);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setVisible(true), 300);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className={`sticky-widget-container${visible ? ' widget-visible' : ' widget-hidden'}`}>
      <button className="widget-btn enquire-btn" onClick={openModal} aria-label="Enquire Now">
        Enquire Now
      </button>
      <a
        href="https://wa.me/917400004444"
        target="_blank"
        rel="noopener noreferrer"
        className="widget-btn whatsapp-btn"
        aria-label="Contact on WhatsApp"
      >
        <img src="https://i.ibb.co/Z6ZB6h5z/wa-logo.png" alt="WhatsApp" className="whatsapp-img" width="40" height="40" loading="lazy" decoding="async" />
      </a>
    </div>
  );
};

export default StickyWidget;
