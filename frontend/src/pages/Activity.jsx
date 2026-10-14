import React, { useState, useEffect } from 'react';
import './Activity.css';

/* ── Helpers ── */
function getLevel(count) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  if (count <= 7) return 3;
  return 4;
}

function getCurrentStreak(days) {
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if ((days[i]?.count || 0) > 0) streak++;
    else if (i < days.length - 1) break; // allow today to be 0
    else break;
  }
  return streak;
}

function getLongestStreak(days) {
  let max = 0, cur = 0;
  for (const d of days) {
    if ((d?.count || 0) > 0) { cur++; max = Math.max(max, cur); }
    else cur = 0;
  }
  return max;
}

function getMonthLabels(days) {
  if (!days.length) return [];
  const labels = [];
  let lastMonth = -1;
  days.forEach((d, i) => {
    const date = new Date(d.date);
    const m = date.getMonth();
    if (m !== lastMonth) {
      lastMonth = m;
      labels.push({ label: date.toLocaleString('en-US', { month: 'short' }), col: Math.floor(i / 7) });
    }
  });
  return labels;
}

const langColors = {
  Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#3178c6',
  HTML: '#e34c26', CSS: '#563d7c', PHP: '#4F5D95', Shell: '#89e051',
  'Jupyter Notebook': '#DA5B0B', Vue: '#41b883', C: '#555555',
};

const GITHUB_USERNAME = 'dansenga';

