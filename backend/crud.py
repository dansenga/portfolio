from functools import lru_cache
from html import unescape
import json
import re
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from urllib.request import Request, urlopen

from sqlalchemy.orm import Session
from sqlalchemy import or_

import models, schemas

DEFAULT_GITHUB_URL = "https://github.com/dansenga"
DEFAULT_KAGGLE_URL = "https://www.kaggle.com/dansenga"

# Projects
def get_projects(db: Session, featured: bool = None, category: str = None):
    query = db.query(models.Project)
    if featured is not None:
        query = query.filter(models.Project.featured == featured)
    if category:
        query = query.filter(models.Project.category == category)
    return query.order_by(models.Project.display_order).all()

def get_project_by_slug(db: Session, slug: str):
    return db.query(models.Project).filter(models.Project.slug == slug).first()

def create_project(db: Session, project: schemas.ProjectCreate):
    db_project = models.Project(**project.model_dump())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

def update_project(db: Session, project_id: int, project: schemas.ProjectCreate):
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if db_project:
        for key, value in project.model_dump().items():
            setattr(db_project, key, value)
        db.commit()
        db.refresh(db_project)
    return db_project

def delete_project(db: Session, project_id: int):
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if db_project:
        db.delete(db_project)
        db.commit()
    return db_project

# Articles
def get_articles(db: Session, category: str = None, featured: bool = None, published: bool = None):
    query = db.query(models.Article)
    if category:
        query = query.filter(models.Article.category == category)
    if featured is not None:
        query = query.filter(models.Article.featured == featured)
    if published is not None:
        query = query.filter(models.Article.published == published)
    return query.order_by(models.Article.created_at.desc()).all()

def get_article_by_slug(db: Session, slug: str):
    return db.query(models.Article).filter(models.Article.slug == slug).first()

def create_article(db: Session, article: schemas.ArticleCreate):
    db_article = models.Article(**article.model_dump())
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article

def update_article(db: Session, article_id: int, article: schemas.ArticleCreate):
    db_article = db.query(models.Article).filter(models.Article.id == article_id).first()
    if db_article:
        for key, value in article.model_dump().items():
            setattr(db_article, key, value)
        db.commit()
        db.refresh(db_article)
    return db_article

def delete_article(db: Session, article_id: int):
    db_article = db.query(models.Article).filter(models.Article.id == article_id).first()
    if db_article:
        db.delete(db_article)
        db.commit()
    return db_article

# Research Projects
def get_research_projects(db: Session):
    return db.query(models.ResearchProject).order_by(models.ResearchProject.display_order).all()

def get_research_project_by_slug(db: Session, slug: str):
    return db.query(models.ResearchProject).filter(models.ResearchProject.slug == slug).first()

def create_research_project(db: Session, research: schemas.ResearchProjectCreate):
    db_research = models.ResearchProject(**research.model_dump())
    db.add(db_research)
    db.commit()
    db.refresh(db_research)
    return db_research

def update_research_project(db: Session, research_id: int, research: schemas.ResearchProjectCreate):
    db_research = db.query(models.ResearchProject).filter(models.ResearchProject.id == research_id).first()
    if db_research:
        for key, value in research.model_dump().items():
            setattr(db_research, key, value)
        db.commit()
        db.refresh(db_research)
    return db_research

# Experiments
def get_experiments(db: Session, research_project_id: int = None):
    query = db.query(models.Experiment)
    if research_project_id:
        query = query.filter(models.Experiment.research_project_id == research_project_id)
    return query.order_by(models.Experiment.display_order).all()

def create_experiment(db: Session, experiment: schemas.ExperimentCreate):
    db_exp = models.Experiment(**experiment.model_dump())
    db.add(db_exp)
    db.commit()
    db.refresh(db_exp)
    return db_exp

# Certifications
def get_certifications(db: Session):
    return db.query(models.Certification).order_by(models.Certification.display_order).all()

def create_certification(db: Session, cert: schemas.CertificationCreate):
    db_cert = models.Certification(**cert.model_dump())
    db.add(db_cert)
    db.commit()
    db.refresh(db_cert)
    return db_cert

def update_certification(db: Session, cert_id: int, cert: schemas.CertificationCreate):
    db_cert = db.query(models.Certification).filter(models.Certification.id == cert_id).first()
    if db_cert:
        for key, value in cert.model_dump().items():
            setattr(db_cert, key, value)
        db.commit()
        db.refresh(db_cert)
    return db_cert

def delete_certification(db: Session, cert_id: int):
    db_cert = db.query(models.Certification).filter(models.Certification.id == cert_id).first()
    if db_cert:
        db.delete(db_cert)
        db.commit()
    return db_cert

# Journey
def get_journey_entries(db: Session):
    return db.query(models.JourneyEntry).order_by(models.JourneyEntry.year.asc(), models.JourneyEntry.display_order).all()

