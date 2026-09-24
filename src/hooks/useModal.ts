import { useEffect } from 'react';
import { useLocation, useNavigate, type Location } from 'react-router-dom';

/**
 * Shared modal-route behaviour: locks page scroll, closes on Escape, and
 * returns a `close` that goes back to the page underneath (or home when the
 * modal was opened directly from a link).
 */
export function useModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const hasBackground = Boolean((location.state as { background?: Location } | null)?.background);

  const close = () => (hasBackground ? navigate(-1) : navigate('/', { replace: true }));

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return close;
}
