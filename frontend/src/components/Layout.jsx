import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';

// Reading Progress Bar — visible on detail/article pages
const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  // Only show on detail routes
  const isDetailPage = /^\/(work|writing)\/[^/]+$/.test(location.pathname);

  useEffect(() => {
    if (!isDetailPage) return;

    // Check if CSS scroll-driven animations are supported
    if (CSS.supports && CSS.supports('(animation-timeline: scroll())')) {
      // CSS handles it natively — no JS needed
      return;
    }

    // JS fallback for browsers without scroll timeline
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      ) - window.innerHeight;
      
      const pct = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      setProgress(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDetailPage, location.pathname]);

  if (!isDetailPage) return null;

  return (
    <div className={styles.progressTrack}>
      <div
        className={styles.progressBar}
        style={{ '--scroll-progress': `${progress}%` }}
      />
    </div>
  );
};

// SVG Icons
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Lubumbashi',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  return <div className={styles.clock}>{formatter.format(time)} CAT</div>;
};

const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const commands = [
    { id: 'work', title: 'Go to Work', action: () => navigate('/work') },
    { id: 'research', title: 'Go to Research', action: () => navigate('/research') },
    { id: 'writing', title: 'Read Writing', action: () => navigate('/writing') },
    { id: 'github', title: 'View GitHub', action: () => window.open('https://github.com', '_blank') },
    { id: 'kaggle', title: 'View Kaggle', action: () => window.open('https://kaggle.com', '_blank') },
    { id: 'contact', title: 'Contact Dan', action: () => navigate('/contact') },
  ];

  const filteredCommands = commands.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(i => (i + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(i => (i - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        e.preventDefault();
        filteredCommands[selectedIndex].action();
        onClose();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.cmdOverlay} onClick={onClose}>
      <div className={styles.cmdDialog} onClick={e => e.stopPropagation()}>
        <input 
          ref={inputRef}
          type="text" 
          placeholder="Search or jump to..." 
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setSelectedIndex(0);
          }}
          className={styles.cmdInput}
        />
        <div className={styles.cmdList}>
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, i) => (
              <div 
                key={cmd.id}
                className={`${styles.cmdItem} ${i === selectedIndex ? styles.cmdItemActive : ''}`}
                onMouseEnter={() => setSelectedIndex(i)}
                onClick={() => { cmd.action(); onClose(); }}
              >
                {cmd.title}
              </div>
            ))
          ) : (
            <div className={styles.cmdEmpty}>No results found</div>
          )}
        </div>
      </div>
    </div>
  );
};

// Theme Icons
const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [isLight, setIsLight] = useState(() => {
    return document.documentElement.classList.contains('light-theme');
  });
  const location = useLocation();

  // Listen for hero visibility events from Home page
  useEffect(() => {
    const handleHeroVisibility = (e) => {
      setHeroVisible(e.detail.visible);
    };
    window.addEventListener('hero-visibility', handleHeroVisibility);
    return () => window.removeEventListener('hero-visibility', handleHeroVisibility);
  }, []);

  // Reset heroVisible when navigating away from home
  useEffect(() => {
    if (location.pathname !== '/') {
      setHeroVisible(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(o => !o);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    const nextLight = !isLight;
    setIsLight(nextLight);
    document.documentElement.classList.toggle('light-theme', nextLight);
    const nextTheme = nextLight ? 'light' : 'dark';
    localStorage.setItem('color-theme', nextTheme);
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) meta.content = nextTheme;
  };

  const navLinks = [
    { path: '/work', label: 'Work' },
    { path: '/research', label: 'Research' },
    { path: '/writing', label: 'Writing' },
    { path: '/activity', label: 'Activity' },
    { path: '/journey', label: 'Journey' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <div className={styles.layout}>
      <ReadingProgressBar />
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.headerContainer}>
          <Link to="/" className={`${styles.brand} ${heroVisible ? styles.brandHidden : ''}`}>DAN SENGA</Link>
          
          <nav className={styles.desktopNav}>
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`${styles.navLink} ${location.pathname.startsWith(link.path) ? styles.navLinkActive : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.headerActions}>
            <button 
              className={styles.themeToggle} 
              onClick={toggleTheme}
              aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
            >
              {isLight ? <MoonIcon /> : <SunIcon />}
            </button>
            <button className={styles.cmdHint} onClick={() => setCmdOpen(true)}>
              ⌘K
            </button>
            <button className={styles.mobileToggle} onClick={() => setMenuOpen(!menuOpen)}>
              <span className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}></span>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className={styles.mobileNav}>
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path}
              className={styles.mobileNavLink}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <h2 className={styles.footerLogo}>DAN SENGA</h2>
              <p className={styles.footerSubtitle}>Software Engineer</p>
              <p className={styles.footerTags}>AI · Healthcare · Research</p>
            </div>
            
            <div className={styles.footerLinks}>
              <div className={styles.footerNavGroup}>
                <Link to="/work">Work</Link>
                <Link to="/research">Research</Link>
                <Link to="/writing">Writing</Link>
              </div>
              <div className={styles.footerNavGroup}>
                <Link to="/journey">Journey</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <div className={styles.footerTimeWrapper}>
              <Clock />
              <div className={styles.footerDate}>
                {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date())}
              </div>
            </div>
            
            <div className={styles.socialRow}>
              <a href="https://github.com/dansenga" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon /></a>
              <a href="https://www.linkedin.com/in/dan-senga-099569376" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
              <a href="https://x.com/dan_senga7" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"><XIcon /></a>
              <a href="mailto:dansenga455@gmail.com" aria-label="Email"><EmailIcon /></a>
            </div>
            
            <div className={styles.copyright}>
              © {new Date().getFullYear()} Dan Senga
            </div>
          </div>
        </div>
      </footer>

      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
    </div>
  );
}
