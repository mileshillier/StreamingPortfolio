import { useCallback } from 'react';
import { useLocation, useNavigate, type Location } from 'react-router-dom';

/** Opens a title's detail screen as a modal over whatever page is showing. */
export function useOpenTitle() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (id: string) => {
      const current = (location.state as { background?: Location } | null)?.background ?? location;
      const replace = current !== location; // already in a modal: swap, don't stack
      navigate(`/title/${id}`, { state: { background: current }, replace });
    },
    [navigate, location],
  );
}
