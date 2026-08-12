import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import './ArticleDetail.css';

const ArticleDetail = () => {
  const { slug } = useParams();
  const { data: article, loading, error } = useFetch(() => api.getArticle(slug), [slug]);
  const { data: related } = useFetch(() => api.getArticles({ category: article?.category, limit: 3 }), [article]);
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  if (loading) return <div className="article-detail loading">Loading article...</div>;
  if (error || !article) return <div className="article-detail error">Article not found.</div>;

  // Navigate back with View Transition
  const handleBack = (e) => {
    e.preventDefault();
    if (!document.startViewTransition) {
      navigate('/writing');
      return;
    }
    document.startViewTransition(() => navigate('/writing'));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <article className="article-detail">
      <header className="article-header scroll-reveal">
        <a href="/writing" className="back-link" onClick={handleBack}>← Back to Writing</a>
        <div className="article-meta">
          <span className="category">{article.category}</span>
          <span className="dot">•</span>
          <span className="date">{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span className="dot">•</span>
          <span className="read-time">{article.readingTime} min read</span>
        </div>
        <h1 className="title">{article.title}</h1>
        {article.subtitle && <p className="subtitle">{article.subtitle}</p>}
      </header>

      <div className="article-content scroll-reveal">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>

      <footer className="article-footer scroll-reveal">
        <div className="share-section">
          <button className="copy-btn" onClick={handleCopyLink}>
            {copied ? (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!</>
            ) : (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg> Share Article</>
            )}
          </button>
        </div>

        <div className="external-links">
          {article.mediumUrl && <a href={article.mediumUrl} target="_blank" rel="noopener noreferrer">Read on Medium</a>}
          {article.linkedinUrl && <a href={article.linkedinUrl} target="_blank" rel="noopener noreferrer">Discuss on LinkedIn</a>}
        </div>

        {related && related.length > 0 && (
          <div className="related-articles">
            <h3>Related Articles</h3>
            <div className="related-list">
              {related.filter(r => r.id !== article.id).slice(0, 2).map(r => (
                <Link to={`/writing/${r.slug}`} key={r.id} className="related-item">
                  <h4>{r.title}</h4>
                  <span>{r.readingTime} min read</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </footer>
    </article>
  );
};

export default ArticleDetail;