def create_journey_entry(db: Session, entry: schemas.JourneyEntryCreate):
    db_entry = models.JourneyEntry(**entry.model_dump())
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry

def update_journey_entry(db: Session, entry_id: int, entry: schemas.JourneyEntryCreate):
    db_entry = db.query(models.JourneyEntry).filter(models.JourneyEntry.id == entry_id).first()
    if db_entry:
        for key, value in entry.model_dump().items():
            setattr(db_entry, key, value)
        db.commit()
        db.refresh(db_entry)
    return db_entry

# Technologies
def get_technologies(db: Session):
    return db.query(models.Technology).order_by(models.Technology.display_order).all()

def create_technology(db: Session, tech: schemas.TechnologyCreate):
    db_tech = models.Technology(**tech.model_dump())
    db.add(db_tech)
    db.commit()
    db.refresh(db_tech)
    return db_tech

# Currently
def get_current_status(db: Session):
    return db.query(models.CurrentStatus).order_by(models.CurrentStatus.display_order).all()

def update_current_status(db: Session, statuses: list[schemas.CurrentStatusCreate]):
    db.query(models.CurrentStatus).delete()
    for s in statuses:
        db.add(models.CurrentStatus(**s.model_dump()))
    db.commit()
    return get_current_status(db)

# Links
def get_links(db: Session):
    return db.query(models.ExternalLink).order_by(models.ExternalLink.display_order).all()


def _normalize_url(value: str | None, fallback: str) -> str:
    if not value:
        return fallback
    stripped = value.strip().rstrip("/")
    if stripped in {"https://github.com", "https://kaggle.com", "https://www.kaggle.com"}:
        return fallback
    return value.strip()


def _extract_username(profile_url: str, fallback: str) -> str:
    path = urlparse(profile_url).path.strip("/")
    if not path:
        return fallback
    return path.split("/")[0] or fallback


@lru_cache(maxsize=32)
def _fetch_text(url: str) -> str:
    request = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(request, timeout=10) as response:
        return response.read().decode("utf-8", errors="ignore")


@lru_cache(maxsize=32)
def _fetch_json(url: str):
    request = Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0",
            "Accept": "application/vnd.github+json",
        },
    )
    with urlopen(request, timeout=10) as response:
        return json.loads(response.read().decode("utf-8", errors="ignore"))


def _to_level(count: int) -> int:
    if count >= 10:
        return 4
    if count >= 6:
        return 3
    if count >= 3:
        return 2
    if count >= 1:
        return 1
    return 0


def _html_to_text(html: str) -> str:
    text = re.sub(r"<script[\s\S]*?</script>", " ", html, flags=re.IGNORECASE)
    text = re.sub(r"<style[\s\S]*?</style>", " ", text, flags=re.IGNORECASE)
    text = re.sub(r"<[^>]+>", " ", text)
    text = unescape(text)
    return re.sub(r"\s+", " ", text).strip()


def _month_label(date_value: str) -> str:
    month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    month_index = int(date_value[5:7]) - 1
    return month_names[month_index]


