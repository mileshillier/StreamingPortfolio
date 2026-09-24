import { useState } from 'react';
import { FLAG_PLACEHOLDERS } from '../config';
import { imageUrl } from '../data/titles';

interface ArtworkProps {
  seed: string;
  accent: string;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
  eager?: boolean;
}

/**
 * Placeholder key art. Renders a tinted gradient immediately and fades the
 * photo in on load, so a failed image request still looks intentional.
 */
export default function Artwork({ seed, accent, width = 1280, height = 720, alt = '', className = '', eager }: ArtworkProps) {
  const [state, setState] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <div
      className={`artwork ${FLAG_PLACEHOLDERS ? 'is-flagged' : ''} ${className}`}
      style={{ background: `radial-gradient(120% 90% at 70% 20%, ${accent}66, transparent 60%), linear-gradient(135deg, #1f1f1f, #0b0b0b)` }}
    >
      {state !== 'error' && (
        <img
          src={imageUrl(seed, width, height)}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={state === 'loaded' ? 'is-loaded' : ''}
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
        />
      )}
    </div>
  );
}
