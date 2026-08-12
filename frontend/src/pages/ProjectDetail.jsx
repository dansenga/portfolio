import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: project, loading, error } = useFetch(() => api.getProject(slug), [slug]);

  if (loading) return <div className="detail-loading"><div className="spinner"></div></div>;
  if (error || !project) return <div className="detail-error">Project not found.</div>;

  // Navigate back with View Transition
  const handleBack = (e) => {
    e.preventDefault();
    if (!document.startViewTransition) {
      navigate('/work');
      return;
    }
    document.startViewTransition(() => navigate('/work'));
  };

  // Helper to render section only if content exists
  const Section = ({ title, children }) => {
    if (!children) return null;
    return (
      <section className="detail-section scroll-reveal">
        <h2>{title}</h2>
        <div className="detail-prose">{children}</div>
      </section>
    );
  };

  return (
    <article className="project-detail">
      <div className="container detail-container">
        {/* Back link */}
        <a href="/work" className="back-link" onClick={handleBack}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Projects
        </a>

        {/* Header with view-transition-name */}
        <header className="detail-header scroll-reveal">
          <div className="detail-meta">
            <span className="detail-category">{project.category}</span>
            <span className="detail-year">{project.year}</span>
            {project.status && <span className="detail-status">{project.status}</span>}
          </div>
          <h1 className="detail-title">{project.title}</h1>
          {project.short_description && (
            <p className="detail-subtitle">{project.short_description}</p>
          )}
        </header>

        {/* Content Sections */}
        <Section title="Overview">
          <p>{project.full_description}</p>
        </Section>

        <Section title="Problem">
          <p>{project.problem}</p>
        </Section>

        <Section title="Idea & Solution">
          <p>{project.idea}</p>
          <p>{project.solution}</p>
        </Section>

        <Section title="Architecture">
          <p>{project.architecture}</p>
        </Section>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <section className="detail-section scroll-reveal">
            <h2>Technology Stack</h2>
            <div className="tech-grid">
              {project.technologies.map(tech => (
                <span className="tech-chip" key={tech}>{tech}</span>
              ))}
            </div>
          </section>
        )}

        <Section title="Challenges & Decisions">
          <p>{project.challenges}</p>
          <p>{project.decisions}</p>
        </Section>

        <Section title="Results & Lessons">
          <p>{project.results}</p>
          <p>{project.lessons}</p>
        </Section>

        {/* Links */}
        {(project.github_url || project.live_url || project.docs_url) && (
          <section className="detail-links scroll-reveal">
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="detail-link-btn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                GitHub Repository
              </a>
            )}
            {project.live_url && (
              <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="detail-link-btn detail-link-btn--primary">
                Live Demo ↗
              </a>
            )}
            {project.docs_url && (
              <a href={project.docs_url} target="_blank" rel="noopener noreferrer" className="detail-link-btn">
                Documentation
              </a>
            )}
          </section>
        )}
      </div>
    </article>
  );
}
