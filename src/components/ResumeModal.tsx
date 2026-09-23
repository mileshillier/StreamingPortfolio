import { useEffect, useRef, useState } from 'react';
import { LINKEDIN_URL, RESUME_DOWNLOAD_NAME, RESUME_PDF_URL } from '../config';
import { useModal } from '../hooks/useModal';
import Avatar from './Avatar';
import { CloseIcon, DownloadIcon, ExternalIcon } from './Icons';

type Status = 'checking' | 'ready' | 'missing';

/** The résumé, presented like a title's detail screen, with a download button. */
export default function ResumeModal() {
  const close = useModal();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>('checking');

  useEffect(() => {
    dialogRef.current?.focus({ preventScroll: true });
  }, []);

  // Static hosts and the dev server can answer a missing file with the app's
  // HTML, so only a real PDF response counts as "ready".
  useEffect(() => {
    let active = true;
    fetch(RESUME_PDF_URL, { method: 'HEAD' })
      .then((res) => {
        const isPdf = res.ok && (res.headers.get('content-type') ?? '').includes('pdf');
        if (active) setStatus(isPdf ? 'ready' : 'missing');
      })
      .catch(() => active && setStatus('missing'));
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="modal-overlay" onMouseDown={close}>
      <div
        ref={dialogRef}
        className="modal resume"
        role="dialog"
        aria-modal="true"
        aria-label="Résumé"
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="modal__close" onClick={close} aria-label="Close">
          <CloseIcon size={20} />
        </button>

        <header className="resume__hero">
          <Avatar size={72} />
          <div className="resume__heading">
            <p className="resume__eyebrow">Résumé</p>
            <h2 className="resume__name">Miles Hillier</h2>
            <p className="resume__role">Product Designer · Art Director · Design Leader</p>
          </div>
          <div className="resume__actions">
            {status === 'ready' ? (
              <a className="btn btn--primary btn--square" href={RESUME_PDF_URL} download={RESUME_DOWNLOAD_NAME}>
                <DownloadIcon size={20} /> Download
              </a>
            ) : (
              <button className="btn btn--primary btn--square" disabled>
                <DownloadIcon size={20} /> Download
              </button>
            )}
            <a
              className="round-btn"
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open LinkedIn profile in a new window"
              title="LinkedIn"
            >
              <ExternalIcon size={18} />
            </a>
          </div>
        </header>

        <div className="resume__body">
          {status === 'ready' && (
            <iframe className="resume__viewer" src={`${RESUME_PDF_URL}#view=FitH`} title="Miles Hillier résumé (PDF)" />
          )}
          {status === 'checking' && <p className="resume__note">Loading résumé…</p>}
          {status === 'missing' && (
            <p className="resume__note">
              The résumé is being updated. In the meantime, see my experience on{' '}
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
