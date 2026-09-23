import { useEffect, useRef } from 'react';
import { LINKEDIN_URL, RESUME_DOWNLOAD_NAME, RESUME_PDF_URL } from '../config';
import { RESUME } from '../data/resume';
import { useModal } from '../hooks/useModal';
import Avatar from './Avatar';
import { CloseIcon, DownloadIcon, ExternalIcon } from './Icons';

/**
 * The résumé as a page, presented like a title's detail screen. The Download
 * button hands over the PDF version.
 */
export default function ResumeModal() {
  const close = useModal();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dialogRef.current?.focus({ preventScroll: true });
  }, []);

  const { contact } = RESUME;

  return (
    <div className="modal-overlay" onMouseDown={close}>
      <div
        ref={dialogRef}
        className="modal resume"
        role="dialog"
        aria-modal="true"
        aria-label={`${RESUME.name} — résumé`}
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="modal__close" onClick={close} aria-label="Close">
          <CloseIcon size={20} />
        </button>

        <header className="resume__hero">
          <Avatar size={88} />
          <div className="resume__heading">
            <p className="resume__eyebrow">Résumé</p>
            <h2 className="resume__name">{RESUME.name}</h2>
            <p className="resume__focus">
              <strong>{RESUME.headline}</strong>
              <span>{RESUME.focus.join(' · ')}</span>
            </p>
            <ul className="resume__contact">
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                  {contact.linkedin}
                </a>
              </li>
              <li>
                <a href={`https://${contact.website}`} target="_blank" rel="noopener noreferrer">
                  {contact.website}
                </a>
              </li>
            </ul>
          </div>
          <div className="resume__actions">
            <a className="btn btn--primary btn--square" href={RESUME_PDF_URL} download={RESUME_DOWNLOAD_NAME}>
              <DownloadIcon size={20} /> Download PDF
            </a>
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

        <div className="modal__body resume__body">
          <section className="detail-info">
            <div className="detail-info__main">
              <h3 className="resume__section-title">Summary</h3>
              <p className="detail-info__desc">{RESUME.summary}</p>
              <ul className="outcomes resume__highlights">
                {RESUME.highlights.map((h) => (
                  <li key={h.label}>
                    <strong>{h.value}</strong>
                    <span>{h.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <dl className="detail-info__side">
              <div>
                <dt>Focus:</dt>
                <dd>{RESUME.focus.join(', ')}</dd>
              </div>
              <div>
                <dt>Industries:</dt>
                <dd>Fintech, SaaS, Education, Health Tech</dd>
              </div>
              <div>
                <dt>Education:</dt>
                <dd>
                  {RESUME.education[0].name}, {RESUME.education[0].school}
                </dd>
              </div>
              <div>
                <dt>Languages:</dt>
                <dd>{RESUME.languages.join(', ')}</dd>
              </div>
            </dl>
          </section>

          <section className="resume__section" aria-labelledby="resume-experience">
            <h3 id="resume-experience" className="resume__section-title">
              Experience
            </h3>
            <ol className="resume__roles">
              {RESUME.experience.map((role) => (
                <li key={`${role.company}-${role.dates}`} className="resume__role">
                  <p className="resume__dates">{role.dates}</p>
                  <div className="resume__role-body">
                    <h4>
                      {role.title} <span>· {role.company}</span>
                    </h4>
                    {role.summary && <p className="resume__role-summary">{role.summary}</p>}
                    {role.bullets && (
                      <ul className="resume__bullets">
                        {role.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                    {role.sections?.map((s) => (
                      <div key={s.name} className="resume__subrole">
                        <h5>
                          {s.name} <span>{s.dates}</span>
                        </h5>
                        <ul className="resume__bullets">
                          {s.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="resume__section" aria-labelledby="resume-skills">
            <h3 id="resume-skills" className="resume__section-title">
              Core Skills
            </h3>
            <div className="resume__skills">
              {RESUME.skills.map((group) => (
                <div key={group.name} className="resume__skill-group">
                  <h4>{group.name}</h4>
                  <ul className="chips">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="resume__section" aria-labelledby="resume-independent">
            <h3 id="resume-independent" className="resume__section-title">
              Independent Work
            </h3>
            <div className="resume__cards">
              {RESUME.independent.map((w) => (
                <article key={w.name} className="resume__card">
                  <p className="resume__dates">
                    {w.role} · {w.dates}
                  </p>
                  <h4>{w.name}</h4>
                  <p>{w.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="about-title" aria-labelledby="resume-education">
            <h3 id="resume-education">
              Education & <strong>Certifications</strong>
            </h3>
            <dl>
              {RESUME.education.map((e) => (
                <div key={e.name}>
                  <dt>{e.school}:</dt>
                  <dd>{e.name}</dd>
                </div>
              ))}
              <div>
                <dt>Certifications:</dt>
                <dd>{RESUME.certifications.join(', ')}</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}
