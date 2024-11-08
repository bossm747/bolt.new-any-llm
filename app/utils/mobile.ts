/**
 * Detects if the current device is a mobile device
 */
export function isMobile() {
  if (typeof window === 'undefined') return false;
  
  // Check screen width
  const isMobileWidth = window.innerWidth < 768; // Changed from 640px to match our mobile breakpoint
  
  // Check for mobile user agent
  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  // Check for touch capability
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  return isMobileWidth || isMobileDevice || isTouchDevice;
}

/**
 * Detects if the current device is running iOS
 */
export function isIOS() {
  if (typeof window === 'undefined') return false;
  
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

/**
 * Detects if the device is in standalone mode (installed as PWA)
 */
export function isStandalone() {
  if (typeof window === 'undefined') return false;
  
  return (window.navigator as any).standalone || 
    window.matchMedia('(display-mode: standalone)').matches;
}

/**
 * Gets the safe area insets for iOS devices
 */
export function getSafeAreaInsets() {
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  
  return {
    top: parseInt(computedStyle.getPropertyValue('--safe-area-inset-top') || '0', 10),
    right: parseInt(computedStyle.getPropertyValue('--safe-area-inset-right') || '0', 10),
    bottom: parseInt(computedStyle.getPropertyValue('--safe-area-inset-bottom') || '0', 10),
    left: parseInt(computedStyle.getPropertyValue('--safe-area-inset-left') || '0', 10),
  };
}

/**
 * Updates CSS viewport height variable for mobile browsers
 */
export function updateMobileViewportHeight() {
  if (typeof window === 'undefined') return;
  
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

/**
 * Prevents elastic scrolling on iOS
 */
export function preventElasticScrolling(element: HTMLElement) {
  if (!isIOS()) return;
  
  let startY = 0;
  
  element.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
  }, { passive: false });
  
  element.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const deltaY = touch.clientY - startY;
    
    // Prevent overscroll when already at the top or bottom
    if (
      (element.scrollTop === 0 && deltaY > 0) || 
      (element.scrollHeight - element.scrollTop === element.clientHeight && deltaY < 0)
    ) {
      e.preventDefault();
    }
  }, { passive: false });
}
