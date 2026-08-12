import React from 'react';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import './Activity.css';

const KaggleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-2.434 2.341v4.209c0 .217-.145.346-.436.346H4.272c-.29 0-.436-.129-.436-.346V.346C3.836.129 3.982 0 4.272 0h2.593c.29 0 .436.129.436.346v13.684l7.15-7.399c.14-.141.296-.211.468-.211h3.35c.164 0 .258.05.281.152.023.117-.023.223-.14.316l-6.845 6.755 7.126 9.805c.117.164.14.281.07.411z" />
  </svg>
);

function getLink(links, platform, fallback) {
  const found = links?.find(link => link.platform?.toLowerCase() === platform.toLowerCase());
  return found?.url || fallback;
}

export default function Activity() {
  const { data: links } = useFetch(api.getLinks, []);
  const githubUrl = getLink(links, 'github', 'https://github.com/dansenga');
  const kaggleUrl = getLink(links, 'kaggle', 'https://www.kaggle.com/dansenga');
  const kaggleBadgeUrl = 'https://www.kaggle.com/learn/certification/dansenga/pandas';

  return (
    <div className="activity-page">
      <div className="container">
        <header className="activity-header scroll-reveal">
          <span className="section-label">ACTIVITY</span>
          <h1 className="title">GitHub and Kaggle</h1>
          <p className="subtitle">GitHub contribution grid and Kaggle badges only.</p>
        </header>

        <section className="activity-section scroll-reveal">
          <div className="activity-grid-2col">
            <article className="activity-card github-card">
              <div className="card-top">
                <div className="brand-badge">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  <div>
                    <h2>GitHub Contributions</h2>
                    <span className="username">@dansenga</span>
                  </div>
                </div>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="external-btn">
                  Open GitHub <span aria-hidden="true">↗</span>
                </a>
              </div>

              <div className="github-grid-frame">
                <img
                  src="https://github.com/users/dansenga/contributions"
                  alt="GitHub contribution grid for dansenga"
                  className="github-contribution-image"
                />
              </div>
            </article>

            <article className="activity-card kaggle-card">
              <div className="card-top">
                <div className="brand-badge">
                  <KaggleIcon />
                  <div>
                    <h2>Kaggle Badges</h2>
                    <span className="username">@dansenga</span>
                  </div>
                </div>
                <a href={kaggleUrl} target="_blank" rel="noopener noreferrer" className="external-btn">
                  Open Kaggle <span aria-hidden="true">↗</span>
                </a>
              </div>

              <div className="kaggle-badges">
                <a
                  href={kaggleBadgeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge badge--blue"
                >
                  Pandas Course
                </a>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}
