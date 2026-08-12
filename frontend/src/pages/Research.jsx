import React from 'react';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import './Research.css';

const Research = () => {
  const { data: researchProjects, loading: loadingProjects } = useFetch(api.getResearch);
  const { data: experiments, loading: loadingExperiments } = useFetch(api.getExperiments);

  return (
    <div className="research-page">
      <section className="research-hero scroll-reveal">
        <h1 className="title">Research</h1>
        <p className="subtitle">research in AI + Healthcare</p>
      </section>

      <section className="research-projects scroll-reveal">
        <h2 className="section-title">Research Projects</h2>
        {loadingProjects ? <p>Loading projects...</p> : (
          <div className="projects-list">
            {researchProjects?.map(project => (
              <div key={project.id} className="research-card">
                <h3>{project.title}</h3>
                <div className="research-meta">
                  <span className="status">{project.status}</span>
                </div>
                <p className="description">{project.description}</p>
                <div className="research-details">
                  <p><strong>Dataset:</strong> {project.dataset}</p>
                  <p><strong>Methodology:</strong> {project.methodology}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="lab-experiments scroll-reveal">
        <h2 className="section-title">Lab Experiments</h2>
        {loadingExperiments ? <p>Loading experiments...</p> : (
          <div className="experiments-list">
            {experiments?.map((exp, index) => (
              <div key={exp.id} className="experiment-row">
                <div className="exp-number">LAB / {String(index + 1).padStart(2, '0')}</div>
                <div className="exp-content">
                  <h3>{exp.title}</h3>
                  <p>{exp.description}</p>
                  <div className="exp-meta">
                    <span className="tech">{exp.technology}</span>
                    <span className="date">{exp.date}</span>
                    <span className="status">{exp.status}</span>
                  </div>
                  {exp.results && (
                    <div className="exp-results">
                      <strong>Results:</strong> {exp.results}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Research;
