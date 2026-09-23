import { useEffect } from 'react';
import { Route, Routes, useLocation, type Location } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DetailModal from './components/DetailModal';
import ResumeModal from './components/ResumeModal';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import MyListPage from './pages/MyListPage';
import SearchPage from './pages/SearchPage';
import WatchPage from './pages/WatchPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const location = useLocation();
  // When a title is opened from within the app, the page it was opened from is
  // kept in `state.background` so the detail screen renders as a modal on top.
  const background = (location.state as { background?: Location } | null)?.background;
  const isWatch = location.pathname.startsWith('/watch/');

  useEffect(() => {
    if (!background) window.scrollTo(0, 0);
  }, [location.pathname, background]);

  return (
    <>
      {!isWatch && <Navbar />}
      <Routes location={background ?? location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/title/:id" element={<HomePage />} />
        <Route path="/resume" element={<HomePage />} />
        <Route path="/browse/:category" element={<BrowsePage />} />
        <Route path="/my-list" element={<MyListPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/watch/:id" element={<WatchPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Routes>
        <Route path="/title/:id" element={<DetailModal />} />
        <Route path="/resume" element={<ResumeModal />} />
        <Route path="*" element={null} />
      </Routes>
      {!isWatch && <Footer />}
    </>
  );
}
