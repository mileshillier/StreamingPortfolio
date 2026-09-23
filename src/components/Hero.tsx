import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { categoryById, chapterCount } from '../data/titles';
import type { Title } from '../data/types';
import { useOpenTitle } from '../hooks/useOpenTitle';
import logo from '../assets/logo.svg';
import Artwork from './Artwork';
import TitleLogo from './TitleLogo';
import { SHOW_SOUND_CONTROLS } from '../config';
import { InfoIcon, PlayIcon, SparkIcon, VolumeIcon } from './Icons';

const CAPTIONS = [
  '…for a lifetime supply of pixels.',
  '“We have to ship it by Friday.”',
  '…and that’s when the research changed everything.',
];

export default function Hero({ title }: { title: Title }) {
  const openTitle = useOpenTitle();
  const [muted, setMuted] = useState(true);
  const [caption, setCaption] = useState(0);

  // Cycle "subtitles" to suggest a trailer is playing behind the hero.
  useEffect(() => {
    const t = window.setInterval(() => setCaption((c) => (c + 1) % CAPTIONS.length), 4200);
    return () => window.clearInterval(t);
  }, []);

  return (
    <section className="hero" aria-label={`Featured: ${title.title}`}>
      <div className="hero__frame">
        <Artwork seed={title.imageSeed} accent={title.accent} width={1920} height={1080} className="hero__art" eager />
        <div className="hero__shade" />

        <img className="hero__mark" src={logo} alt="" aria-hidden />
        {SHOW_SOUND_CONTROLS && (
          <button className="hero__mute" onClick={() => setMuted((m) => !m)} aria-label={muted ? 'Unmute trailer' : 'Mute trailer'}>
            <VolumeIcon muted={muted} size={16} />
          </button>
        )}

        <div className="hero__content">
          <span className="hero__eyebrow">
            <SparkIcon size={14} style={{ color: title.accent }} /> Featured Case Study
          </span>
          <TitleLogo title={title} size="xl" showSubtitle as="h1" />
          <ul className="meta-dots">
            <li>{title.format}</li>
            <li>{categoryById(title.category).shortName}</li>
            <li>{title.year}</li>
            <li>{chapterCount(title)} Chapters</li>
            <li className="meta-dots__muted">{title.rating}</li>
          </ul>
          <p className="hero__tagline">{title.tagline}</p>
          <div className="hero__actions">
            <Link to={`/watch/${title.id}`} className="btn btn--primary">
              <PlayIcon size={18} /> Play
            </Link>
            <button className="btn btn--glass" onClick={() => openTitle(title.id)}>
              <InfoIcon size={18} /> More Info
            </button>
          </div>
        </div>

        <p key={caption} className="hero__caption" aria-hidden>
          {CAPTIONS[caption]}
        </p>

        <span className="hero__promo">
          <span className="hero__promo-dot" style={{ background: title.accent }} />
          New Chapter Streaming Now
        </span>
      </div>
    </section>
  );
}
