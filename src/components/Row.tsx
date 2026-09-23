import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Title } from '../data/types';
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

export default function Row({ heading, titles, ranked, seeAllHref, progress, id }: RowProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = () => {
    const el = trackRef.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  };

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [titles.length]);

  const page = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' });
  };

  if (!titles.length) return null;

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
      <div className="row__viewport">
        {!edges.start && (
          <button className="row__arrow row__arrow--left" onClick={() => page(-1)} aria-label={`Scroll ${heading} left`}>
            <ChevronIcon dir="left" size={28} />
          </button>
        )}
        <div className={`row__track ${ranked ? 'row__track--ranked' : ''}`} ref={trackRef} onScroll={measure}>
          {titles.map((t, i) => (
            <TitleCard key={t.id} title={t} rank={ranked ? i + 1 : undefined} progress={progress?.[t.id]} />
          ))}
        </div>
        {!edges.end && (
          <button className="row__arrow row__arrow--right" onClick={() => page(1)} aria-label={`Scroll ${heading} right`}>
            <ChevronIcon dir="right" size={28} />
          </button>
        )}
      </div>
    </section>
  );
}
