import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page container">
      {/* ── HERO ── */}
      <section className="hero-section scroll-reveal animate-fadeInUp">
        <h1 className="title">About</h1>
        <p className="subtitle">Software Engineering &rarr; Artificial Intelligence &rarr; Healthcare &rarr; Research &rarr; Impact</p>
      </section>

      {/* ── PERSONAL STORY ── */}
      <section className="story-section scroll-reveal animate-fadeInUp animate-delay-2">
        <h2 className="section-title">Personal Story</h2>
        <div className="story-content">
          <p>
            I am <strong>Dan Senga</strong>, a final-year Software Engineering student at the Protestant University of Lubumbashi (UPL), in the Democratic Republic of the Congo.
          </p>
          <p>
            I am interested in software design, backend development, and artificial intelligence, with a particular ambition: to use technology to advance healthcare, knowledge, and the resolution of real-world problems.
          </p>
          <p>
            I build software applications, explore machine learning and computer vision models, and progressively develop projects at the intersection of software engineering and healthcare. I am also interested in scientific research, writing, and knowledge sharing.
          </p>
          <p>
            My goal is to become a <strong>Software Engineer and AI Engineer</strong>, contribute to scientific research, and build useful, accessible, and sustainable technological solutions.
          </p>
        </div>
      </section>

      {/* ── SKILLS ECOSYSTEM ── */}
      <section className="skills-section scroll-reveal">
        <h2 className="section-title">Skills Ecosystem</h2>
        <div className="ecosystem-grid">
          
          <div className="ecosystem-category">
            <h3>Software Engineering</h3>
            <div className="tech-tags">
              <span>Software Design</span><span>Programming</span><span>Application Architecture</span><span>Git & GitHub</span><span>Docker</span>
            </div>
          </div>

          <div className="ecosystem-category">
            <h3>Backend & APIs</h3>
            <div className="tech-tags">
              <span>Python</span><span>Django</span><span>PHP</span><span>Laravel</span><span>REST APIs</span>
            </div>
          </div>

          <div className="ecosystem-category">
            <h3>Artificial Intelligence</h3>
            <div className="tech-tags">
              <span>Machine Learning</span><span>Deep Learning</span><span>Convolutional Neural Networks (CNNs)</span><span>Computer Vision</span><span>TensorFlow</span>
            </div>
          </div>

          <div className="ecosystem-category">
            <h3>Data & Databases</h3>
            <div className="tech-tags">
              <span>MySQL</span><span>PostgreSQL</span><span>SQLite</span><span>SQL Server</span><span>Pandas</span><span>Data Analysis</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── AREAS OF INTEREST ── */}
      <section className="interest-section scroll-reveal">
        <h2 className="section-title">Areas of Interest</h2>
        <ul className="interest-list">
          <li>
            <strong>AI for Healthcare:</strong> Exploring artificial intelligence applications for medical image analysis and medical knowledge support.
          </li>
          <li>
            <strong>Scientific Research:</strong> Investigating real-world problems, analyzing existing approaches, and turning ideas into structured research projects.
          </li>
          <li>
            <strong>Backend Technologies:</strong> Designing robust applications, APIs, and systems that address real-world needs.
          </li>
          <li>
            <strong>Knowledge Sharing:</strong> Writing, documenting, and communicating ideas about software engineering, AI, healthcare, and technology.
          </li>
        </ul>
      </section>

      {/* ── MY VISION ── */}
      <section className="vision-section scroll-reveal">
        <h2 className="section-title">My Vision</h2>
        <div className="vision-content">
          <p>
            I see software engineering as a means of building, artificial intelligence as a driver of innovation, and research as a way to deepen knowledge.
          </p>
          <p>
            In the long term, I aspire to contribute to internationally relevant research and engineering projects, particularly in the field of artificial intelligence applied to healthcare.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
