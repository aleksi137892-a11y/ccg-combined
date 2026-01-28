import { useState, useEffect, useCallback } from 'react';

interface UseAnimatedPlaceholderOptions {
  placeholders: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  enabled?: boolean;
}

interface AnimatedPlaceholderResult {
  text: string;
  isTyping: boolean;
}

export const useAnimatedPlaceholder = ({
  placeholders,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
  enabled = true,
}: UseAnimatedPlaceholderOptions): AnimatedPlaceholderResult => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const animate = useCallback(() => {
    if (!enabled || placeholders.length === 0) {
      setCurrentText(placeholders[0] || '');
      return;
    }

    const currentPlaceholder = placeholders[currentIndex];

    if (isPaused) {
      return;
    }

    if (!isDeleting) {
      // Typing
      if (currentText.length < currentPlaceholder.length) {
        setCurrentText(currentPlaceholder.slice(0, currentText.length + 1));
      } else {
        // Finished typing, pause before deleting
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting
      if (currentText.length > 0) {
        setCurrentText(currentText.slice(0, -1));
      } else {
        // Finished deleting, move to next
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % placeholders.length);
      }
    }
  }, [currentText, currentIndex, isDeleting, isPaused, placeholders, pauseDuration, enabled]);

  useEffect(() => {
    if (!enabled) return;

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(animate, speed);

    return () => clearTimeout(timer);
  }, [animate, isDeleting, typingSpeed, deletingSpeed, enabled]);

  return {
    text: currentText,
    isTyping: !isPaused && !isDeleting,
  };
};

export default useAnimatedPlaceholder;
