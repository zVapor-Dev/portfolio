import { getLiveSiteUrl } from '@/lib/liveSiteUrl'

export default function ViewSiteLink() {
  const url = getLiveSiteUrl()

  return (
    <div className="view-site-link">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="view-site-link__anchor"
      >
        <span className="view-site-link__icon" aria-hidden="true">↗</span>
        View live site
      </a>
      <style>{`
        .view-site-link {
          margin: 0 var(--gutter-h) 1rem;
        }

        .view-site-link__anchor {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.65rem 0.85rem;
          border: 1px solid var(--theme-elevation-150);
          border-radius: var(--style-radius-s);
          background: var(--theme-elevation-50);
          color: var(--theme-text);
          font-size: 0.875rem;
          font-weight: 500;
          text-decoration: none;
          transition: background 150ms ease, border-color 150ms ease, color 150ms ease;
        }

        .view-site-link__anchor:hover {
          background: var(--theme-elevation-100);
          border-color: var(--theme-elevation-250);
          color: var(--theme-text);
        }

        .view-site-link__icon {
          font-size: 0.9rem;
          line-height: 1;
        }
      `}</style>
    </div>
  )
}
