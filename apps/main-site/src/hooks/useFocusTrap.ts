import { useEffect, useRef, RefObject } from 'react';

const FOCUSABLE_SELECTOR = 
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(
  containerRef: RefObject<HTMLElement>,
  isActive: boolean,
  options: {
    restoreFocusRef?: RefObject<HTMLElement>;
    autoFocus?: boolean;
  } = {}
) {
  const { restoreFocusRef, autoFocus = true } = options;
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    // Store the previously focused element
    previousActiveElementRef.current = document.activeElement as HTMLElement;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Auto-focus the first focusable element
    if (autoFocus) {
      // Small delay to ensure DOM is ready
      requestAnimationFrame(() => {
        firstElement?.focus();
      });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      // Re-query in case DOM changed
      const currentFocusable = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (currentFocusable.length === 0) return;

      const first = currentFocusable[0];
      const last = currentFocusable[currentFocusable.length - 1];

      if (e.shiftKey) {
        // Shift + Tab: if on first element, wrap to last
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        // Tab: if on last element, wrap to first
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    // Capture ref values for cleanup to avoid stale ref warnings
    const restoreFocusElement = restoreFocusRef?.current;
    const previousActiveElement = previousActiveElementRef.current;

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      
      // Restore focus when trap is deactivated
      if (restoreFocusElement) {
        restoreFocusElement.focus();
      } else if (previousActiveElement) {
        previousActiveElement.focus();
      }
    };
  }, [isActive, containerRef, restoreFocusRef, autoFocus]);
}
