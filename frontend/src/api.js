const API_BASE = import.meta.env.VITE_API_BASE || `${window.location.protocol}//${window.location.hostname}:8000/api`;

async function fetchAPI(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

function buildQuery(params) {
  if (!params) return '';
  const filtered = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
  );
  const qs = new URLSearchParams(filtered).toString();
  return qs ? `?${qs}` : '';
}

export const api = {
  // Projects
  getProjects: (params) => fetchAPI(`/projects${buildQuery(params)}`),
  getProject: (slug) => fetchAPI(`/projects/${slug}`),
  // Articles
  getArticles: (params) => fetchAPI(`/articles${buildQuery(params)}`),
  getArticle: (slug) => fetchAPI(`/articles/${slug}`),
  // Research
  getResearch: () => fetchAPI('/research'),
  getResearchProject: (slug) => fetchAPI(`/research/${slug}`),
  // Experiments
  getExperiments: (researchId) => fetchAPI(`/experiments${researchId ? `?research_project_id=${researchId}` : ''}`),
  // Others
  getCertifications: () => fetchAPI('/certifications'),
  getJourney: () => fetchAPI('/journey'),
  getTechnologies: () => fetchAPI('/technologies'),
  getCurrently: () => fetchAPI('/currently'),
  getLinks: () => fetchAPI('/links'),
  getActivity: () => fetchAPI('/activity'),
  search: (q) => fetchAPI(`/search?q=${encodeURIComponent(q)}`),
};
