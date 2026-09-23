import { Link } from 'react-router-dom';
import TitleGrid from '../components/TitleGrid';
import { getTitle } from '../data/titles';
import type { Title } from '../data/types';
import { useMyList } from '../context/MyListContext';

export default function MyListPage() {
  const { saved } = useMyList();
  const titles = saved.map((id) => getTitle(id)).filter((t): t is Title => Boolean(t));

  return (
    <main className="page">
      <div className="page-head">
        <h1>My List</h1>
        <p>Case studies you’ve saved to come back to.</p>
      </div>
      {titles.length ? (
        <TitleGrid titles={titles} />
      ) : (
        <div className="empty">
          <p>You haven’t added any titles yet. Use the <strong>+</strong> button on any title to save it here.</p>
          <Link to="/" className="btn btn--primary btn--sm">Browse Titles</Link>
        </div>
      )}
    </main>
  );
}
