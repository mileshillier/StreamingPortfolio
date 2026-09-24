import { useCallback, useEffect, useLayoutEffect, useRef, useState, type FocusEvent } from 'react';
import { Link } from 'react-router-dom';
import type { Title } from '../data/types';
import { useMediaQuery } from '../hooks/useMediaQuery';
import TitleCard from './TitleCard';
import { ChevronIcon } from './Icons';

interface RowProps {
  heading: string;
  titles: Title[];
  ranked?: boolean;
  seeAllHref?: string;
  progress?: Record<string, number>;
  id?: string;
}

/**
 * On pointer devices the row pages with a transform instead of native
 * scrolling: a scroll container clips vertically, which would cut off cards
 * as they enlarge on hover. Touch devices keep native swipe scrolling.
 */
const PAGED_QUERY = '(hover: hover) and (min-width: 900px)';

export default function Row({ heading, titles, ranked, seeAllHref, progress, id }: RowProps) {
  const paged = useMediaQuery(PAGED_QUERY);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const [scrollEdges, setScrollEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    const last = track?.lastElementChild as HTMLElement | null;
    if (!track || !viewport || !last) return;
    if (paged) {
      const gutter = parseFloat(getComputedStyle(track).paddingRight) || 0;
      const max = Math.max(0, last.offsetLeft + last.offsetWidth + gutter - viewport.clientWidth);
      setMaxOffset(max);
      setOffset((o) => Math.min(o, max));
    } else {
      setScrollEdges({
        start: track.scrollLeft <= 4,
        end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4,
      });
    }
  }, [paged]);

  useLayoutEffect(() => {
    setOffset(0);
    if (trackRef.current) trackRef.current.scrollLeft = 0;
  }, [paged]);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure, titles.length]);

  const page = (dir: 1 | -1) => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    if (paged) {
      const gutter = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      const step = viewport.clientWidth - gutter * 2;
      setOffset((o) => Math.max(0, Math.min(maxOffset, o + dir * step)));
    } else {
      track.scrollBy({ left: dir * track.clientWidth * 0.9, behavior: 'smooth' });
    }
  };

  // Keep keyboard focus visible: slide the row so a focused card is in view.
  const onFocus = (e: FocusEvent<HTMLDivElement>) => {
    if (!paged) return;
    const card = (e.target as HTMLElement).closest<HTMLElement>('.card');
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!card || !track || !viewport) return;
    const gutter = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    const left = card.offsetLeft - gutter;
    const right = card.offsetLeft + card.offsetWidth + gutter - viewport.clientWidth;
    if (left < offset) setOffset(Math.max(0, left));
    else if (right > offset) setOffset(Math.min(maxOffset, right));
  };

  if (!titles.length) return null;

  const atStart = paged ? offset <= 1 : scrollEdges.start;
  const atEnd = paged ? offset >= maxOffset - 1 : scrollEdges.end;

  return (
    <section className="row" id={id} aria-label={heading}>
      <h2 className="row__heading">
        {seeAllHref ? (
          <Link to={seeAllHref}>
            {heading}
            <span className="row__explore">
              Explore All <ChevronIcon dir="right" size={14} />
            </span>
          </Link>
        ) : (
          heading
        )}
      </h2>
      <div className={`row__viewport ${paged ? 'row__viewport--paged' : ''}`} ref={viewportRef}>
        {!atStart && (
          <button className="row__arrow row__arrow--left" onClick={() => page(-1)} aria-label={`Scroll ${heading} left`}>
            <ChevronIcon dir="left" size={28} />
          </button>
        )}
        <div
          className={`row__track ${ranked ? 'row__track--ranked' : ''}`}
          ref={trackRef}
          onScroll={paged ? undefined : measure}
          onFocus={onFocus}
          style={paged ? { transform: `translate3d(${-offset}px, 0, 0)` } : undefined}
        >
          {titles.map((t, i) => (
            <TitleCard key={t.id} title={t} rank={ranked ? i + 1 : undefined} progress={progress?.[t.id]} />
          ))}
        </div>
        {!atEnd && (
          <button className="row__arrow row__arrow--right" onClick={() => page(1)} aria-label={`Scroll ${heading} right`}>
            <ChevronIcon dir="right" size={28} />
          </button>
        )}
      </div>
    </section>
  );
}
