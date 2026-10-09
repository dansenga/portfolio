import React, { useState } from 'react';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import './Activity.css';

const KaggleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-2.434 2.341v4.209c0 .217-.145.346-.436.346H4.272c-.29 0-.436-.129-.436-.346V.346C3.836.129 3.982 0 4.272 0h2.593c.29 0 .436.129.436.346v13.684l7.15-7.399c.14-.141.296-.211.468-.211h3.35c.164 0 .258.05.281.152.023.117-.023.223-.14.316l-6.845 6.755 7.126 9.805c.117.164.14.281.07.411z" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
    <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
  </svg>
);

const CertificateIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
    <path d="M12 15l-2 5 2-1.5 2 1.5-2-5z" />
    <circle cx="12" cy="10" r="6" />
    <path d="M9 10l2 2 4-4" />
  </svg>
);

function formatDate(dateValue) {
  if (!dateValue) return 'No date';
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function getLevel(count) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  if (count <= 7) return 3;
  return 4;
}

function getCurrentStreak(days) {
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i -= 1) {
    if ((days[i]?.count || 0) > 0) {
      streak += 1;
    } else {
      break;
    }
  }
  return streak;
}

function getLongestStreak(days) {
  let max = 0;
  let current = 0;
  for (const day of days) {
    if ((day?.count || 0) > 0) {
      current += 1;
      max = Math.max(max, current);
    } else {
      current = 0;
    }
  }
  return max;
}

function getMonthLabels(days) {
  const months = [];
  const seen = new Set();
  days.forEach((day) => {
    if (!day?.date) return;
    const date = new Date(day.date);
    if (Number.isNaN(date.getTime())) return;
    const label = date.toLocaleString('en-US', { month: 'short' });
    if (!seen.has(label)) {
      seen.add(label);
      months.push(label);
    }
  });
  if (months.length === 0) return ['Jan', 'Mar', 'Jun', 'Sep', 'Dec'];
  const indexes = [0, Math.floor((months.length - 1) / 3), Math.floor(((months.length - 1) * 2) / 3), months.length - 1]
    .map((index) => Math.min(index, months.length - 1));
  return Array.from(new Set(indexes.map((index) => months[index])));
}

function getLink(links, platform, fallback) {
  const found = links?.find(link => link.platform?.toLowerCase() === platform.toLowerCase());
  return found?.url || fallback;
}

/* ── Language color dot ── */
const langColors = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Jupyter: '#DA5B0B',
  'Jupyter Notebook': '#DA5B0B',
  PHP: '#4F5D95',
  Shell: '#89e051',
  Code: '#8b949e',
};

