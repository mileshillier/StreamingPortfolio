import { parse as parseYaml } from 'yaml';
import { caseStudyImages } from './caseStudyImages';
import type { Chapter, Season, Title } from './types';

/**
 * Case studies written as `src/assets/case-studies/<Client>/case-study.md`:
 * YAML front matter for the title card, Markdown-ish body for seasons and chapters.
 * The format is documented at the top of each file.
 */
const sources = import.meta.glob<string>('../assets/case-studies/*/case-study.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const REQUIRED = ['id', 'title', 'tagline', 'category', 'client', 'role', 'year', 'format', 'genre', 'rating', 'description', 'accent'] as const;

const list = (v: unknown): string[] => (Array.isArray(v) ? v.map(String) : v == null || v === '' ? [] : [String(v)]);

function parseBody(md: string, id: string, images: ReturnType<typeof caseStudyImages>): Season[] {
  const seasons: Season[] = [];
  let chapter: Chapter | undefined;
  let para: string[] = [];
  let items: { ordered: boolean; list: string[] } | undefined;
  let quote: string[] = [];
  let n = 0;

  const body = () => (chapter!.body ??= []);
  const flush = () => {
    if (!chapter) return;
    if (para.length) {
      const text = para.join(' ');
      const synopsis = text.match(/^[_*](.+)[_*]$/);
      if (synopsis && !chapter.synopsis) chapter.synopsis = synopsis[1].trim();
      else body().push(text);
    }
    if (items) body().push(items.ordered ? { ordered: true, list: items.list } : { list: items.list });
    if (quote.length) {
      const last = quote[quote.length - 1];
      const cite = /^[—–-]\s*/.test(last) ? last.replace(/^[—–-]\s*/, '') : '';
      const text = (cite ? quote.slice(0, -1) : quote).join(' ');
      chapter.quote = { text, cite };
    }
    para = [];
    items = undefined;
    quote = [];
  };

  for (const raw of md.replace(/<!--[\s\S]*?-->/g, '').split('\n')) {
    const line = raw.trim();
    let m: RegExpMatchArray | null;
    if (!line) {
      flush();
    } else if ((m = line.match(/^#\s+(.+)$/))) {
      flush();
      chapter = undefined;
      seasons.push({ name: m[1].replace(/^Season\s+\d+\s*[:·-]\s*/i, '').trim(), chapters: [] });
    } else if ((m = line.match(/^##\s+(.+?)(?:\s+·\s+(\d+)\s*min)?$/))) {
      flush();
      if (!seasons.length) seasons.push({ name: 'Season 1', chapters: [] });
      n += 1;
      const season = seasons[seasons.length - 1];
      chapter = {
        number: season.chapters.length + 1,
        title: m[1].trim(),
        synopsis: '',
        minutes: m[2] ? Number(m[2]) : 3,
        imageSeed: `${id}-ch${n}`,
        image: images.chapter(n),
      };
      season.chapters.push(chapter);
    } else if (!chapter) {
      continue;
    } else if ((m = line.match(/^!\[(.*)\]\((.*)\)$/))) {
      flush();
      chapter.figure = m[1].trim() || undefined;
      chapter.image = images.file(m[2]);
    } else if ((m = line.match(/^>\s?(.*)$/))) {
      if (para.length || items) flush();
      quote.push(m[1].trim());
    } else if ((m = line.match(/^(\d+)[.)]\s+(.+)$/)) || (m = line.match(/^([-*])\s+(.+)$/))) {
      if (para.length || quote.length) flush();
      items ??= { ordered: /\d/.test(m[1]), list: [] };
      items.list.push(m[2].trim());
    } else {
      if (items || quote.length) flush();
      para.push(line);
    }
  }
  flush();
  return seasons;
}

function toTitle(path: string, source: string): Title {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`${path}: missing the --- settings block at the top.`);
  const meta = (parseYaml(match[1]) ?? {}) as Record<string, unknown>;
  const missing = REQUIRED.filter((k) => meta[k] == null || meta[k] === '');
  if (missing.length) throw new Error(`${path}: missing ${missing.join(', ')}.`);

  const id = String(meta.id);
  const client = String(meta.client);
  const images = caseStudyImages(client);
  const font = (meta.titleFont ?? {}) as Record<string, unknown>;

  return {
    id,
    title: String(meta.title),
    subtitle: meta.subtitle ? String(meta.subtitle) : undefined,
    tagline: String(meta.tagline),
    category: meta.category as Title['category'],
    client,
    role: String(meta.role),
    year: Number(meta.year),
    format: meta.format as Title['format'],
    genre: String(meta.genre),
    rating: String(meta.rating),
    advisories: list(meta.advisories),
    description: String(meta.description).trim(),
    team: list(meta.team),
    disciplines: list(meta.disciplines),
    tools: list(meta.tools),
    moods: list(meta.moods),
    outcomes: ((meta.outcomes as { value: unknown; label: unknown }[] | undefined) ?? []).map((o) => ({
      value: String(o.value),
      label: String(o.label),
    })),
    imageSeed: `${id}-${client.toLowerCase()}`,
    cover: images.file(meta.cover as string | undefined),
    clientLogo: images.file(meta.logo as string | undefined),
    accent: String(meta.accent),
    highlight: meta.highlight ? String(meta.highlight) : undefined,
    logo: {
      font: String(font.font ?? "'Space Grotesk', sans-serif"),
      weight: font.weight != null ? Number(font.weight) : undefined,
      italic: Boolean(font.italic),
      letterSpacing: font.letterSpacing != null ? String(font.letterSpacing) : undefined,
      uppercase: Boolean(font.uppercase),
    },
    badge: (meta.badge || undefined) as Title['badge'],
    match: Number(meta.match ?? 95),
    seasons: parseBody(match[2], id, images),
  };
}

const byClient = new Map(
  Object.entries(sources).map(([path, source]) => {
    const title = toTitle(path.replace('../', 'src/'), source);
    return [title.client.toLowerCase(), title] as const;
  }),
);

/** The case study written in `case-studies/<client>/case-study.md`. */
export const caseStudy = (client: string): Title => {
  const title = byClient.get(client.toLowerCase());
  if (!title) throw new Error(`No case-study.md found for "${client}" in src/assets/case-studies/.`);
  return title;
};
