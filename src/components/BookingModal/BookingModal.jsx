import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose }) => {
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
              <h3 className="modal-title">Deploy With Us</h3>
              
              <form className="modal-form">
                <div className="modal-form-group">
                  <label htmlFor="modal-name">Full Name</label>
                  <input type="text" id="modal-name" placeholder="John Doe" />
                </div>
                
                <div className="modal-form-row">
                  <div className="modal-form-group">
                    <label htmlFor="modal-email">Email Address</label>
                    <input type="email" id="modal-email" placeholder="john@example.com" />
                  </div>
                  <div className="modal-form-group">
                    <label htmlFor="modal-phone">Phone Number</label>
                    <input type="tel" id="modal-phone" placeholder="(555) 000-0000" />
                  </div>
                </div>
                
                <div className="modal-form-group">
                  <label htmlFor="modal-message">Message</label>
                  <textarea id="modal-message" rows="3" placeholder="How can we help you?"></textarea>
                </div>
                
                <label className="tc-checkbox-label">
                  <input type="checkbox" id="tc-modal" className="tc-checkbox" />
                  <span>I have read and accept the Terms and Conditions</span>
                </label>

                <button type="button" className="btn-primary modal-submit">
                  Send Message <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
