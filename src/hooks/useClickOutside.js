import { useEffect } from 'react';


export function useClickOutside(ref, onOutsideClick, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    function handle(event) {
      if (!ref.current) return;
      if (!ref.current.contains(event.target)) {
        onOutsideClick?.(event);
      }
    }

    document.addEventListener('click', handle);
    return () => document.removeEventListener('click', handle);
  }, [ref, onOutsideClick, enabled]);
}
