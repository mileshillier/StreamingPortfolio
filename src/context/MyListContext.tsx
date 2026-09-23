import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

interface MyListValue {
  saved: string[];
  liked: string[];
  isSaved: (id: string) => boolean;
  isLiked: (id: string) => boolean;
  toggleSaved: (id: string) => void;
  toggleLiked: (id: string) => void;
}

const MyListContext = createContext<MyListValue | null>(null);

const read = (key: string): string[] => {
  try {
    const raw = localStorage.getItem(key);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : [];
  } catch {
    return [];
  }
};

const write = (key: string, value: string[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable (private mode); the list simply won't persist.
  }
};

const toggle = (list: string[], id: string) =>
  list.includes(id) ? list.filter((v) => v !== id) : [id, ...list];

export function MyListProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState(() => read('portfolio:my-list'));
  const [liked, setLiked] = useState(() => read('portfolio:liked'));

  useEffect(() => write('portfolio:my-list', saved), [saved]);
  useEffect(() => write('portfolio:liked', liked), [liked]);

  const toggleSaved = useCallback((id: string) => setSaved((l) => toggle(l, id)), []);
  const toggleLiked = useCallback((id: string) => setLiked((l) => toggle(l, id)), []);

  const value = useMemo<MyListValue>(
    () => ({
      saved,
      liked,
      isSaved: (id) => saved.includes(id),
      isLiked: (id) => liked.includes(id),
      toggleSaved,
      toggleLiked,
    }),
    [saved, liked, toggleSaved, toggleLiked],
  );

  return <MyListContext.Provider value={value}>{children}</MyListContext.Provider>;
}

export function useMyList(): MyListValue {
  const ctx = useContext(MyListContext);
  if (!ctx) throw new Error('useMyList must be used inside <MyListProvider>');
  return ctx;
}
