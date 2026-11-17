import React from 'react';
import './About.css';

const About = () => {
  const skills = [
    {
      title: 'Software Engineering',
      icon: '⚙️',
      tags: ['Software Design', 'Programming', 'Application Architecture', 'Git & GitHub', 'Docker'],
    },
    {
      title: 'Backend & APIs',
      icon: '🔧',
      tags: ['Python', 'Django', 'PHP', 'Laravel', 'REST APIs'],
    },
    {
      title: 'Artificial Intelligence',
      icon: '🧠',
      tags: ['Machine Learning', 'Deep Learning', 'CNNs', 'Computer Vision', 'TensorFlow'],
    },
    {
      title: 'Data & Databases',
      icon: '📊',
      tags: ['MySQL', 'PostgreSQL', 'SQLite', 'SQL Server', 'Pandas', 'Data Analysis'],
    },
  ];

  const interests = [
    {
      icon: '🏥',
      title: 'AI for Healthcare',
      description: 'Exploring artificial intelligence applications for medical image analysis and medical knowledge support.',
    },
    {
      icon: '🔬',
      title: 'Scientific Research',
      description: 'Investigating real-world problems, analyzing existing approaches, and turning ideas into structured research projects.',
    },
    {
      icon: '🖥️',
      title: 'Backend Technologies',
      description: 'Designing robust applications, APIs, and systems that address real-world needs.',
    },
    {
      icon: '✍️',
      title: 'Knowledge Sharing',
      description: 'Writing, documenting, and communicating ideas about software engineering, AI, healthcare, and technology.',
    },
  ];

  return (
    <div className="about-page">
      {/* ── HERO WITH PHOTO ── */}
      <section className="about-hero scroll-reveal">
        <div className="about-hero__inner container">
          <div className="about-hero__photo-wrapper animate-fadeInUp">
            <div className="about-hero__photo-frame">
              <img
                src="/MyPhoto/DanSenga.jpeg"
                alt="Dan Senga presenting at a conference"
                className="about-hero__photo"
                loading="eager"
                width="480"
                height="600"
              />
              <div className="about-hero__photo-glow" aria-hidden="true"></div>
            </div>
            <div className="about-hero__photo-badge" aria-hidden="true">
              <span className="about-hero__badge-dot"></span>
              Lubumbashi, DRC
            </div>
          </div>

          <div className="about-hero__content">
            <div className="about-hero__label animate-fadeInUp animate-delay-1">
              <span className="about-hero__label-accent">●</span> About Me
            </div>
            <h1 className="about-hero__name animate-fadeInUp animate-delay-2">
              Dan <span className="about-hero__name-accent">Senga</span>
            </h1>
            <p className="about-hero__role animate-fadeInUp animate-delay-3">
              Software Engineer · AI Enthusiast · Researcher
            </p>
            <p className="about-hero__bio animate-fadeInUp animate-delay-4">
              Final-year Software Engineering student at the Protestant University of Lubumbashi (UPL),
              in the Democratic Republic of the Congo. I build software, explore intelligent systems,
              and investigate how technology can create meaningful impact in healthcare and beyond.
            </p>
            <div className="about-hero__stats animate-fadeInUp animate-delay-5">
              <div className="about-hero__stat">
                <span className="about-hero__stat-value">SE</span>
                <span className="about-hero__stat-label">Software Engineering</span>
              </div>
              <div className="about-hero__stat">
                <span className="about-hero__stat-value">AI</span>
                <span className="about-hero__stat-label">Artificial Intelligence</span>
              </div>
              <div className="about-hero__stat">
                <span className="about-hero__stat-value">HC</span>
                <span className="about-hero__stat-label">Healthcare</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PERSONAL STORY ── */}
      <section className="about-story scroll-reveal">
        <div className="container">
          <div className="about-story__header">
            <div className="about-section-label">
              <span className="about-section-label__accent">●</span> Personal Story
            </div>
            <h2 className="about-section-title">What Drives Me</h2>
          </div>
          <div className="about-story__content">
            <div className="about-story__block">
              <p>
                I am interested in software design, backend development, and artificial intelligence,
                with a particular ambition: to use technology to advance healthcare, knowledge, and
                the resolution of real-world problems.
              </p>
            </div>
            <div className="about-story__block">
              <p>
                I build software applications, explore machine learning and computer vision models,
                and progressively develop projects at the intersection of software engineering and
                healthcare. I am also interested in scientific research, writing, and knowledge sharing.
              </p>
            </div>
            <div className="about-story__block about-story__block--highlight">
              <p>
                My goal is to become a <strong>Software Engineer and AI Engineer</strong>, contribute
                to scientific research, and build useful, accessible, and sustainable technological solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ECOSYSTEM ── */}
      <section className="about-skills scroll-reveal">
        <div className="container">
          <div className="about-skills__header">
            <div className="about-section-label">
              <span className="about-section-label__accent">●</span> Skills Ecosystem
            </div>
            <h2 className="about-section-title">Technologies & Expertise</h2>
          </div>
          <div className="about-skills__grid">
            {skills.map((skill) => (
              <div className="about-skill-card" key={skill.title}>
                <div className="about-skill-card__icon">{skill.icon}</div>
                <h3 className="about-skill-card__title">{skill.title}</h3>
                <div className="about-skill-card__tags">
                  {skill.tags.map((tag) => (
                    <span className="about-skill-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AREAS OF INTEREST ── */}
      <section className="about-interests scroll-reveal">
        <div className="container">
          <div className="about-interests__header">
            <div className="about-section-label">
              <span className="about-section-label__accent">●</span> Areas of Interest
            </div>
            <h2 className="about-section-title">Where I Focus</h2>
          </div>
          <div className="about-interests__grid">
            {interests.map((interest) => (
              <div className="about-interest-card" key={interest.title}>
                <div className="about-interest-card__icon">{interest.icon}</div>
                <h3 className="about-interest-card__title">{interest.title}</h3>
                <p className="about-interest-card__desc">{interest.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MY VISION ── */}
      <section className="about-vision scroll-reveal">
        <div className="container">
          <div className="about-vision__inner">
            <div className="about-section-label">
              <span className="about-section-label__accent">●</span> Vision
            </div>
            <h2 className="about-vision__title">Building the Future</h2>
            <div className="about-vision__content">
              <p>
                I see software engineering as a means of building, artificial intelligence as a
                driver of innovation, and research as a way to deepen knowledge.
              </p>
              <p>
                In the long term, I aspire to contribute to internationally relevant research and
                engineering projects, particularly in the field of artificial intelligence applied
                to healthcare.
              </p>
            </div>
            <div className="about-vision__accent-line" aria-hidden="true"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
