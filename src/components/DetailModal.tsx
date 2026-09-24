import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SHOW_SOUND_CONTROLS } from '../config';
import { categoryById, chapterCount, getTitle, similarTitles } from '../data/titles';
import type { Title } from '../data/types';
import { useMyList } from '../context/MyListContext';
import { useModal } from '../hooks/useModal';
import { useOpenTitle } from '../hooks/useOpenTitle';
import Artwork from './Artwork';
import ClientName from './ClientName';
import TitleLogo from './TitleLogo';
import { ChevronIcon, CloseIcon, PlayIcon, PlusIcon, ThumbIcon, TrashIcon, VolumeIcon } from './Icons';

export default function DetailModal() {
  const { id } = useParams();
  const title = getTitle(id);
  const dialogRef = useRef<HTMLDivElement>(null);
  const close = useModal();

  // Moving between titles inside the modal should start at the top.
  useEffect(() => {
    dialogRef.current?.focus({ preventScroll: true });
    dialogRef.current?.parentElement?.scrollTo({ top: 0 });
  }, [id]);

  if (!title) {
    return (
      <div className="modal-overlay" onMouseDown={close}>
        <div className="modal modal--empty" onMouseDown={(e) => e.stopPropagation()}>
          <h2>Title not found</h2>
          <p>This case study may have left the catalog.</p>
          <button className="btn btn--primary" onClick={close}>Back to Browse</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onMouseDown={close}>
      <div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title.title}
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="modal__close" onClick={close} aria-label="Close">
          <CloseIcon size={20} />
        </button>
        <DetailHeader title={title} />
        <div className="modal__body">
          <DetailInfo title={title} />
          <Chapters title={title} />
          <MoreLikeThis title={title} />
          <About title={title} />
        </div>
      </div>
    </div>
  );
}

