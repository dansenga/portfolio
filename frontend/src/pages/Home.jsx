import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import './Home.css';

export default function Home() {
  const { data: currently } = useFetch(() => api.getCurrently(), []);
  const { data: projects } = useFetch(() => api.getProjects({ featured: true }), []);
  const { data: articles } = useFetch(() => api.getArticles({ published: true, featured: true }), []);
  const heroRef = useRef(null);

  // Observe hero visibility and dispatch custom event for Layout navbar
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        window.dispatchEvent(
          new CustomEvent('hero-visibility', { detail: { visible: entry.isIntersecting } })
        );
      },
      { threshold: 0.15 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home">
      {/* ── HERO ── */}
      <section className="hero" ref={heroRef}>
        <div className="hero__inner container">
          <div className="hero__content">
            <h1 className="hero__name animate-fadeInUp">
              <span className="hero__name-dan">DAN</span>
              <br />
              <span className="hero__name-senga">SENGA</span>
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

          {/* ── Tech Logo Grid ── */}
          <div className="hero__tech animate-fadeInUp animate-delay-6">
            <div className="tech-grid-logos">
              {[
                { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
                { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
                { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg' },
                { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' },
                { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg' },
                { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg' },
                { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
                { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
                { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
                { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
                { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg' },
                { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
                { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg' },
                { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
                { name: 'Jupyter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg' },
                { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
              ].map((tech, i) => (
                <div
                  className="tech-logo-cell"
                  key={tech.name}
                  style={{ animationDelay: `${i * 0.08}s` }}
                  title={tech.name}
                >
                  <img src={tech.icon} alt={tech.name} loading="lazy" />
                  <span className="tech-logo-cell__name">{tech.name}</span>
                </div>
              ))}
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
