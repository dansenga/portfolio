from sqlalchemy import Column, Integer, String, Boolean, Text, JSON, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    slug = Column(String, unique=True, index=True)
    category = Column(String)
    short_description = Column(String)
    full_description = Column(Text)
    problem = Column(Text, nullable=True)
    idea = Column(Text, nullable=True)
    solution = Column(Text, nullable=True)
    architecture = Column(Text, nullable=True)
    challenges = Column(Text, nullable=True)
    decisions = Column(Text, nullable=True)
    results = Column(Text, nullable=True)
    lessons = Column(Text, nullable=True)
    technologies = Column(JSON, nullable=True)
    github_url = Column(String, nullable=True)
    live_url = Column(String, nullable=True)
    docs_url = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    status = Column(String) # active/archived/in-progress
    featured = Column(Boolean, default=False)
    year = Column(Integer)
    display_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Article(Base):
    __tablename__ = "articles"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    slug = Column(String, unique=True, index=True)
    subtitle = Column(String, nullable=True)
    category = Column(String)
    content = Column(Text)
    excerpt = Column(Text)
    reading_time_min = Column(Integer)
    cover_url = Column(String, nullable=True)
    published = Column(Boolean, default=False)
    featured = Column(Boolean, default=False)
    external_url = Column(String, nullable=True)
    medium_url = Column(String, nullable=True)
    linkedin_url = Column(String, nullable=True)
    tags = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Category(Base):
    __tablename__ = "categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    slug = Column(String, unique=True, index=True)
    type = Column(String) # writing/project/research
    display_order = Column(Integer, default=0)

class ResearchProject(Base):
    __tablename__ = "research_projects"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    slug = Column(String, unique=True, index=True)
    description = Column(Text)
    question = Column(Text, nullable=True)
    motivation = Column(Text, nullable=True)
    dataset = Column(Text, nullable=True)
    methodology = Column(Text, nullable=True)
    preprocessing = Column(Text, nullable=True)
    models = Column(Text, nullable=True)
    experiments = Column(Text, nullable=True)
    results_text = Column(Text, nullable=True)
    visualizations = Column(JSON, nullable=True)
    papers = Column(JSON, nullable=True)
    references = Column(JSON, nullable=True)
    future_work = Column(Text, nullable=True)
    technologies = Column(JSON, nullable=True)
    status = Column(String)
    github_url = Column(String, nullable=True)
    year = Column(Integer)
    display_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Experiment(Base):
    __tablename__ = "experiments"
    
    id = Column(Integer, primary_key=True, index=True)
    research_project_id = Column(Integer, ForeignKey("research_projects.id"))
    lab_number = Column(String)
    title = Column(String)
    description = Column(Text, nullable=True)
    technology = Column(String, nullable=True)
    status = Column(String)
    experiment_date = Column(DateTime, nullable=True)
    results_text = Column(Text, nullable=True)
    repository_url = Column(String, nullable=True)
    display_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    
class Certification(Base):
    __tablename__ = "certifications"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    provider = Column(String)
    date_obtained = Column(DateTime)
    credential_id = Column(String, nullable=True)
    verification_url = Column(String, nullable=True)
    certificate_image_url = Column(String, nullable=True)
    display_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

class JourneyEntry(Base):
    __tablename__ = "journey_entries"
    
    id = Column(Integer, primary_key=True, index=True)
    year = Column(Integer)
    title = Column(String)
    description = Column(Text)
    category = Column(String) # education/project/internship/research/certification/milestone
    display_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

class Technology(Base):
    __tablename__ = "technologies"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    icon_class = Column(String, nullable=True)
    category = Column(String) # software-engineering/ai-data/backend/databases/devops
    proficiency_level = Column(String) # learning/intermediate/advanced
    display_order = Column(Integer, default=0)

class ExternalLink(Base):
    __tablename__ = "external_links"
    
    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String)
    url = Column(String)
    username = Column(String, nullable=True)
    display_order = Column(Integer, default=0)

class CurrentStatus(Base):
    __tablename__ = "current_status"
    
    id = Column(Integer, primary_key=True, index=True)
    category = Column(String) # building/learning/exploring/researching/writing/preparing
    description = Column(String)
    display_order = Column(Integer, default=0)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class SocialProfile(Base):
    __tablename__ = "social_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String)
    url = Column(String)
    username = Column(String, nullable=True)
    icon = Column(String, nullable=True)
    display_order = Column(Integer, default=0)
