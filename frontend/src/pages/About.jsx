import React from 'react';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import './About.css';

const About = () => {
  const { data: technologies, loading, error } = useFetch(api.getTechnologies);

  return (
    <div className="about-page">
      <section className="hero-section scroll-reveal">
        <h1 className="title">About</h1>
        <p className="subtitle">Software Engineering → AI → Healthcare → Research → Impact</p>
      </section>

      <section className="story-section scroll-reveal">
        <h2 className="section-title">Personal Story</h2>
        <div className="story-content">
          <p>
            I am Dan Senga, a Software Engineering student. 
            I build software, study technology, explore AI, work on healthcare tech, 
            experiment with research, write and share ideas.
          </p>
        </div>
      </section>

      <section className="skills-section scroll-reveal">
        <h2 className="section-title">Skills Ecosystem</h2>
        {loading && <p className="loading">Loading ecosystem...</p>}
        {error && <p className="error">Failed to load skills.</p>}
        {technologies && (
          <div className="ecosystem-grid">
            <div className="ecosystem-category">
              <h3>Software Engineering</h3>
              <div className="tech-tags">
                <span>Python</span><span>PHP</span><span>Laravel</span><span>Django</span>
                <span>JavaScript</span><span>HTML</span><span>CSS</span><span>Git</span><span>Docker</span>
              </div>
            </div>
            <div className="ecosystem-category">
              <h3>AI / Data</h3>
              <div className="tech-tags">
                <span>Python</span><span>ML</span><span>Deep Learning</span>
                <span>Computer Vision</span><span>Data Analysis</span><span>TensorFlow</span>
              </div>
            </div>
            <div className="ecosystem-category">
              <h3>Backend</h3>
              <div className="tech-tags">
                <span>Python</span><span>Django</span><span>PHP</span><span>Laravel</span>
                <span>REST APIs</span><span>Databases</span>
              </div>
            </div>
            <div className="ecosystem-category">
              <h3>Databases</h3>
              <div className="tech-tags">
                <span>MySQL</span><span>SQL</span><span>SQLite</span>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default About;
