import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import './Writing.css';

const Writing = () => {
  const { data: articles, loading, error } = useFetch(() => api.getArticles({ published: true }));
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Technology', 'AI', 'Healthcare', 'Software Engineering', 'History', 'Faith', 'Ideas', 'Learning', 'Personal Development'];

  const filteredArticles = articles?.filter(a => filter === 'All' || a.category === filter);
  const navigate = useNavigate();

  // Navigate with View Transition when clicking an article
  const handleArticleClick = useCallback((e, slug) => {
    e.preventDefault();

    if (!document.startViewTransition) {
      navigate(`/writing/${slug}`);
      return;
    }

    // Set view-transition-name dynamically on the clicked article title
    const card = e.currentTarget;
    const titleEl = card.querySelector('.article-title');
    
    if (titleEl) titleEl.style.viewTransitionName = 'article-title';

    const transition = document.startViewTransition(() => {
      navigate(`/writing/${slug}`);
    });

    transition.finished.finally(() => {
      if (titleEl) titleEl.style.viewTransitionName = '';
    });
  }, [navigate]);

  return (
    <div className="writing-page">
      <section className="writing-header scroll-reveal">
        <h1 className="title">Writing</h1>
        <div className="category-pills">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`pill ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="articles-list scroll-reveal">
        {loading && <p>Loading articles...</p>}
        {error && <p>Failed to load articles.</p>}
        {filteredArticles?.map(article => (
          <a 
            href={`/writing/${article.slug}`} 
            key={article.id} 
            className="article-item"
            onClick={(e) => handleArticleClick(e, article.slug)}
          >
            <div className="article-meta">
              <span className="date">{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span className="category-dot">•</span>
              <span className="category">{article.category}</span>
            </div>
            <h2 className="article-title">{article.title}</h2>
            <p className="article-excerpt">{article.excerpt}</p>
            <div className="article-footer">
              <span className="read-time">{article.readingTime} min read</span>
            </div>
          </a>
        ))}
      </section>
    </div>
  );
};

export default Writing;
