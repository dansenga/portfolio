import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import './Work.css';

export default function Work() {
  const { data: projects, loading, error } = useFetch(() => api.getProjects(), []);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', 'Software', 'AI', 'Healthcare', 'Research'];

  const filteredProjects = projects?.filter(p => filter === 'All' || p.category === filter);

  // Navigate with View Transition when clicking a project
  const handleProjectClick = useCallback((e, slug, index) => {
    e.preventDefault();

    if (!document.startViewTransition) {
      navigate(`/work/${slug}`);
      return;
    }

    // Set view-transition-name dynamically on the clicked card title
    const card = e.currentTarget;
    const titleEl = card.querySelector('.project-title');
    const categoryEl = card.querySelector('.project-category');
    
    if (titleEl) titleEl.style.viewTransitionName = 'project-title';
    if (categoryEl) categoryEl.style.viewTransitionName = 'project-category';

    const transition = document.startViewTransition(() => {
      navigate(`/work/${slug}`);
    });

    transition.finished.finally(() => {
      if (titleEl) titleEl.style.viewTransitionName = '';
      if (categoryEl) categoryEl.style.viewTransitionName = '';
    });
  }, [navigate]);

  return (
    <div className="work-page">
      <div className="container">
        <header className="work-header scroll-reveal">
          <span className="section-label">PROJECTS & SOFTWARE</span>
          <h1 className="title">Work</h1>
          <p className="work-subtitle">
            Software, artificial intelligence, and healthcare projects — built with purpose.
          </p>
          <div className="filters">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <section className="projects-list">
          {loading && <p className="loading-text">Loading projects...</p>}
          {error && <p className="error-text">Failed to load projects.</p>}
          {filteredProjects && filteredProjects.map((project, index) => (
            <a
              href={`/work/${project.slug}`}
              key={project.id}
              className="project-card scroll-reveal"
              onClick={(e) => handleProjectClick(e, project.slug, index)}
            >
              <span className="project-number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="project-body">
                <div className="project-top-meta">
                  <span className="project-category">{project.category}</span>
                  <span className="project-year">{project.year}</span>
                  {project.status && (
                    <span className="project-status">{project.status}</span>
                  )}
                </div>
                <h2 className="project-title">{project.title}</h2>
                <p className="project-desc">{project.short_description}</p>
                <div className="project-tags">
                  {(project.technologies || []).slice(0, 4).map(t => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="project-arrow" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 15L15 5M15 5H8M15 5v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </a>
          ))}
        </section>
      </div>
    </div>
  );
}
