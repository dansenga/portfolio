import React from 'react';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import './Contact.css';

const Contact = () => {
  const { data: links } = useFetch(api.getLinks);

  const getLink = (platform) => {
    if (!Array.isArray(links)) return null;
    const found = links.find(l => l.platform?.toLowerCase() === platform.toLowerCase());
    return found?.url || null;
  };

  const linkedinUrl = getLink('linkedin');
  const githubUrl = getLink('github');
  const kaggleUrl = getLink('kaggle');
  const emailUrl = getLink('email');
  const xUrl = getLink('x');

  return (
    <div className="contact-page">
      <section className="contact-hero scroll-reveal">
        <h1 className="headline">Let's build something meaningful.</h1>
        <p className="description">
          I am currently open to collaborations, research opportunities, 
          and challenging software engineering roles.
        </p>
      </section>

      <section className="contact-content scroll-reveal">
        <div className="opportunities">
          <h2>Connect with me for:</h2>
          <ul>
            <li>Software Engineering Projects</li>
            <li>AI & Machine Learning Collaborations</li>
            <li>Healthcare Technology Initiatives</li>
            <li>Research & Academic Opportunities</li>
            <li>Speaking & Writing</li>
          </ul>
        </div>

        <div className="contact-links">
          <h2>Get in Touch</h2>
          <div className="links-list">
            {emailUrl && (
              <a href={emailUrl} className="contact-link">
                <span className="label">Email</span>
                <span className="value">dansenga455@gmail.com</span>
              </a>
            )}
            {linkedinUrl && (
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="label">LinkedIn</span>
                <span className="value">Dan Senga</span>
              </a>
            )}
            {xUrl && (
              <a href={xUrl} target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="label">X (Twitter)</span>
                <span className="value">@dan_senga7</span>
              </a>
            )}
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="label">GitHub</span>
                <span className="value">@dansenga</span>
              </a>
            )}
            {kaggleUrl && (
              <a href={kaggleUrl} target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="label">Kaggle</span>
                <span className="value">@dansenga</span>
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
