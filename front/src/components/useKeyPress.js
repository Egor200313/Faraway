import { useEffect } from 'react';

export default function useKeyPress(key, action) {
  useEffect(() => {
    function onKeyUp(event) {
      if (key === 'any' || event.key === key) action();
    }
    window.addEventListener('keyup', onKeyUp);
    return () => window.removeEventListener('keyup', onKeyUp);
  }, [key, action]);
}
