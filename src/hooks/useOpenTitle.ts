import { useCallback } from 'react';
import { useLocation, useNavigate, type Location } from 'react-router-dom';

/** Opens a modal route (title detail, résumé) over whatever page is showing. */
export function useOpenModal() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (path: string) => {
      const current = (location.state as { background?: Location } | null)?.background ?? location;
      const replace = current !== location; // already in a modal: swap, don't stack
      navigate(path, { state: { background: current }, replace });
    },
    [navigate, location],
  );
}

/** Opens a title's detail screen as a modal over whatever page is showing. */
export function useOpenTitle() {
  const openModal = useOpenModal();
  return useCallback((id: string) => openModal(`/title/${id}`), [openModal]);
}
