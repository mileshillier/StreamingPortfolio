export type CategoryId = 'product' | 'brand' | 'leadership' | 'documentary';

export interface Category {
  id: CategoryId;
  name: string;
  shortName: string;
  blurb: string;
}

export interface Chapter {
  number: number;
  title: string;
  /** Reading time in minutes — the portfolio equivalent of runtime. */
  minutes: number;
  synopsis: string;
  imageSeed: string;
  /** Full chapter text. Chapters without it show placeholder copy on the watch page. */
  body?: ChapterBlock[];
  /** Caption for the chapter image. */
  figure?: string;
  quote?: { text: string; cite: string };
}

/** A paragraph, or a list of short items. */
export type ChapterBlock = string | { list: string[]; ordered?: boolean };

export interface Season {
  name: string;
  chapters: Chapter[];
}

export type Badge = 'New Chapter' | 'Recently Added' | 'Award Winner' | 'Top 10' | 'Coming Soon';

export interface LogoStyle {
  font: string;
  weight?: number;
  italic?: boolean;
  letterSpacing?: string;
  uppercase?: boolean;
}

export interface Title {
  id: string;
  title: string;
  /** Small line under the logo, e.g. "A Design Transformation Series". */
  subtitle?: string;
  /** Tagline shown in the detail header, like a trailer caption. */
  tagline: string;
  category: CategoryId;
  client: string;
  role: string;
  year: number;
  format: 'Series' | 'Feature' | 'Limited Series' | 'Short';
  genre: string;
  rating: string;
  advisories: string[];
  description: string;
  team: string[];
  disciplines: string[];
  tools: string[];
  moods: string[];
  outcomes: { value: string; label: string }[];
  imageSeed: string;
  accent: string;
  /** Optional second brand colour for outcome figures, pull quotes, and the reading progress bar. Falls back to `accent`. */
  highlight?: string;
  /** Optional client logo (imported image URL), shown in place of the client name. */
  clientLogo?: string;
  logo: LogoStyle;
  badge?: Badge;
  match: number;
  seasons: Season[];
}
