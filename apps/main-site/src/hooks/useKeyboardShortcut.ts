import { useEffect, useCallback } from 'react';

interface UseKeyboardShortcutOptions {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  callback: () => void;
  enabled?: boolean;
}

export const useKeyboardShortcut = ({
  key,
  ctrlKey = false,
  metaKey = false,
  callback,
  enabled = true,
}: UseKeyboardShortcutOptions) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      const isCtrlOrMeta = ctrlKey || metaKey;
      const modifierMatch = isCtrlOrMeta
        ? event.ctrlKey || event.metaKey
        : true;

      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        modifierMatch &&
        !event.repeat
      ) {
        // Don't trigger if user is typing in an input
        const target = event.target as HTMLElement;
        if (
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable
        ) {
          return;
        }

        event.preventDefault();
        callback();
      }
    },
    [key, ctrlKey, metaKey, callback, enabled]
  );

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, enabled]);
};

export default useKeyboardShortcut;
