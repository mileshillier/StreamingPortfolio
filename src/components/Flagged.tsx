import { FLAG_PLACEHOLDERS } from '../config';

const BRACKETED = /(\[[^\]]+\])/;

/**
 * Renders copy with any [bracketed note] highlighted red, or the whole string
 * when `all` is set (for stand-in copy). Plain text when review mode is off.
 */
export default function Flagged({ text, all = false }: { text: string; all?: boolean }) {
  if (!FLAG_PLACEHOLDERS) return <>{text}</>;
  if (all) return <span className="needs-attention">{text}</span>;
  return (
    <>
      {text.split(BRACKETED).map((part, i) =>
        i % 2 ? (
          <span key={i} className="needs-attention">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
