import { useState, type MouseEvent } from 'react';
import type { Title } from '../data/types';
import { categoryById } from '../data/titles';
import { useMyList } from '../context/MyListContext';
import { useOpenTitle } from '../hooks/useOpenTitle';
import Artwork from './Artwork';
import TitleLogo from './TitleLogo';
import { ChevronIcon, PlusIcon, TrashIcon } from './Icons';

type Origin = 'left center' | 'center' | 'right center';

/** Keep in sync with `.card:hover` in global.css. */
const HOVER_SCALE = 1.3;

/**
 * Cards enlarge on hover. A card with no visible neighbour on one side is at
 * the edge of its row or grid line, so it grows inward from that edge instead
 * of spilling off screen.
 */
const originFor = (card: HTMLElement): Origin => {
  // offsetTop ignores transforms, so a neighbour still animating back from its
  // own hover is judged by its layout position, not its scaled box.
  const vw = document.documentElement.clientWidth;
  const center = (rect: DOMRect) => rect.left + rect.width / 2;
  const r = card.getBoundingClientRect();
  const x = center(r);
  const visibleOnLine = Array.from(card.parentElement?.children ?? [])
    .filter((el): el is HTMLElement => el !== card && (el as HTMLElement).offsetTop === card.offsetTop)
    .map((el) => el.getBoundingClientRect())
    .filter((s) => s.left >= -1 && s.right <= vw + 1);
  if (!visibleOnLine.some((s) => center(s) < x)) return 'left center';
  // Only anchor right when growing from the center would run off the screen
  // (a short last line in a grid has room to grow normally).
  const overflowsRight = r.right + r.width * (HOVER_SCALE - 1) / 2 > vw;
  if (overflowsRight && !visibleOnLine.some((s) => center(s) > x)) return 'right center';
  return 'center';
};

interface TitleCardProps {
  title: Title;
  rank?: number;
  progress?: number;
}

export default function TitleCard({ title, rank, progress }: TitleCardProps) {
  const openTitle = useOpenTitle();
  const { isSaved, toggleSaved } = useMyList();
  const saved = isSaved(title.id);
  const [origin, setOrigin] = useState<Origin>('center');

  const onMouseEnter = (e: MouseEvent<HTMLDivElement>) => setOrigin(originFor(e.currentTarget));

  return (
    <div className={`card ${rank ? 'card--ranked' : ''}`} style={{ transformOrigin: origin }} onMouseEnter={onMouseEnter}>
      {rank && (
        <span className="card__rank" aria-hidden>
          {rank}
        </span>
      )}
      <button className="card__button" onClick={() => openTitle(title.id)} aria-label={`${title.title} — ${categoryById(title.category).shortName}. Open details`}>
        <Artwork seed={title.imageSeed} accent={title.accent} width={640} height={360} className="card__art" />
        <div className="card__shade" />
        <TitleLogo title={title} size="sm" />
        {title.badge && title.badge !== 'Top 10' && progress === undefined && (
          <span className={`badge badge--${title.badge.toLowerCase().replace(/\s+/g, '-')}`}>{title.badge}</span>
        )}
        {title.badge === 'Top 10' && !rank && <span className="badge-top10" aria-label="Top 10">TOP<b>10</b></span>}
        {progress !== undefined && (
          <span className="card__progress">
            <span style={{ width: `${progress}%` }} />
          </span>
        )}
      </button>

      <div className="card__hover" aria-hidden>
        <div className="card__hover-actions">
          <button
            className="round-btn round-btn--sm"
            tabIndex={-1}
            onClick={() => toggleSaved(title.id)}
            title={saved ? 'Remove from My List' : 'Add to My List'}
          >
            {saved ? <TrashIcon size={14} /> : <PlusIcon size={14} />}
          </button>
          <button className="round-btn round-btn--sm round-btn--push" tabIndex={-1} onClick={() => openTitle(title.id)} title="More info">
            <ChevronIcon size={14} />
          </button>
        </div>
        <div className="card__hover-meta">
          <span className="match">{title.match}% Match</span>
          <span className="rating">{title.rating}</span>
          <span>{title.year}</span>
        </div>
        <div className="card__hover-tags">{title.moods.join(' • ')}</div>
      </div>
    </div>
  );
}
