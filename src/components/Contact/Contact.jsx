import React, { useRef, useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';
import logo from '../../assets/logo.PNG';

// Plugin registered globally in main.jsx

const Contact = () => {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  const headerRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const map = mapRef.current;
    if (!section || !map) return;

    // Animate header + info + form with GSAP (replaces Framer Motion)
    gsap.fromTo(
      [headerRef.current, infoRef.current, formRef.current],
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 85%', once: true }
      }
    );

    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
      gsap.set(map, {
        rotationX: 65, rotationZ: -30, rotationY: 15,
        scale: 0.7, opacity: 0, z: -500,
        transformOrigin: 'center center'
      });
    } else {
      gsap.set(map, { scale: 0.9, opacity: 0 });
    }

    // Store ST reference to kill only this one on cleanup
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 85%',
      toggleActions: 'play reverse play reverse',
      onEnter: () => {
        if (!isMobile) {
          gsap.to(map, { duration: 1.2, rotationX: 0, rotationZ: 0, rotationY: 0, scale: 1, opacity: 1, z: 0, ease: 'power3.out' });
        } else {
          gsap.to(map, { duration: 0.8, scale: 1, opacity: 1, ease: 'power2.out' });
        }
      },
      onLeaveBack: () => {
        if (!isMobile) {
          gsap.to(map, { duration: 0.6, rotationX: 65, rotationZ: -30, rotationY: 15, scale: 0.7, opacity: 0, z: -500, ease: 'power2.in' });
        } else {
          gsap.to(map, { duration: 0.4, scale: 0.9, opacity: 0, ease: 'power2.in' });
        }
      },
    });

    return () => { st.kill(); };
  }, []);

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="contact-container">

        <div className="contact-header" ref={headerRef}>
          <div className="section-badge mx-auto">Get In Touch</div>
          <h2 className="section-title text-center">
            Get in touch <span className="highlight">with us</span>
          </h2>
        </div>

        <div className="contact-grid">
          <div className="contact-left-col">
            <div className="contact-info" ref={infoRef}>
              <div className="info-card">
                <div className="info-icon"><MapPin size={24} /></div>
                <div className="info-text">
                  <h3>Location</h3>
                  <p>123 Tactical Way<br />Precision City, ST 90210</p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon"><Phone size={24} /></div>
                <div className="info-text">
                  <h3>Phone</h3>
                  <p>+1 (555) 019-8472</p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon"><Mail size={24} /></div>
                <div className="info-text">
                  <h3>Email</h3>
                  <p>booking@wyuha.com</p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon"><Clock size={24} /></div>
                <div className="info-text">
                  <h3>Hours of Operation</h3>
                  <p>Mon-Sat: 08:00 - 22:00<br />Sun: 09:00 - 18:00</p>
                </div>
              </div>
            </div>

            <div className="contact-form-container" ref={formRef}>
              {isSubmitted ? (
                <div className="thank-you-container">
                  <div className="thank-you-content">
                    <img src={logo} alt="Wyuha Logo" className="modal-thank-you-logo" />
                    <div className="success-icon-wrapper">
                      <CheckCircle2 size={64} className="success-icon" />
                    </div>
                    <h2>Thank You!</h2>
                    <p>Your message has been received. We will get back to you shortly.</p>
                    <button 
                      className="btn-primary" 
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form className="contact-form" onSubmit={async (e) => {
                  e.preventDefault();
                  if (isSubmitting) return;
                  
                  setIsSubmitting(true);
                  const form = e.target;
                  const data = {
                    fullName: form.name.value,
                    email: form.email.value,
                    phone: form.phone.value,
                    message: form.message.value,
                    termsAccepted: form['tc-contact'].checked
                  };
                  
                  try {
                    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                    const res = await fetch(`${apiUrl}/api/contact`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data)
                    });
                    
                    if (!res.ok) {
                       const errData = await res.json();
                       alert("Error: " + (errData.error || "Submission failed"));
                    } else {
                       setIsSubmitted(true);
                       form.reset();
                    }
                  } catch(err) {
                    alert("Failed to connect to the server. Please try again later.");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" required placeholder="John Doe" disabled={isSubmitting} />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" required placeholder="john@example.com" disabled={isSubmitting} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input type="tel" id="phone" required placeholder="(555) 000-0000" disabled={isSubmitting} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" rows="4" required placeholder="How can we help you?" disabled={isSubmitting}></textarea>
                  </div>
                  <label className="tc-checkbox-label">
                    <input type="checkbox" id="tc-contact" required className="tc-checkbox" disabled={isSubmitting} />
                    <span>I have read and accept the Terms and Conditions</span>
                  </label>
                  <button type="submit" className={`btn-primary form-submit ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="contact-right-col">
            <div className="map-3d-wrapper" ref={mapRef}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3887.094649486424!2d80.12187017572367!3d13.029644313601771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sMangalam%20Street%2C%20Vasanthapuram%20Main%20Road%2C%20Mangadu%2C%20Chennai-600122!5e0!3m2!1sen!2sin!4v1778136389186!5m2!1sen!2sin"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wyuha Shooting Range Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
