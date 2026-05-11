import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2 } from 'lucide-react';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset states when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setIsSubmitted(false), 300);
    }
  }, [isOpen]);
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Framer motion variants for the 3D flip effect
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      rotateX: 90, 
      z: -100,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      rotateX: 0, 
      z: 0,
      scale: 1,
      transition: { 
        type: 'spring', 
        damping: 20, 
        stiffness: 100 
      }
    },
    exit: { 
      opacity: 0, 
      rotateX: -90, 
      z: -100,
      scale: 0.8,
      transition: { 
        duration: 0.3 
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div 
            className="modal-container"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            style={{ transformStyle: 'preserve-3d' }}
          >
            <button className="modal-close-btn" onClick={onClose} aria-label="Close">
              <X size={24} />
            </button>
            
            <div className="modal-content">
              {isSubmitted ? (
                <div className="modal-thank-you">
                  <img src="/logo.svg" alt="Wyuha Logo" className="modal-thank-you-logo" />
                  <div className="success-icon-wrapper">
                    <CheckCircle2 size={64} className="success-icon" />
                  </div>
                  <h3>Thank You!</h3>
                  <p>Your request has been received. Our team will contact you shortly.</p>
                  <button className="btn-primary" onClick={onClose}>Close</button>
                </div>
              ) : (
                <>
                  <h3 className="modal-title">Enquire Now</h3>
                  
                  <form className="modal-form" onSubmit={async (e) => {
                    e.preventDefault();
                    if (isSubmitting) return;

                    setIsSubmitting(true);
                    const form = e.target;
                    const data = {
                      fullName: form['modal-name'].value,
                      email: form['modal-email'].value,
                      phone: form['modal-phone'].value,
                      message: form['modal-message'].value,
                      termsAccepted: form['tc-modal'].checked
                    };
                    
                    try {
                      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                      const res = await fetch(`${apiUrl}/api/booking`, {
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
                    <div className="modal-form-group">
                      <label htmlFor="modal-name">Full Name</label>
                      <input type="text" id="modal-name" required placeholder="John Doe" disabled={isSubmitting} />
                    </div>
                    
                    <div className="modal-form-row">
                      <div className="modal-form-group">
                        <label htmlFor="modal-email">Email Address</label>
                        <input type="email" id="modal-email" required placeholder="john@example.com" disabled={isSubmitting} />
                      </div>
                      <div className="modal-form-group">
                        <label htmlFor="modal-phone">Phone Number</label>
                        <input type="tel" id="modal-phone" required placeholder="(555) 000-0000" disabled={isSubmitting} />
                      </div>
                    </div>
                    
                    <div className="modal-form-group">
                      <label htmlFor="modal-message">Message</label>
                      <textarea id="modal-message" rows="3" required placeholder="How can we help you?" disabled={isSubmitting}></textarea>
                    </div>
                    
                    <label className="tc-checkbox-label">
                      <input type="checkbox" id="tc-modal" required className="tc-checkbox" disabled={isSubmitting} />
                      <span>I have read and accept the Terms and Conditions</span>
                    </label>

                    <button type="submit" className={`btn-primary modal-submit ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={18} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
