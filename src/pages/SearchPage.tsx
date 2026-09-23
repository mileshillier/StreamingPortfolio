import { useSearchParams } from 'react-router-dom';
import TitleGrid from '../components/TitleGrid';
import { CATEGORIES, TITLES, searchTitles } from '../data/titles';

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get('q') ?? '';
  const results = searchTitles(q);
  const suggestions = [...new Set(TITLES.flatMap((t) => t.disciplines))].slice(0, 10);

  return (
    <main className="page">
      {q ? (
        <>
          <div className="page-head">
            <h1>
              Results for “{q}”
            </h1>
            <p>{results.length} {results.length === 1 ? 'title' : 'titles'}</p>
          </div>
          {results.length ? (
            <TitleGrid titles={results} />
          ) : (
            <div className="empty">
              <p>Your search for “{q}” did not have any matches. Try a discipline, client, or category.</p>
            </div>
          )}
        </>
      ) : (
        <div className="page-head">
          <h1>Search</h1>
          <p>Try: {[...CATEGORIES.map((c) => c.shortName), ...suggestions].join(' · ')}</p>
        </div>
      )}
    </main>
  );
}
