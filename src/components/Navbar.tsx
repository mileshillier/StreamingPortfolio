import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '../data/titles';
import { GET_IN_TOUCH_URL, LINKEDIN_URL } from '../config';
import { useOpenModal } from '../hooks/useOpenTitle';
import Avatar from './Avatar';
import { BellIcon, ChevronIcon, SearchIcon } from './Icons';

const NAV = [
  { to: '/', label: 'Home', end: true },
  ...CATEGORIES.map((c) => ({ to: `/browse/${c.id}`, label: c.shortName, end: false })),
  { to: '/my-list', label: 'My List', end: false },
];

const NOTIFICATIONS = [
  { title: 'New Chapter', body: 'Northstar — “Epilogue: What We Learned” is now streaming.' },
  { title: 'Coming Soon', body: 'The Merger premieres this fall.' },
  { title: 'Recently Added', body: 'Atlas: Building a Design System.' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<'browse' | 'bell' | 'profile' | null>(null);
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const onSearch = location.pathname === '/search';
  const [query, setQuery] = useState(onSearch ? params.get('q') ?? '' : '');
  const [searchOpen, setSearchOpen] = useState(onSearch);
  const inputRef = useRef<HTMLInputElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const openModal = useOpenModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenu(null);
    if (location.pathname !== '/search') {
      setSearchOpen(false);
      setQuery('');
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!menu) return;
    const close = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [menu]);

  const updateQuery = (value: string) => {
    setQuery(value);
    navigate(value ? `/search?q=${encodeURIComponent(value)}` : '/search', { replace: onSearch });
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    updateQuery(query);
  };

  const toggle = (m: NonNullable<typeof menu>) => setMenu((cur) => (cur === m ? null : m));

  return (
    <header ref={navRef} className={`navbar ${scrolled ? 'navbar--solid' : ''}`}>
      <Link to="/" className="navbar__brand" aria-label="Miles Hillier — home">
        MILES<span>HILLIER</span>
      </Link>

      <nav className="navbar__links" aria-label="Primary">
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}>
            {n.label}
          </NavLink>
        ))}
      </nav>

      <div className="navbar__browse">
        <button className="navbar__browse-btn" onClick={() => toggle('browse')} aria-expanded={menu === 'browse'}>
          Browse <ChevronIcon size={14} />
        </button>
        {menu === 'browse' && (
          <div className="dropdown dropdown--left" role="menu">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end} className="dropdown__item" role="menuitem">
                {n.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>

      <div className="navbar__actions">
        <form className={`search ${searchOpen ? 'search--open' : ''}`} onSubmit={submit} role="search">
          <button
            type="button"
            className="icon-btn"
            aria-label="Search"
            onClick={() => {
              setSearchOpen(true);
              requestAnimationFrame(() => inputRef.current?.focus());
            }}
          >
            <SearchIcon />
          </button>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => updateQuery(e.target.value)}
            onBlur={() => !query && setSearchOpen(false)}
            placeholder="Titles, disciplines, clients"
            aria-label="Search titles"
            tabIndex={searchOpen ? 0 : -1}
          />
        </form>

        <div className="navbar__menu">
          <button className="icon-btn" aria-label="Notifications" onClick={() => toggle('bell')} aria-expanded={menu === 'bell'}>
            <BellIcon />
            <span className="navbar__badge">{NOTIFICATIONS.length}</span>
          </button>
          {menu === 'bell' && (
            <div className="dropdown dropdown--wide" role="menu">
              {NOTIFICATIONS.map((n) => (
                <div key={n.body} className="dropdown__note">
                  <strong>{n.title}</strong>
                  <span>{n.body}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="navbar__menu">
          <button className="navbar__profile" aria-label="Profile menu" onClick={() => toggle('profile')} aria-expanded={menu === 'profile'}>
            <Avatar />
            <ChevronIcon size={14} />
          </button>
          {menu === 'profile' && (
            <div className="dropdown" role="menu">
              <div className="dropdown__header">
                <Avatar />
                <div>
                  <strong>Miles Hillier</strong>
                  <span>Product Designer & Design Leader</span>
                </div>
              </div>
              <a className="dropdown__item" href="#about">About Me</a>
              <button className="dropdown__item" role="menuitem" onClick={() => openModal('/resume')}>
                Résumé
              </button>
              <a className="dropdown__item" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a className="dropdown__item" href={GET_IN_TOUCH_URL} target="_blank" rel="noopener noreferrer">
                Get in Touch
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
