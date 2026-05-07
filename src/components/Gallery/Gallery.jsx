import React, { useRef, useEffect } from 'react';
import { Maximize2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Gallery.css';

// Plugin registered globally in main.jsx

const galleryImages = [
  { id: 1, url: 'https://picsum.photos/seed/wyuha1/1200/800' },
  { id: 2, url: 'https://picsum.photos/seed/wyuha2/1200/800' },
  { id: 3, url: 'https://picsum.photos/seed/wyuha3/1200/800' },
  { id: 4, url: 'https://picsum.photos/seed/wyuha4/1200/800' },
  { id: 5, url: 'https://picsum.photos/seed/wyuha5/1200/800' },
  { id: 6, url: 'https://picsum.photos/seed/wyuha6/1200/800' },
  { id: 7, url: 'https://picsum.photos/seed/wyuha7/1200/800' },
];

const Gallery = () => {
  const sectionRef = useRef(null);
  const sceneRef = useRef(null);
  const progressRef = useRef(null);
  // Track only our own ScrollTrigger instance — do NOT kill all
  const stRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scene = sceneRef.current;
    const cards = gsap.utils.toArray('.gallery-item');

    if (!section || !scene || cards.length === 0) return;

    const updateCoverflow = () => {
      const center = window.innerWidth / 2;
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distFromCenter = cardCenter - center;
        let normalizedDist = distFromCenter / (window.innerWidth * 0.5);
        normalizedDist = Math.max(-1, Math.min(1, normalizedDist));
        const rotateY = normalizedDist * -45;
        const scale = 1 - Math.abs(normalizedDist) * 0.2;
        const z = Math.abs(normalizedDist) * -400;
        const brightness = 1 - Math.abs(normalizedDist) * 0.6;
        gsap.set(card, {
          rotationY: rotateY,
          scale,
          z,
          filter: `brightness(${brightness})`,
          transformPerspective: 1200,
          transformOrigin: 'center center',
        });
      });
    };

    const getScrollData = () => {
      const currentX = gsap.getProperty(scene, 'x');
      gsap.set(scene, { x: 0 });
      const center = window.innerWidth / 2;
      const firstRect = cards[0].getBoundingClientRect();
      const lastRect = cards[cards.length - 1].getBoundingClientRect();
      const startX = center - (firstRect.left + firstRect.width / 2);
      const endX = center - (lastRect.left + lastRect.width / 2);
      if (currentX) gsap.set(scene, { x: currentX });
      return { startX, endX, distance: Math.abs(endX - startX) };
    };

    gsap.set(scene, { x: () => getScrollData().startX });
    updateCoverflow();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${getScrollData().distance}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressRef.current) {
            gsap.set(progressRef.current, { width: `${self.progress * 100}%` });
          }
          updateCoverflow();
        }
      }
    });

    // Store reference to kill only this trigger on cleanup
    stRef.current = ScrollTrigger.getById(tl.scrollTrigger?.id);

    tl.to(scene, { x: () => getScrollData().endX, ease: 'none' });

    const handleResize = () => {
      updateCoverflow();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      // Kill only the ScrollTrigger(s) created by this timeline, not ALL triggers
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section id="gallery" className="gallery-section" ref={sectionRef}>
      <div className="gallery-sticky-wrapper">
        <div className="gallery-header">
          <div className="section-badge mx-auto">Facility Showcase</div>
          <h2 className="section-title text-center">
            The Wyuha <span className="highlight">Experience.</span>
          </h2>
        </div>

        <div className="gallery-3d-scene" ref={sceneRef}>
          {galleryImages.map((img) => (
            <div key={img.id} className="gallery-item">
              <img
                src={img.url}
                alt={`Gallery Image ${img.id}`}
                width="1200"
                height="800"
                loading="lazy"
                decoding="async"
              />
              <div className="gallery-overlay">
                <Maximize2 size={32} className="expand-icon" />
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-progress-bar">
          <div className="gallery-progress-fill" ref={progressRef}></div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