def get_activity_snapshot(db: Session):
    links = {link.platform.lower(): _normalize_url(link.url, DEFAULT_GITHUB_URL if link.platform.lower() == "github" else DEFAULT_KAGGLE_URL) for link in get_links(db)}

    github_url = _normalize_url(links.get("github"), DEFAULT_GITHUB_URL)
    kaggle_url = _normalize_url(links.get("kaggle"), DEFAULT_KAGGLE_URL)

    github_username = _extract_username(github_url, "dansenga")
    kaggle_username = _extract_username(kaggle_url, "dansenga")

    github_profile = {}
    github_repos = []
    github_events = []
    github_days = []
    kaggle_text = ""

    try:
        github_profile = _fetch_json(f"https://api.github.com/users/{github_username}")
    except (HTTPError, URLError, TimeoutError, json.JSONDecodeError, ValueError):
        github_profile = {}

    try:
        github_repos = _fetch_json(
            f"https://api.github.com/users/{github_username}/repos?per_page=100&sort=updated"
        )
    except (HTTPError, URLError, TimeoutError, json.JSONDecodeError, ValueError):
        github_repos = []

    try:
        github_events = _fetch_json(
            f"https://api.github.com/users/{github_username}/events/public?per_page=30"
        )
    except (HTTPError, URLError, TimeoutError, json.JSONDecodeError, ValueError):
        github_events = []

    try:
        github_html = _fetch_text(github_url)
        contribution_matches = re.findall(
            r'data-date="([^"]+)"[^>]*data-count="(\d+)"', github_html
        )
        for date_value, count_value in contribution_matches[-365:]:
            count = int(count_value)
            github_days.append(
                {
                    "date": date_value,
                    "formattedDate": date_value,
                    "count": count,
                    "level": _to_level(count),
                    "dayOfWeek": 0,
                }
            )
    except (HTTPError, URLError, TimeoutError, ValueError):
        github_days = []

    if not github_days:
        github_days = []

    github_total = sum(day["count"] for day in github_days)
    if github_total == 0:
        try:
            total_text_match = re.search(
                r"(\d+) contributions? in the last year",
                _html_to_text(_fetch_text(github_url)) if github_url else "",
            )
        except (HTTPError, URLError, TimeoutError, ValueError):
            total_text_match = None
        github_total = int(total_text_match.group(1)) if total_text_match else 0

    top_repos = sorted(
        github_repos,
        key=lambda repo: (repo.get("stargazers_count", 0), repo.get("forks_count", 0), repo.get("updated_at", "")),
        reverse=True,
    )[:4]

    recent_activity = []
    for event in github_events:
        event_type = event.get("type")
        repo_name = event.get("repo", {}).get("name", "repository")
        repo_url = f"https://github.com/{repo_name}"
        created_at = event.get("created_at", "")

        if event_type == "PushEvent":
            commits = event.get("payload", {}).get("commits", [])
            recent_activity.append(
                {
                    "date": created_at[:10],
                    "title": f"Created {len(commits)} commits in {repo_name}",
                    "description": f"{repo_name}",
                    "url": repo_url,
                }
            )
        elif event_type == "CreateEvent" and event.get("payload", {}).get("ref_type") == "repository":
            recent_activity.append(
                {
                    "date": created_at[:10],
                    "title": "Created 1 repository",
                    "description": repo_name,
                    "url": repo_url,
                }
            )

        if len(recent_activity) >= 3:
            break

    try:
        kaggle_html = _fetch_text(kaggle_url)
        kaggle_text = _html_to_text(kaggle_html)
    except (HTTPError, URLError, TimeoutError, ValueError):
        kaggle_html = ""
        kaggle_text = ""

    kaggle_badges = []
    pinned_work = []

    pandas_match = re.search(r"Pandas Course\s+·\s+([^·]+)\s+Completed", kaggle_text)
    pandas_url_match = re.search(r'href="([^"]*learn/certification/[^"]*pandas[^"]*)"', kaggle_html)
    pandas_url = pandas_url_match.group(1) if pandas_url_match else f"{kaggle_url.rstrip('/')}/learn/certification/{kaggle_username}/pandas"
    kaggle_badges.append(
        {
            "title": "Pandas Course",
            "subtitle": "Kaggle Learn certification",
            "url": pandas_url,
        }
    )
    pinned_work.append(
        {
            "title": "Pandas Course",
            "status": pandas_match.group(1).strip() if pandas_match else "Completed",
            "url": pandas_url,
            "type": "Certification",
        }
    )

    bio_match = re.search(r"Bio\s+(.+?)\s+Badges", kaggle_text)
    joined_match = re.search(r"Joined\s+(.+?)\s+·\s+last seen\s+(.+?)\s+\w+", kaggle_text)

    return {
        "github": {
            "username": github_username,
            "display_name": github_profile.get("name") or github_username,
            "bio": github_profile.get("bio") or "",
            "location": github_profile.get("location") or "",
            "followers": github_profile.get("followers", 0),
            "following": github_profile.get("following", 0),
            "public_repos": github_profile.get("public_repos", len(github_repos)),
            "contributions_last_year": github_total,
            "profile_url": github_url,
            "avatar_url": github_profile.get("avatar_url", ""),
            "top_repositories": [
                {
                    "name": repo.get("name"),
                    "description": repo.get("description") or "No description provided.",
                    "language": repo.get("language") or "Code",
                    "stars": repo.get("stargazers_count", 0),
                    "url": repo.get("html_url"),
                }
                for repo in top_repos
            ],
            "recent_activity": recent_activity,
            "contribution_days": github_days,
        },
        "kaggle": {
            "username": kaggle_username,
            "display_name": github_profile.get("name") or "Dan Senga",
            "bio": bio_match.group(1).strip() if bio_match else "",
            "joined": joined_match.group(1).strip() if joined_match else "",
            "last_seen": joined_match.group(2).strip() if joined_match else "",
            "profile_url": kaggle_url,
            "pinned_work": pinned_work,
            "badges": kaggle_badges,
        },
    }

# Search
def search_all(db: Session, query: str):
    search_term = f"%{query}%"
    
    projects = db.query(models.Project).filter(
        or_(
            models.Project.title.ilike(search_term),
            models.Project.short_description.ilike(search_term),
            models.Project.full_description.ilike(search_term)
        )
    ).all()
    
    articles = db.query(models.Article).filter(
        or_(
            models.Article.title.ilike(search_term),
            models.Article.excerpt.ilike(search_term),
            models.Article.content.ilike(search_term)
        )
    ).all()
    
    research = db.query(models.ResearchProject).filter(
        or_(
            models.ResearchProject.title.ilike(search_term),
            models.ResearchProject.description.ilike(search_term)
        )
    ).all()
    
    return {
        "projects": projects,
        "articles": articles,
        "research": research
    }
