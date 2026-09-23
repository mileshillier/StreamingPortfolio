import type { CSSProperties } from 'react';
import type { Title } from '../data/types';

interface TitleLogoProps {
  title: Title;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'div';
}

/** Type-driven stand-in for a title treatment / logo lockup. */
export default function TitleLogo({ title, size = 'md', showSubtitle = false, as: Tag = 'div' }: TitleLogoProps) {
  const { logo } = title;
  const style: CSSProperties = {
    fontFamily: logo.font,
    fontWeight: logo.weight ?? 400,
    fontStyle: logo.italic ? 'italic' : 'normal',
    letterSpacing: logo.letterSpacing,
    textTransform: logo.uppercase ? 'uppercase' : 'none',
  };

  return (
    <Tag className={`title-logo title-logo--${size}`}>
      <span className="title-logo__name" style={style}>
        {title.title}
      </span>
      {showSubtitle && title.subtitle && (
        <span className="title-logo__subtitle" style={{ color: title.accent }}>
          {title.subtitle}
        </span>
      )}
    </Tag>
  );
}
