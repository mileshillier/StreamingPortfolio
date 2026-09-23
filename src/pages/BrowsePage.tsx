import { useParams } from 'react-router-dom';
import Hero from '../components/Hero';
import Row from '../components/Row';
import TitleGrid from '../components/TitleGrid';
import { CATEGORIES, titlesInCategory } from '../data/titles';
import type { CategoryId } from '../data/types';
import NotFoundPage from './NotFoundPage';

export default function BrowsePage() {
  const { category } = useParams();
  const cat = CATEGORIES.find((c) => c.id === (category as CategoryId));
  if (!cat) return <NotFoundPage />;

  const titles = titlesInCategory(cat.id);
  const featured = [...titles].sort((a, b) => b.match - a.match)[0];
  const others = CATEGORIES.filter((c) => c.id !== cat.id);

  return (
    <main className="browse">
      <div className="page-head">
        <h1>{cat.name}</h1>
        <p>{cat.blurb}</p>
      </div>
      {featured && <Hero title={featured} />}
      <section className="page-section">
        <h2 className="row__heading">All {cat.shortName} Titles</h2>
        <TitleGrid titles={titles} />
      </section>
      {others.map((c) => (
        <Row key={c.id} heading={`Also Streaming: ${c.name}`} titles={titlesInCategory(c.id)} seeAllHref={`/browse/${c.id}`} />
      ))}
    </main>
  );
}
