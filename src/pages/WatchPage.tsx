import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Artwork from '../components/Artwork';
import ClientName from '../components/ClientName';
import Flagged from '../components/Flagged';
import TitleLogo from '../components/TitleLogo';
import { BackIcon, PlayIcon } from '../components/Icons';
import { TITLES, categoryById, chapterCount, getTitle, titlesInCategory } from '../data/titles';
import type { ChapterBlock } from '../data/types';
import NotFoundPage from './NotFoundPage';

const PLACEHOLDER_BODY = [
  'Placeholder narrative: describe the situation, the constraints, and what was at stake. Keep it human — who was affected, and why did it matter to the business?',
  'Placeholder narrative: walk through the decisions made in this phase, the alternatives considered, and the evidence that tipped the balance. Show the messy middle, not just the polished result.',
];

function Block({ block }: { block: ChapterBlock }) {
  if (typeof block === 'string')
    return (
      <p>
        <Flagged text={block} />
      </p>
    );
  const List = block.ordered ? 'ol' : 'ul';
  return (
    <List className="watch__list">
      {block.list.map((item) => (
        <li key={item}>
          <Flagged text={item} />
        </li>
      ))}
    </List>
  );
}

export default function WatchPage() {
  const { id } = useParams();
  const title = getTitle(id);
  const navigate = useNavigate();
  const { hash } = useLocation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [id]);

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }, [hash, id]);

  if (!title) return <NotFoundPage />;

  const siblings = titlesInCategory(title.category);
  const next = siblings[(siblings.indexOf(title) + 1) % siblings.length] ?? TITLES[0];

  return (
    <div className="watch">
      <div className="watch__bar">
        <button className="icon-btn" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/'))} aria-label="Back">
          <BackIcon size={24} />
        </button>
        <div className="watch__bar-title">
          <strong>{title.title}</strong>
          <span>{categoryById(title.category).name}</span>
        </div>
        <div className="watch__scrubber" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Reading progress">
          <span style={{ width: `${progress}%`, background: title.highlight ?? title.accent }} />
        </div>
      </div>

      <header className="watch__hero">
        <Artwork seed={title.imageSeed} accent={title.accent} width={1920} height={1080} className="watch__hero-art" eager />
        <div className="watch__hero-shade" />
        <div className="watch__hero-content">
          <TitleLogo title={title} size="xl" showSubtitle as="h1" />
          <p className="watch__tagline">{title.tagline}</p>
          <ul className="meta-dots">
            <li>{title.year}</li>
            <li>{title.role}</li>
            <li>
              <ClientName title={title} />
            </li>
            <li>{chapterCount(title)} Chapters</li>
          </ul>
        </div>
      </header>

      <article className="watch__body">
        <section className="watch__overview">
          <div>
            <h2>Previously on…</h2>
            <p>{title.description}</p>
          </div>
          <ul className="outcomes outcomes--large">
            {title.outcomes.map((o) => (
              <li key={o.label}>
                <strong style={{ color: title.highlight ?? title.accent }}>{o.value}</strong>
                <span>{o.label}</span>
              </li>
            ))}
          </ul>
        </section>

        {title.seasons.map((season, si) => (
          <section key={season.name} className="watch__season">
            <p className="watch__season-label" style={{ color: title.accent }}>
              Season {si + 1}
            </p>
            <h2>{season.name}</h2>
            {season.chapters.map((ch) => (
              <section key={ch.imageSeed} id={`chapter-${si + 1}-${ch.number}`} className="watch__chapter">
                <p className="watch__chapter-num">
                  S{si + 1}:E{ch.number} · {ch.minutes} min read
                </p>
                <h3>{ch.title}</h3>
                <p className="watch__lede">{ch.synopsis}</p>
                <figure>
                  <Artwork seed={ch.imageSeed} accent={title.accent} width={1600} height={900} />
                  <figcaption>
                    <Flagged text={ch.figure ?? 'Placeholder — project artifact, screen, or process photo.'} all />
                  </figcaption>
                </figure>
                {ch.body
                  ? ch.body.map((block, i) => <Block key={i} block={block} />)
                  : PLACEHOLDER_BODY.map((p) => (
                      <p key={p}>
                        <Flagged text={p} all />
                      </p>
                    ))}
                {ch.quote && (
                  <blockquote style={{ borderColor: title.highlight ?? title.accent }}>
                    “<Flagged text={ch.quote.text} />”
                    <cite>
                      — <Flagged text={ch.quote.cite} />
                    </cite>
                  </blockquote>
                )}
                {!ch.body && !ch.quote && ch.number === 2 && (
                  <blockquote style={{ borderColor: title.highlight ?? title.accent }}>
                    <Flagged text="“Placeholder pull quote from a stakeholder, customer, or teammate about the impact of this work.”" all />
                    <cite>
                      <Flagged text={`— Name, Title at ${title.client}`} all />
                    </cite>
                  </blockquote>
                )}
              </section>
            ))}
          </section>
        ))}

        <section className="watch__next">
          <p>Next Episode</p>
          <Link to={`/watch/${next.id}`} className="next-card">
            <Artwork seed={next.imageSeed} accent={next.accent} width={960} height={540} />
            <div className="next-card__shade" />
            <div className="next-card__content">
              <TitleLogo title={next} size="md" />
              <span>{next.tagline}</span>
              <span className="btn btn--primary btn--sm">
                <PlayIcon size={16} /> Play Next
              </span>
            </div>
          </Link>
        </section>
      </article>
    </div>
  );
}
