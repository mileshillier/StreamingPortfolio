import Hero from '../components/Hero';
import Row from '../components/Row';
import { CATEGORIES, FEATURED_ID, TITLES, TOP_10_IDS, getTitle, titlesInCategory } from '../data/titles';
import type { Title } from '../data/types';
import { useMyList } from '../context/MyListContext';

const byIds = (ids: string[]): Title[] => ids.map((id) => getTitle(id)).filter((t): t is Title => Boolean(t));

const LATEST_WORK = ['atlas', 'ember-and-oak', 'the-hiring-season', 'common-ground', 'signal-noise'];

export default function HomePage() {
  const featured = getTitle(FEATURED_ID) ?? TITLES[0];
  const { saved } = useMyList();

  return (
    <main className="home">
      <Hero title={featured} />
      <div className="home__rows">
        <Row heading="Latest Work" titles={byIds(LATEST_WORK)} />
        {saved.length > 0 && <Row heading="My List" titles={byIds(saved)} seeAllHref="/my-list" />}
        {CATEGORIES.map((c) => (
          <Row key={c.id} id={`row-${c.id}`} heading={c.name} titles={titlesInCategory(c.id)} seeAllHref={`/browse/${c.id}`} />
        ))}
        <Row heading="Top 10 Case Studies Today" titles={byIds(TOP_10_IDS)} ranked />
        <Row heading="Award-Winning Work" titles={TITLES.filter((t) => t.badge === 'Award Winner' || t.match >= 96)} />
        <Row heading="New Releases" titles={[...TITLES].sort((a, b) => b.year - a.year).slice(0, 8)} />
      </div>
    </main>
  );
}
