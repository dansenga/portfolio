import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import './Home.css';

export default function Home() {
  const { data: currently } = useFetch(() => api.getCurrently(), []);
  const { data: projects } = useFetch(() => api.getProjects({ featured: true }), []);
  const { data: articles } = useFetch(() => api.getArticles({ published: true, featured: true }), []);

  return (
    <div className="home">
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__inner container">
          <div className="hero__content">
            <h1 className="hero__name animate-fadeInUp">
              DAN<br />SENGA
            </h1>
            <p className="hero__title animate-fadeInUp animate-delay-2">
              Software Engineer
            </p>
            <p className="hero__domains animate-fadeInUp animate-delay-3">
              Artificial Intelligence · Healthcare · Research
            </p>
            <p className="hero__statement animate-fadeInUp animate-delay-4">
              I build software, explore intelligent systems, and investigate
              how technology can create meaningful impact.
            </p>
            <div className="hero__ctas animate-fadeInUp animate-delay-5">
              <Link to="/work" className="hero__btn hero__btn--primary">
                Explore my work
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link to="/writing" className="hero__btn hero__btn--secondary">
                Read my writing
              </Link>
            </div>
          </div>
          <div className="hero__scroll-indicator animate-fadeInUp animate-delay-8" aria-label="Scroll down">
            <span className="hero__scroll-label">Scroll</span>
            <div className="hero__scroll-track">
              <div className="hero__scroll-thumb"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CURRENTLY ── */}
      {currently && currently.length > 0 && (
        <section className="currently-section scroll-reveal">
          <div className="container">
            <div className="section-label">
              <span className="section-label__accent">●</span> Currently
            </div>
            <div className="currently-grid">
              {currently.map((item, i) => (
                <div className="currently-card" key={item.id || i}>
                  <span className="currently-card__category">{item.category}</span>
                  <p className="currently-card__desc">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FEATURED WORK ── */}
      {projects && projects.length > 0 && (
        <section className="featured-section scroll-reveal">
          <div className="container">
            <div className="section-label">Featured Work</div>
            <h2 className="section-title">Selected Projects</h2>
            <div className="featured-list">
              {projects.slice(0, 4).map((project, index) => (
                <Link
                  to={`/work/${project.slug}`}
                  className="featured-item"
                  key={project.id || index}
                >
                  <span className="featured-item__number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="featured-item__content">
                    <div className="featured-item__top">
                      <span className="featured-item__category">{project.category}</span>
                      <span className="featured-item__year">{project.year}</span>
                    </div>
                    <h3 className="featured-item__title">{project.title}</h3>
                    <p className="featured-item__desc">{project.short_description}</p>
                    <div className="featured-item__tags">
                      {(project.technologies || []).slice(0, 4).map(t => (
                        <span className="tag" key={t}>{t}</span>
                      ))}
                      {project.status && (
                        <span className="tag tag--status">{project.status}</span>
                      )}
                    </div>
                  </div>
                  <div className="featured-item__arrow" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 15L15 5M15 5H8M15 5v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </Link>
              ))}
            </div>
            <div className="section-footer">
              <Link to="/work" className="section-link">
                View all projects
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── LATEST WRITING ── */}
      {articles && articles.length > 0 && (
        <section className="writing-section scroll-reveal">
          <div className="container">
            <div className="section-label">Latest Writing</div>
            <div className="writing-list">
              {articles.slice(0, 3).map((article, i) => (
                <Link
                  to={`/writing/${article.slug}`}
                  className="writing-item"
                  key={article.id || i}
                >
                  <div className="writing-item__meta">
                    <span className="writing-item__category">{article.category}</span>
                    <span className="writing-item__date">
                      {new Date(article.created_at).toLocaleDateString('en-US', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </span>
                  </div>
                  <h3 className="writing-item__title">{article.title}</h3>
                  <p className="writing-item__excerpt">{article.excerpt}</p>
                  <span className="writing-item__read">
                    {article.reading_time_min || 5} min read
                  </span>
                </Link>
              ))}
            </div>
            <div className="section-footer">
              <Link to="/writing" className="section-link">
                Read all articles
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
