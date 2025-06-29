import React, { useState, useEffect, useCallback } from 'react';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    // Use multiple methods to get scroll position for maximum compatibility
    const scrollTop = window.pageYOffset || 
                     document.documentElement.scrollTop || 
                     document.body.scrollTop || 0;
    
    setIsVisible(scrollTop > 300);
  }, []);

  const scrollToTop = useCallback(() => {
    console.log("ScrollToTopButton clicked, attempting to scroll to top.");
    
    // Try multiple scroll methods for maximum compatibility
    try {
      // Method 1: Modern browsers with smooth scrolling
      if ('scrollTo' in window && 'scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        return;
      }
      
      // Method 2: Fallback for browsers without smooth scroll
      if ('scrollTo' in window) {
        window.scrollTo(0, 0);
        return;
      }
      
      // Method 3: Direct DOM manipulation
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Method 4: Additional fallback for edge cases
      if (document.scrollingElement) {
        document.scrollingElement.scrollTop = 0;
      }
    } catch (error) {
      console.error('Error scrolling to top:', error);
    }
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      // Debounce scroll events for better performance
      clearTimeout(timeoutId);
      timeoutId = setTimeout(toggleVisibility, 10);
    };

    // Add event listeners for both scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    toggleVisibility();
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [toggleVisibility]);

  // Style constants for the button effects
  const baseBoxShadow = '0 10px 20px -5px rgba(0, 0, 0, 0.2), 0 6px 10px -7px rgba(0, 0, 0, 0.1)';
  const hoverTransform = 'translateZ(30px) scale(1.1) rotateY(-5deg)';
  const hoverBoxShadow = '0 15px 30px -5px rgba(56, 189, 248, 0.4), 0 8px 15px -8px rgba(79, 70, 229, 0.3)';

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-8 right-8 z-[9999] p-3.5 bg-gradient-to-br from-sky-500 to-indigo-600 dark:from-sky-400 dark:to-indigo-500 text-white rounded-full shadow-2xl transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 dark:focus-visible:ring-sky-600 cursor-pointer select-none"
      style={{
        transform: 'translateZ(20px)',
        boxShadow: baseBoxShadow,
        willChange: 'transform, box-shadow',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = hoverTransform;
        e.currentTarget.style.boxShadow = hoverBoxShadow;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateZ(20px)';
        e.currentTarget.style.boxShadow = baseBoxShadow;
      }}
      onTouchStart={(e) => {
        // Handle touch devices
        e.currentTarget.style.transform = 'translateZ(30px) scale(1.05)';
      }}
      onTouchEnd={(e) => {
        e.currentTarget.style.transform = 'translateZ(20px)';
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};