export default function Activity() {
  const { data: links } = useFetch(api.getLinks, []);
  const { data: activity, loading, error } = useFetch(api.getActivity, []);
  const [certExpanded, setCertExpanded] = useState(false);

  const githubUsername = 'dansenga';
  const kaggleUsername = 'dansenga';
  const githubUrl = getLink(links, 'github', `https://github.com/${githubUsername}`);
  const kaggleUrl = getLink(links, 'kaggle', `https://www.kaggle.com/${kaggleUsername}`);

  const githubData = activity?.github || {};
  const kaggleData = activity?.kaggle || {};

  const contributionDays = Array.isArray(githubData.contribution_days) ? githubData.contribution_days : [];
  const totalContrib = Number.isFinite(Number(githubData.contributions_last_year))
    ? Number(githubData.contributions_last_year)
    : contributionDays.reduce((sum, day) => sum + (Number(day.count) || 0), 0);
  const currentStreak = getCurrentStreak(contributionDays);
  const longestStreak = getLongestStreak(contributionDays);
  const monthLabels = getMonthLabels(contributionDays);

  const topRepos = Array.isArray(githubData.top_repositories) ? githubData.top_repositories : [];
  const recentActivity = Array.isArray(githubData.recent_activity) ? githubData.recent_activity : [];

  const kaggleBadges = Array.isArray(kaggleData.badges) && kaggleData.badges.length > 0
    ? kaggleData.badges
    : [{ title: 'Pandas Course', subtitle: 'Kaggle Learn certification', url: kaggleUrl }];

  const kagglePinnedWork = Array.isArray(kaggleData.pinned_work) && kaggleData.pinned_work.length > 0
    ? kaggleData.pinned_work
    : [{ title: 'Pandas Course', status: 'Completed', type: 'Certification', url: kaggleUrl }];

  return (
    <div className="activity-page">
      <div className="container">
        {/* ── HEADER ── */}
        <header className="activity-header scroll-reveal">
          <span className="section-label">ACTIVITY</span>
          <h1 className="title">GitHub, Kaggle & Research</h1>
          <p className="subtitle">
            Contribution cadence, model work, and structured knowledge output across code, research, and publishing.
          </p>
        </header>

        {loading && (
          <div className="activity-loading">
            <div className="activity-loading__dots">
              <span /><span /><span />
            </div>
            <p>Loading activity data…</p>
          </div>
        )}

        {error && (
          <div className="activity-error">
            <p>Failed to load activity data. Please try again later.</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* ── GITHUB SECTION ── */}
            <section className="activity-section scroll-reveal">
              <article className="activity-card github-card">
                <div className="card-top">
                  <div className="brand-badge">
                    <div className="brand-badge__icon brand-badge__icon--github">
                      <GithubIcon />
                    </div>
                    <div>
                      <h2>GitHub Contributions</h2>
                      <span className="username">@{githubData.username || githubUsername}</span>
                    </div>
                  </div>
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="external-btn">
                    Open GitHub <span aria-hidden="true">↗</span>
                  </a>
                </div>

                {/* Stats bar */}
                <div className="github-stats-bar">
                  <div className="stat-item">
                    <span className="stat-num">{totalContrib}</span>
                    <span className="stat-desc">Contributions</span>
                  </div>
                  <div className="stat-divider" />
                  <div className="stat-item">
                    <span className="stat-num">{currentStreak}</span>
                    <span className="stat-desc">Current Streak</span>
                  </div>
                  <div className="stat-divider" />
                  <div className="stat-item">
                    <span className="stat-num">{longestStreak}</span>
                    <span className="stat-desc">Longest Streak</span>
                  </div>
                  <div className="stat-divider" />
                  <div className="stat-item">
                    <span className="stat-num">{githubData.public_repos || topRepos.length}</span>
                    <span className="stat-desc">Repositories</span>
                  </div>
                </div>

                {/* Heatmap */}
                <div className="heatmap-container">
                  <div className="heatmap-months">
                    {monthLabels.map((month) => (
                      <span key={month}>{month}</span>
                    ))}
                  </div>
                  <div className="heatmap-grid-wrapper">
                    <div className="heatmap-days">
                      <span>Mon</span>
                      <span>Wed</span>
                      <span>Fri</span>
                    </div>
                    <div className="heatmap-grid" aria-label="GitHub contributions heatmap">
                      {contributionDays.map((day, index) => {
                        const level = getLevel(Number(day.count) || 0);
                        return (
                          <div
                            key={`${day.date || index}-${index}`}
                            className={`heatmap-cell level-${level}`}
                            title={`${formatDate(day.date)}: ${day.count || 0} contribution${(day.count || 0) === 1 ? '' : 's'}`}
                            aria-label={`${formatDate(day.date)}: ${day.count || 0} contribution${(day.count || 0) === 1 ? '' : 's'}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Scale */}
                <div className="heatmap-footer">
                  <span>Less</span>
                  <div className="heatmap-scale">
                    <span className="heatmap-scale__cell level-0" />
                    <span className="heatmap-scale__cell level-1" />
                    <span className="heatmap-scale__cell level-2" />
                    <span className="heatmap-scale__cell level-3" />
                    <span className="heatmap-scale__cell level-4" />
                  </div>
                  <span>More</span>
                </div>
              </article>
            </section>

            {/* ── TOP REPOS + RECENT ACTIVITY ── */}
            <section className="activity-section scroll-reveal">
              <div className="activity-grid-2col">
                {/* Top Repositories */}
                <div className="activity-card">
                  <div className="card-top card-top--compact">
                    <h2 className="card-section-title">Top Repositories</h2>
                    <span className="card-count">{topRepos.length} repos</span>
                  </div>
                  <div className="repo-list">
                    {topRepos.length > 0 ? topRepos.map((repo) => (
                      <a
                        key={repo.name}
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="repo-item"
                      >
                        <div className="repo-item__top">
                          <h3 className="repo-item__name">{repo.name}</h3>
                          <div className="repo-item__stars">
                            <StarIcon />
                            <span>{repo.stars || 0}</span>
                          </div>
                        </div>
                        <p className="repo-item__desc">{repo.description || 'No description provided.'}</p>
                        <div className="repo-item__lang">
                          <span
                            className="lang-dot"
                            style={{ background: langColors[repo.language] || langColors.Code }}
                          />
                          <span>{repo.language || 'Code'}</span>
                        </div>
                      </a>
                    )) : (
                      <p className="empty-state">No repositories to display.</p>
                    )}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="activity-card">
                  <div className="card-top card-top--compact">
                    <h2 className="card-section-title">Recent Activity</h2>
                    <span className="card-count">Latest</span>
                  </div>
                  <div className="activity-feed">
                    {recentActivity.length > 0 ? recentActivity.map((event, i) => (
                      <a
                        key={`${event.title}-${i}`}
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="feed-item feed-item--link"
                      >
                        <div className="feed-dot" />
                        <div className="feed-content">
                          <span className="feed-date">{formatDate(event.date)}</span>
                          <h4>{event.title}</h4>
                          <p>{event.description}</p>
                        </div>
                      </a>
                    )) : (
                      <p className="empty-state">No recent activity to display.</p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* ── KAGGLE + CERTIFICATION ── */}
            <section className="activity-section scroll-reveal">
              <div className="activity-grid-2col">
                {/* Kaggle Card */}
                <article className="activity-card kaggle-card">
                  <div className="card-top">
                    <div className="brand-badge">
                      <div className="brand-badge__icon brand-badge__icon--kaggle">
                        <KaggleIcon />
                      </div>
                      <div>
                        <h2>Kaggle Hub</h2>
                        <span className="username">@{kaggleData.username || kaggleUsername}</span>
                      </div>
                    </div>
                    <a href={kaggleUrl} target="_blank" rel="noopener noreferrer" className="external-btn">
                      Open Kaggle <span aria-hidden="true">↗</span>
                    </a>
                  </div>

                  {/* Badges */}
                  <div className="kaggle-badges">
                    {kaggleBadges.map((badge) => (
                      <a
                        key={badge.title || badge.name}
                        href={badge.url || kaggleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="badge badge--teal"
                      >
                        {badge.title || badge.name}
                      </a>
                    ))}
                    <a href={kaggleUrl} className="badge badge--blue" target="_blank" rel="noopener noreferrer">
                      Profile
                    </a>
                    <a href={kaggleUrl} className="badge badge--violet" target="_blank" rel="noopener noreferrer">
                      AI & Healthcare
                    </a>
                  </div>

                  {/* Pinned Work */}
                  <div className="kaggle-panels">
                    <div className="kaggle-panel">
                      <p className="kaggle-panel__eyebrow">Pinned Work</p>
                      {kagglePinnedWork.map((item) => (
                        <div key={item.title} className="kaggle-item">
                          <div className="kaggle-item__meta">{item.type || item.status}</div>
                          <h3>{item.title}</h3>
                          <p>{item.status || 'Published contribution'}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>

                {/* Pandas Certification */}
                <article className="activity-card cert-card">
                  <div className="card-top">
                    <div className="brand-badge">
                      <div className="brand-badge__icon brand-badge__icon--cert">
                        <CertificateIcon />
                      </div>
                      <div>
                        <h2>Certification</h2>
                        <span className="username">Kaggle Learn</span>
                      </div>
                    </div>
                  </div>

                  <div className="cert-showcase">
                    <div
                      className={`cert-image-wrapper ${certExpanded ? 'cert-image-wrapper--expanded' : ''}`}
                      onClick={() => setCertExpanded(!certExpanded)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setCertExpanded(!certExpanded); }}
                      aria-label={certExpanded ? 'Collapse certification image' : 'Expand certification image'}
                    >
                      <img
                        src="/certifications/pandas-certification.png"
                        alt="Dan Senga — Pandas Course Certification from Kaggle"
                        className="cert-image"
                        loading="lazy"
                      />
                      <div className="cert-image-overlay">
                        <span>{certExpanded ? 'Click to collapse' : 'Click to expand'}</span>
                      </div>
                    </div>

                    <div className="cert-details">
                      <h3 className="cert-details__title">Pandas Course</h3>
                      <p className="cert-details__provider">Kaggle Learn — Data Science</p>
                      <p className="cert-details__desc">
                        Mastery of data manipulation with Pandas: DataFrames, indexing, grouping, merging, and data cleaning.
                      </p>
                      <div className="cert-details__tags">
                        <span className="badge badge--teal">Pandas</span>
                        <span className="badge badge--blue">Data Science</span>
                        <span className="badge badge--violet">Completed</span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
