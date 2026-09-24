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
}

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
  logo: LogoStyle;
  badge?: Badge;
  match: number;
  seasons: Season[];
}
