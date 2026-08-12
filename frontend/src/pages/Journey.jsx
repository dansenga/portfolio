import React from 'react';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import './Journey.css';

const Journey = () => {
  const { data: journey, loading, error } = useFetch(api.getJourney);

  // Group journey by year
  const groupedJourney = journey?.reduce((acc, item) => {
    if (!acc[item.year]) acc[item.year] = [];
    acc[item.year].push(item);
    return acc;
  }, {});

  const sortedYears = groupedJourney ? Object.keys(groupedJourney).sort((a, b) => a - b) : [];

  return (
    <div className="journey-page">
      <section className="journey-header scroll-reveal">
        <h1 className="title">Journey</h1>
        <p className="subtitle">Visual timeline of growth and exploration</p>
      </section>

      <section className="timeline scroll-reveal">
        {loading && <p>Loading journey...</p>}
        {error && <p>Failed to load journey.</p>}
        {sortedYears.map(year => (
          <div key={year} className="timeline-year-group">
            <h2 className="year-header">{year}</h2>
            <div className="year-entries">
              {groupedJourney[year].map(entry => (
                <div key={entry.id} className="timeline-entry scroll-reveal">
                  <div className="entry-dot"></div>
                  <div className="entry-content">
                    <span className="entry-category">{entry.category}</span>
                    <h3 className="entry-title">{entry.title}</h3>
                    <p className="entry-desc">{entry.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Journey;
