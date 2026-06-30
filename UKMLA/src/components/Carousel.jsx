import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Auto-scrolling image carousel with manual left/right arrows and dots.
 * Pauses auto-play on hover/focus and respects reduced-motion preferences.
 */
export default function Carousel({ images, interval = 4000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images.length;

  const go = useCallback((i) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  // Auto-advance
  const timer = useRef(null);
  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduce || count <= 1) return undefined;
    timer.current = setInterval(next, interval);
    return () => clearInterval(timer.current);
  }, [paused, next, interval, count]);

  return (
    <div
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Medical gallery"
    >
      <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {images.map((img) => (
          <figure className="carousel-slide" key={img.src}>
            <img src={img.src} alt={img.alt} loading="lazy" />
            {img.caption && <figcaption className="carousel-caption">{img.caption}</figcaption>}
          </figure>
        ))}
      </div>

      <button className="carousel-arrow prev" aria-label="Previous image" onClick={prev}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button className="carousel-arrow next" aria-label="Next image" onClick={next}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div className="carousel-dots" role="tablist" aria-label="Choose image">
        {images.map((img, i) => (
          <button
            key={img.src}
            className={`carousel-dot ${i === index ? 'active' : ''}`}
            aria-label={`Go to image ${i + 1}`}
            aria-selected={i === index}
            role="tab"
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  );
}
