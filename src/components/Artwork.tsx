import { useState } from 'react';
import { FLAG_PLACEHOLDERS } from '../config';
import { imageUrl } from '../data/titles';

interface ArtworkProps {
  seed: string;
  /** Real image. When set it replaces the placeholder photo and is never flagged. */
  src?: string;
  accent: string;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
  eager?: boolean;
  /** CSS object-position for the image, e.g. "top right". */
  position?: string;
  /** Looping muted video played over the image. Skipped when the viewer prefers reduced motion. */
  video?: string;
}

const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Placeholder key art. Renders a tinted gradient immediately and fades the
 * photo in on load, so a failed image request still looks intentional.
 */
export default function Artwork({ seed, src, accent, width = 1280, height = 720, alt = '', className = '', eager, position, video }: ArtworkProps) {
  const flagged = FLAG_PLACEHOLDERS && !src;
  const [state, setState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={`artwork ${flagged ? 'is-flagged' : ''} ${className}`}
      style={{ background: `radial-gradient(120% 90% at 70% 20%, ${accent}66, transparent 60%), linear-gradient(135deg, #1f1f1f, #0b0b0b)` }}
    >
      {state !== 'error' && (
        <img
          src={src ?? imageUrl(seed, width, height)}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          style={position ? { objectPosition: position } : undefined}
          className={state === 'loaded' ? 'is-loaded' : ''}
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
        />
      )}
      {video && !reducedMotion && (
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          style={position ? { objectPosition: position } : undefined}
          className={playing ? 'is-loaded' : ''}
          onPlaying={() => setPlaying(true)}
        />
      )}
    </div>
  );
}
