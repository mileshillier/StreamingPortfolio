/**
 * Images dropped into `src/assets/case-studies/<Client>/` — see the README there.
 * Folder names match the title's `client`, ignoring case.
 */
const files = import.meta.glob<string>('../assets/case-studies/*/*.{jpg,jpeg,png,webp,svg}', {
  eager: true,
  import: 'default',
});

const byClient = new Map<string, Record<string, string>>();
for (const [path, url] of Object.entries(files)) {
  const [, folder, file] = path.match(/case-studies\/([^/]+)\/([^/]+)\.\w+$/) ?? [];
  if (!folder) continue;
  const key = folder.toLowerCase();
  byClient.set(key, { ...byClient.get(key), [file.toLowerCase()]: url });
}

export interface CaseStudyImages {
  cover?: string;
  logo?: string;
  /** Chapter images by overall chapter number (1-based). */
  chapter: (n: number) => string | undefined;
}

export const caseStudyImages = (client: string): CaseStudyImages => {
  const set = byClient.get(client.toLowerCase()) ?? {};
  return { cover: set.cover, logo: set.logo, chapter: (n) => set[`ch${n}`] };
};
