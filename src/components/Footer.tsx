import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { CONTACT_EMAIL, DRIBBBLE_URL, GET_IN_TOUCH_URL, LINKEDIN_URL, MEDIUM_URL } from '../config';
import { CATEGORIES } from '../data/titles';
import { useOpenModal } from '../hooks/useOpenTitle';

export default function Footer() {
  const openModal = useOpenModal();

  return (
    <footer className="footer" id="about">
      <div className="footer__intro">
        <p className="footer__brand">
          <img className="footer__logo" src={logo} alt="" aria-hidden />
          MILES<span>HILLIER</span>
        </p>
        <p>
          Product designer, art director, and design leader. I build products people love to use and teams people love to
          be on. This portfolio is presented as a streaming service — every case study is a title, and every phase of the
          work is a chapter.
        </p>
        <a className="btn btn--primary btn--sm" href={GET_IN_TOUCH_URL} target="_blank" rel="noopener noreferrer">
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
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={DRIBBBLE_URL} target="_blank" rel="noopener noreferrer">
            Dribbble
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>Read.cv</a>
          <a href={`mailto:${CONTACT_EMAIL}`}>Email</a>
        </div>
        <div>
          <h4>Help Center</h4>
          <button className="footer__link" onClick={() => openModal('/resume')}>
            Résumé
          </button>
          <a href={MEDIUM_URL} target="_blank" rel="noopener noreferrer">
            Articles and Posts
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>Press Kit</a>
        </div>
      </nav>
      <p className="footer__legal">© {new Date().getFullYear()} Miles Hillier. Placeholder content and imagery for demonstration.</p>
    </footer>
  );
}
