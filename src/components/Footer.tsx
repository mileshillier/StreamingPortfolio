import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/titles';

export default function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="footer__intro">
        <p className="footer__brand">
          MILES<span>HILLIER</span>
        </p>
        <p>
          Product designer, art director, and design leader. I build products people love to use and teams people love to
          be on. This portfolio is presented as a streaming service — every case study is a title, and every phase of the
          work is a chapter.
        </p>
        <a className="btn btn--primary btn--sm" href="mailto:hello@example.com">
          Get in Touch
        </a>
      </div>
      <nav className="footer__cols" aria-label="Footer">
        <div>
          <h4>Browse</h4>
          {CATEGORIES.map((c) => (
            <Link key={c.id} to={`/browse/${c.id}`}>
              {c.name}
            </Link>
          ))}
          <Link to="/my-list">My List</Link>
        </div>
        <div>
          <h4>Connect</h4>
          <a href="#" onClick={(e) => e.preventDefault()}>LinkedIn</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Dribbble</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Read.cv</a>
          <a href="mailto:hello@example.com">Email</a>
        </div>
        <div>
          <h4>Help Center</h4>
          <a href="#" onClick={(e) => e.preventDefault()}>Résumé (PDF)</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Speaking & Workshops</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Press Kit</a>
        </div>
      </nav>
      <p className="footer__legal">© {new Date().getFullYear()} Miles Hillier. Placeholder content and imagery for demonstration.</p>
    </footer>
  );
}
