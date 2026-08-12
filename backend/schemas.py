from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

class ProjectBase(BaseModel):
    title: str
    slug: str
    category: str
    short_description: str
    full_description: str
    problem: Optional[str] = None
    idea: Optional[str] = None
    solution: Optional[str] = None
    architecture: Optional[str] = None
    challenges: Optional[str] = None
    decisions: Optional[str] = None
    results: Optional[str] = None
    lessons: Optional[str] = None
    technologies: Optional[List[str]] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    docs_url: Optional[str] = None
    image_url: Optional[str] = None
    status: str
    featured: bool = False
    year: int
    display_order: int = 0

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ArticleBase(BaseModel):
    title: str
    slug: str
    subtitle: Optional[str] = None
    category: str
    content: str
    excerpt: str
    reading_time_min: int
    cover_url: Optional[str] = None
    published: bool = False
    featured: bool = False
    external_url: Optional[str] = None
    medium_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    tags: Optional[List[str]] = None

class ArticleCreate(ArticleBase):
    pass

class Article(ArticleBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ResearchProjectBase(BaseModel):
    title: str
    slug: str
    description: str
    question: Optional[str] = None
    motivation: Optional[str] = None
    dataset: Optional[str] = None
    methodology: Optional[str] = None
    preprocessing: Optional[str] = None
    models: Optional[str] = None
    experiments: Optional[str] = None
    results_text: Optional[str] = None
    visualizations: Optional[List[Dict[str, Any]]] = None
    papers: Optional[List[Dict[str, Any]]] = None
    references: Optional[List[Dict[str, Any]]] = None
    future_work: Optional[str] = None
    technologies: Optional[List[str]] = None
    status: str
    github_url: Optional[str] = None
    year: int
    display_order: int = 0

class ResearchProjectCreate(ResearchProjectBase):
    pass

class ResearchProject(ResearchProjectBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ExperimentBase(BaseModel):
    research_project_id: int
    lab_number: str
    title: str
    description: Optional[str] = None
    technology: Optional[str] = None
    status: str
    experiment_date: Optional[datetime] = None
    results_text: Optional[str] = None
    repository_url: Optional[str] = None
    display_order: int = 0

class ExperimentCreate(ExperimentBase):
    pass

class Experiment(ExperimentBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class CertificationBase(BaseModel):
    title: str
    provider: str
    date_obtained: datetime
    credential_id: Optional[str] = None
    verification_url: Optional[str] = None
    certificate_image_url: Optional[str] = None
    display_order: int = 0

class CertificationCreate(CertificationBase):
    pass

class Certification(CertificationBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class JourneyEntryBase(BaseModel):
    year: int
    title: str
    description: str
    category: str
    display_order: int = 0

class JourneyEntryCreate(JourneyEntryBase):
    pass

class JourneyEntry(JourneyEntryBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class TechnologyBase(BaseModel):
    name: str
    icon_class: Optional[str] = None
    category: str
    proficiency_level: str
    display_order: int = 0

class TechnologyCreate(TechnologyBase):
    pass

class Technology(TechnologyBase):
    id: int

    class Config:
        from_attributes = True

class CurrentStatusBase(BaseModel):
    category: str
    description: str
    display_order: int = 0

class CurrentStatusCreate(CurrentStatusBase):
    pass

class CurrentStatus(CurrentStatusBase):
    id: int
    updated_at: datetime

    class Config:
        from_attributes = True

class ExternalLinkBase(BaseModel):
    platform: str
    url: str
    username: Optional[str] = None
    display_order: int = 0

class ExternalLink(ExternalLinkBase):
    id: int

    class Config:
        from_attributes = True
