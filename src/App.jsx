import React, { useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Preloader from './components/Preloader/Preloader';
import './App.css';

// Lazy-load below-the-fold sections — splits them into separate JS chunks
const About = lazy(() => import('./components/About/About'));
const Training = lazy(() => import('./components/Training/Training'));
const Safety = lazy(() => import('./components/Safety/Safety'));
const Gallery = lazy(() => import('./components/Gallery/Gallery'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const BookingModal = lazy(() => import('./components/BookingModal/BookingModal'));
const StickyWidget = lazy(() => import('./components/StickyWidget/StickyWidget'));

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <Preloader onComplete={() => setIsLoading(false)} />
      )}

      <div
        className="app"
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.6s ease',
          pointerEvents: isLoading ? 'none' : 'all',
        }}
      >
        <Navbar openModal={() => setIsModalOpen(true)} />

        <main>
          <Hero openModal={() => setIsModalOpen(true)} />
          <Suspense fallback={null}>
            <About />
            <Training />
            <Safety />
            <Gallery />
            <Contact />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
          <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <StickyWidget openModal={() => setIsModalOpen(true)} />
        </Suspense>
      </div>
    </>
  );
}

export default App;
