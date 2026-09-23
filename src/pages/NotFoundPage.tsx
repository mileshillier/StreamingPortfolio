import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="page not-found">
      <h1>Lost your way?</h1>
      <p>Sorry, we can’t find that page. You’ll find lots to explore on the home page.</p>
      <Link to="/" className="btn btn--primary">Portfolio Home</Link>
      <p className="not-found__code">Error Code <strong>NSES-404</strong></p>
    </main>
  );
}
