import React from 'react';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import './Certifications.css';

const Certifications = () => {
  const { data: certifications, loading, error } = useFetch(api.getCertifications);

  return (
    <div className="certifications-page">
      <section className="cert-header scroll-reveal">
        <h1 className="title">Certifications</h1>
        <p className="subtitle">Continuous learning and validation of skills</p>
      </section>

      <section className="cert-list scroll-reveal">
        {loading && <p>Loading certifications...</p>}
        {error && <p>Failed to load certifications.</p>}
        
        {certifications?.map((cert, index) => (
          <div key={cert.id} className="cert-item">
            <div className="cert-number">{String(index + 1).padStart(2, '0')}</div>
            <div className="cert-content">
              <h2 className="cert-title">{cert.title}</h2>
              <div className="cert-meta">
                <span className="cert-provider">{cert.provider}</span>
                <span className="dot">•</span>
                <span className="cert-date">{cert.date}</span>
              </div>
              {cert.credentialId && (
                <div className="cert-credential">
                  ID: {cert.credentialId}
                </div>
              )}
            </div>
            {cert.url && (
              <a href={cert.url} target="_blank" rel="noopener noreferrer" className="verify-btn">
                Verify
              </a>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Certifications;
