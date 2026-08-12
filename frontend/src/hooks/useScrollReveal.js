import { useEffect, useRef } from 'react';

export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  
  useEffect(() => {
    // Check if CSS scroll-driven animations are supported
    if (CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
      // CSS handles it via .scroll-reveal class
      return;
    }
    
    const el = ref.current;
    if (!el) return;
    
    el.classList.add('scroll-reveal-js');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: options.threshold || 0.1, rootMargin: options.rootMargin || '0px' }
    );
    
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  
  return ref;
}