export default function Activity() {
  const [contributions, setContributions] = useState([]);
  const [totalContribs, setTotalContribs] = useState(0);
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        setLoading(true);
        const [contribRes, profileRes, reposRes] = await Promise.allSettled([
          fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`),
        ]);

        // Contributions
        if (contribRes.status === 'fulfilled' && contribRes.value.ok) {
          const data = await contribRes.value.json();
          const days = Array.isArray(data.contributions) ? data.contributions : [];
          setContributions(days);
          const totalObj = data.total || {};
          const total = Object.values(totalObj).reduce((s, v) => s + v, 0);
          setTotalContribs(total || days.reduce((s, d) => s + (d.count || 0), 0));
        }

        // Profile
        if (profileRes.status === 'fulfilled' && profileRes.value.ok) {
          setProfile(await profileRes.value.json());
        }

        // Repos
        if (reposRes.status === 'fulfilled' && reposRes.value.ok) {
          const allRepos = await reposRes.value.json();
          // Sort by stars then by recent push
          const sorted = allRepos
            .filter(r => !r.fork)
            .sort((a, b) => (b.stargazers_count - a.stargazers_count) || new Date(b.pushed_at) - new Date(a.pushed_at));
          setRepos(sorted.slice(0, 6));
        }

        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  const currentStreak = getCurrentStreak(contributions);
  const longestStreak = getLongestStreak(contributions);
  const monthLabels = getMonthLabels(contributions);
  const totalWeeks = Math.ceil(contributions.length / 7);

  return (
    <div className="activity-page container">
      {/* ── HEADER ── */}
      <header className="activity-header">
        <h1>Activity</h1>
        <p className="activity-subtitle">
          Open-source contributions, repositories, and certifications.
        </p>
      </header>

      {loading && (
        <div className="activity-state">
          <p>Loading activity data…</p>
        </div>
      )}

      {error && !loading && (
        <div className="activity-state">
          <p>Failed to load activity data.</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* ── GITHUB PROFILE ── */}
          <section className="activity-section">
            <div className="gh-profile-row">
              <div className="gh-profile-info">
                {profile?.avatar_url && (
                  <img
                    src={profile.avatar_url}
                    alt={profile.name || GITHUB_USERNAME}
                    className="gh-avatar"
                    loading="lazy"
                  />
                )}
                <div>
                  <h2 className="gh-name">{profile?.name || GITHUB_USERNAME}</h2>
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gh-username"
                  >
                    @{GITHUB_USERNAME}
                  </a>
                  {profile?.bio && <p className="gh-bio">{profile.bio}</p>}
                </div>
              </div>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="gh-profile-link"
              >
                View Profile
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </section>

          {/* ── STATS ── */}
          <section className="activity-section">
            <div className="stats-row">
              <div className="stat-block">
                <span className="stat-value">{totalContribs}</span>
                <span className="stat-label">Contributions</span>
              </div>
              <div className="stat-block">
                <span className="stat-value">{currentStreak}</span>
                <span className="stat-label">Current Streak</span>
              </div>
              <div className="stat-block">
                <span className="stat-value">{longestStreak}</span>
                <span className="stat-label">Longest Streak</span>
              </div>
              <div className="stat-block">
                <span className="stat-value">{profile?.public_repos || repos.length}</span>
                <span className="stat-label">Repositories</span>
              </div>
              <div className="stat-block">
                <span className="stat-value">{profile?.followers || 0}</span>
                <span className="stat-label">Followers</span>
              </div>
            </div>
          </section>

          {/* ── CONTRIBUTION HEATMAP ── */}
          <section className="activity-section">
            <h2 className="section-heading">Contribution Graph</h2>
            <div className="heatmap-wrapper">
              <div className="heatmap-months-row" style={{ '--total-weeks': totalWeeks }}>
                {monthLabels.map((m, i) => (
                  <span key={i} style={{ gridColumnStart: m.col + 2 }}>{m.label}</span>
                ))}
              </div>
              <div className="heatmap-body">
                <div className="heatmap-day-labels">
                  <span></span><span>Mon</span><span></span><span>Wed</span><span></span><span>Fri</span><span></span>
                </div>
                <div className="heatmap-grid" style={{ '--total-weeks': totalWeeks }}>
                  {contributions.map((day, i) => (
                    <div
                      key={day.date || i}
                      className={`hm-cell level-${day.level ?? getLevel(day.count || 0)}`}
                      title={`${day.date}: ${day.count} contribution${day.count === 1 ? '' : 's'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="heatmap-legend">
                <span>Less</span>
                <div className="heatmap-scale">
                  {[0,1,2,3,4].map(l => <span key={l} className={`hm-cell level-${l}`} />)}
                </div>
                <span>More</span>
              </div>
            </div>
          </section>

          {/* ── REPOSITORIES ── */}
          <section className="activity-section">
            <div className="section-heading-row">
              <h2 className="section-heading">Repositories</h2>
              <a
                href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="section-link"
              >
                View all
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
            <div className="repos-grid">
              {repos.map(repo => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-card"
                >
                  <h3 className="repo-card__name">{repo.name}</h3>
                  <p className="repo-card__desc">{repo.description || 'No description.'}</p>
                  <div className="repo-card__footer">
                    {repo.language && (
                      <span className="repo-card__lang">
                        <span className="lang-dot" style={{ background: langColors[repo.language] || '#8b949e' }} />
                        {repo.language}
                      </span>
                    )}
                    <span className="repo-card__meta">⭐ {repo.stargazers_count}</span>
                    <span className="repo-card__meta">🍴 {repo.forks_count}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* ── CERTIFICATION ── */}
          <section className="activity-section">
            <h2 className="section-heading">Certifications</h2>
            <div className="cert-grid">
              <div className="cert-card">
                <div className="cert-card__image-wrap">
                  <img
                    src="/certifications/pandas-certification.png"
                    alt="Dan Senga — Pandas Course Certification from Kaggle"
                    className="cert-card__image"
                    loading="lazy"
                  />
                </div>
                <div className="cert-card__info">
                  <span className="cert-card__provider">Kaggle Learn</span>
                  <h3 className="cert-card__title">Pandas Course</h3>
                  <p className="cert-card__desc">
                    Data manipulation with Pandas: DataFrames, indexing, grouping, merging, and data cleaning.
                  </p>
                  <div className="cert-card__tags">
                    <span>Pandas</span>
                    <span>Data Science</span>
                    <span>Completed</span>
                  </div>
                </div>
              </div>
              <div className="cert-card">
                <div className="cert-card__image-wrap">
                  <img
                    src="/certifications/Dan Senga - Python.png"
                    alt="Dan Senga — Python Certification"
                    className="cert-card__image"
                    loading="lazy"
                  />
                </div>
                <div className="cert-card__info">
                  <span className="cert-card__provider">Kaggle Learn</span>
                  <h3 className="cert-card__title">Python Course</h3>
                  <p className="cert-card__desc">
                    Python programming fundamentals: syntax, data types, functions, and control flow.
                  </p>
                  <div className="cert-card__tags">
                    <span>Python</span>
                    <span>Programming</span>
                    <span>Completed</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