function DetailHeader({ title }: { title: Title }) {
  const { isSaved, toggleSaved, isLiked, toggleLiked } = useMyList();
  const [muted, setMuted] = useState(true);
  const saved = isSaved(title.id);
  const liked = isLiked(title.id);

  return (
    <header className="detail-hero">
      <Artwork key={title.id} seed={title.imageSeed} accent={title.accent} width={1600} height={900} className="detail-hero__art" eager />
      <div className="detail-hero__shade" />
      <div className="detail-hero__content">
        <TitleLogo title={title} size="lg" showSubtitle as="h2" />
        <div className="detail-hero__row">
          <div className="detail-hero__actions">
            <Link to={`/watch/${title.id}`} className="btn btn--primary btn--square">
              <PlayIcon size={20} /> Play
            </Link>
            <button
              className={`round-btn ${saved ? 'is-on' : ''}`}
              onClick={() => toggleSaved(title.id)}
              aria-pressed={saved}
              aria-label={saved ? 'Remove from My List' : 'Add to My List'}
              title={saved ? 'Remove from My List' : 'Add to My List'}
            >
              {saved ? <TrashIcon size={18} /> : <PlusIcon size={18} />}
            </button>
            <button
              className={`round-btn ${liked ? 'is-on' : ''}`}
              onClick={() => toggleLiked(title.id)}
              aria-pressed={liked}
              aria-label={liked ? 'Remove appreciation' : 'Appreciate this project'}
              title="I like this"
            >
              <ThumbIcon size={18} filled={liked} />
            </button>
          </div>
          <p className="detail-hero__tagline">{title.tagline}</p>
          {SHOW_SOUND_CONTROLS && (
            <button className="round-btn round-btn--ghost" onClick={() => setMuted((m) => !m)} aria-label={muted ? 'Unmute' : 'Mute'}>
              <VolumeIcon muted={muted} size={18} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function DetailInfo({ title }: { title: Title }) {
  const seasons = title.seasons.length;
  const [first, second, ...rest] = title.team;

  return (
    <section className="detail-info">
      <div className="detail-info__main">
        <div className="detail-info__meta">
          <span className="match">{title.match}% Match</span>
          <span>{title.year}</span>
          <span>
            {seasons} {seasons === 1 ? 'Season' : 'Seasons'}
          </span>
          <span className="tag-box">HD</span>
          <span className="tag-box tag-box--icon" title="Captions available">CC</span>
        </div>
        <div className="detail-info__rating">
          <span className="rating">{title.rating}</span>
          <span>{title.advisories.join(', ')}</span>
        </div>
        <p className="detail-info__desc">{title.description}</p>

        <ul className="outcomes">
          {title.outcomes.map((o) => (
            <li key={o.label}>
              <strong style={{ color: title.highlight ?? title.accent }}>{o.value}</strong>
              <span>{o.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <dl className="detail-info__side">
        <div>
          <dt>Team:</dt>
          <dd>
            {[first, second].filter(Boolean).join(', ')}
            {rest.length > 0 && (
              <>
                ,{' '}
                <button
                  className="link-btn"
                  onClick={() => document.getElementById('about-title')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <em>more</em>
                </button>
              </>
            )}
          </dd>
        </div>
        <div>
          <dt>Disciplines:</dt>
          <dd>{title.disciplines.join(', ')}</dd>
        </div>
        <div>
          <dt>Client:</dt>
          <dd><ClientName title={title} /></dd>
        </div>
        <div>
          <dt>This Project Is:</dt>
          <dd>{title.moods.join(', ')}</dd>
        </div>
      </dl>
    </section>
  );
}

function Chapters({ title }: { title: Title }) {
  const [seasonIndex, setSeasonIndex] = useState(0);
  const season = title.seasons[seasonIndex] ?? title.seasons[0];

  useEffect(() => setSeasonIndex(0), [title.id]);

  return (
    <section className="chapters" aria-labelledby="chapters-heading">
      <div className="chapters__head">
        <h3 id="chapters-heading">Chapters</h3>
        {title.seasons.length > 1 && (
          <label className="select">
            <span className="sr-only">Season</span>
            <select value={seasonIndex} onChange={(e) => setSeasonIndex(Number(e.target.value))}>
              {title.seasons.map((s, i) => (
                <option key={s.name} value={i}>
                  Season {i + 1}
                </option>
              ))}
            </select>
            <ChevronIcon size={14} />
          </label>
        )}
      </div>
      <p className="chapters__season">
        Season {seasonIndex + 1}: <strong>{season.name}</strong>
        <span className="rating">{title.rating}</span>
        <span>{title.advisories.slice(0, 2).join(', ')}</span>
      </p>

      <ol className="chapter-list">
        {season.chapters.map((ch) => (
          <li key={ch.imageSeed}>
            <Link to={`/watch/${title.id}#chapter-${seasonIndex + 1}-${ch.number}`} className="chapter">
              <span className="chapter__num">{ch.number}</span>
              <span className="chapter__thumb">
                <Artwork seed={ch.imageSeed} accent={title.accent} width={320} height={180} />
                <span className="chapter__play">
                  <PlayIcon size={18} />
                </span>
              </span>
              <span className="chapter__text">
                <span className="chapter__title">
                  <strong>{ch.title}</strong>
                  <span>{ch.minutes}m read</span>
                </span>
                <span className="chapter__synopsis">{ch.synopsis}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

function MoreLikeThis({ title }: { title: Title }) {
  const openTitle = useOpenTitle();
  const { isSaved, toggleSaved } = useMyList();

  return (
    <section className="more-like" aria-labelledby="more-like-heading">
      <h3 id="more-like-heading">More Like This</h3>
      <div className="more-like__grid">
        {similarTitles(title).map((t) => {
          const saved = isSaved(t.id);
          return (
            <article key={t.id} className="mini-card">
              <button className="mini-card__art" onClick={() => openTitle(t.id)} aria-label={`Open ${t.title}`}>
                <Artwork seed={t.imageSeed} accent={t.accent} width={480} height={270} />
                <TitleLogo title={t} size="sm" />
                <span className="mini-card__len">{chapterCount(t)} Chapters</span>
              </button>
              <div className="mini-card__body">
                <div className="mini-card__top">
                  <div>
                    <span className="match">{t.match}% Match</span>
                    <div className="mini-card__meta">
                      <span className="rating">{t.rating}</span>
                      <span>{t.year}</span>
                    </div>
                  </div>
                  <button
                    className={`round-btn round-btn--sm ${saved ? 'is-on' : ''}`}
                    onClick={() => toggleSaved(t.id)}
                    aria-label={saved ? `Remove ${t.title} from My List` : `Add ${t.title} to My List`}
                  >
                    {saved ? <TrashIcon size={14} /> : <PlusIcon size={14} />}
                  </button>
                </div>
                <p>{t.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function About({ title }: { title: Title }) {
  const rows: [string, string][] = [
    ['Creator', 'Miles Hillier'],
    ['Role', title.role],
    ['Client', title.client],
    ['Team', title.team.join(', ')],
    ['Category', categoryById(title.category).name],
    ['Genre', title.genre],
    ['Disciplines', title.disciplines.join(', ')],
    ['Tools', title.tools.join(', ')],
    ['This Project Is', title.moods.join(', ')],
  ];

  return (
    <section className="about-title" id="about-title">
      <h3>
        About <strong>{title.title}</strong>
      </h3>
      <dl>
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}:</dt>
            <dd>{v}</dd>
          </div>
        ))}
        <div>
          <dt>Maturity Rating:</dt>
          <dd>
            <span className="rating">{title.rating}</span> {title.advisories.join(', ')}
          </dd>
        </div>
      </dl>
    </section>
  );
}
