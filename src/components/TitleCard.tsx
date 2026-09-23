import type { Title } from '../data/types';
import { categoryById } from '../data/titles';
import { useMyList } from '../context/MyListContext';
import { useOpenTitle } from '../hooks/useOpenTitle';
import Artwork from './Artwork';
import TitleLogo from './TitleLogo';
import { CheckIcon, ChevronIcon, PlusIcon } from './Icons';

interface TitleCardProps {
  title: Title;
  rank?: number;
  progress?: number;
}

export default function TitleCard({ title, rank, progress }: TitleCardProps) {
  const openTitle = useOpenTitle();
  const { isSaved, toggleSaved } = useMyList();
  const saved = isSaved(title.id);

  return (
    <div className={`card ${rank ? 'card--ranked' : ''}`}>
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
            {saved ? <CheckIcon size={14} /> : <PlusIcon size={14} />}
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
