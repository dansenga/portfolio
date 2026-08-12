import os
from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, Security, Query
from fastapi.security.api_key import APIKeyHeader
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import models, schemas, crud
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Dan Senga Portfolio API")

# Setup CORS
origins = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Key security
API_KEY_NAME = "X-API-Key"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

async def get_api_key(api_key_header: str = Security(api_key_header)):
    if api_key_header == os.getenv("PORTFOLIO_API_KEY", "dev-secret-key-change-in-production"):
        return api_key_header
    raise HTTPException(status_code=403, detail="Could not validate credentials")

# Routes

# --- Projects ---
@app.get("/api/projects", response_model=List[schemas.Project])
def read_projects(featured: Optional[bool] = None, category: Optional[str] = None, db: Session = Depends(get_db)):
    return crud.get_projects(db, featured=featured, category=category)

@app.get("/api/projects/{slug}", response_model=schemas.Project)
def read_project(slug: str, db: Session = Depends(get_db)):
    project = crud.get_project_by_slug(db, slug=slug)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@app.post("/api/projects", response_model=schemas.Project, dependencies=[Depends(get_api_key)])
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    return crud.create_project(db=db, project=project)

@app.put("/api/projects/{id}", response_model=schemas.Project, dependencies=[Depends(get_api_key)])
def update_project(id: int, project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    updated_project = crud.update_project(db=db, project_id=id, project=project)
    if updated_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return updated_project

@app.delete("/api/projects/{id}", dependencies=[Depends(get_api_key)])
def delete_project(id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_project(db=db, project_id=id)
    if deleted is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"status": "success"}

# --- Articles ---
@app.get("/api/articles", response_model=List[schemas.Article])
def read_articles(category: Optional[str] = None, featured: Optional[bool] = None, published: Optional[bool] = None, db: Session = Depends(get_db)):
    return crud.get_articles(db, category=category, featured=featured, published=published)

@app.get("/api/articles/{slug}", response_model=schemas.Article)
def read_article(slug: str, db: Session = Depends(get_db)):
    article = crud.get_article_by_slug(db, slug=slug)
    if article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    return article

@app.post("/api/articles", response_model=schemas.Article, dependencies=[Depends(get_api_key)])
def create_article(article: schemas.ArticleCreate, db: Session = Depends(get_db)):
    return crud.create_article(db=db, article=article)

@app.put("/api/articles/{id}", response_model=schemas.Article, dependencies=[Depends(get_api_key)])
def update_article(id: int, article: schemas.ArticleCreate, db: Session = Depends(get_db)):
    updated_article = crud.update_article(db=db, article_id=id, article=article)
    if updated_article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    return updated_article

@app.delete("/api/articles/{id}", dependencies=[Depends(get_api_key)])
def delete_article(id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_article(db=db, article_id=id)
    if deleted is None:
        raise HTTPException(status_code=404, detail="Article not found")
    return {"status": "success"}

# --- Research ---
@app.get("/api/research", response_model=List[schemas.ResearchProject])
def read_research_projects(db: Session = Depends(get_db)):
    return crud.get_research_projects(db)

@app.get("/api/research/{slug}", response_model=schemas.ResearchProject)
def read_research_project(slug: str, db: Session = Depends(get_db)):
    research = crud.get_research_project_by_slug(db, slug=slug)
    if research is None:
        raise HTTPException(status_code=404, detail="Research project not found")
    return research

@app.post("/api/research", response_model=schemas.ResearchProject, dependencies=[Depends(get_api_key)])
def create_research_project(research: schemas.ResearchProjectCreate, db: Session = Depends(get_db)):
    return crud.create_research_project(db=db, research=research)

@app.put("/api/research/{id}", response_model=schemas.ResearchProject, dependencies=[Depends(get_api_key)])
def update_research_project(id: int, research: schemas.ResearchProjectCreate, db: Session = Depends(get_db)):
    updated_research = crud.update_research_project(db=db, research_id=id, research=research)
    if updated_research is None:
        raise HTTPException(status_code=404, detail="Research project not found")
    return updated_research

# --- Experiments ---
@app.get("/api/experiments", response_model=List[schemas.Experiment])
def read_experiments(research_project_id: Optional[int] = None, db: Session = Depends(get_db)):
    return crud.get_experiments(db, research_project_id=research_project_id)

@app.post("/api/experiments", response_model=schemas.Experiment, dependencies=[Depends(get_api_key)])
def create_experiment(experiment: schemas.ExperimentCreate, db: Session = Depends(get_db)):
    return crud.create_experiment(db=db, experiment=experiment)

# --- Certifications ---
@app.get("/api/certifications", response_model=List[schemas.Certification])
def read_certifications(db: Session = Depends(get_db)):
    return crud.get_certifications(db)

@app.post("/api/certifications", response_model=schemas.Certification, dependencies=[Depends(get_api_key)])
def create_certification(cert: schemas.CertificationCreate, db: Session = Depends(get_db)):
    return crud.create_certification(db=db, cert=cert)

@app.put("/api/certifications/{id}", response_model=schemas.Certification, dependencies=[Depends(get_api_key)])
def update_certification(id: int, cert: schemas.CertificationCreate, db: Session = Depends(get_db)):
    updated_cert = crud.update_certification(db=db, cert_id=id, cert=cert)
    if updated_cert is None:
        raise HTTPException(status_code=404, detail="Certification not found")
    return updated_cert

@app.delete("/api/certifications/{id}", dependencies=[Depends(get_api_key)])
def delete_certification(id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_certification(db=db, cert_id=id)
    if deleted is None:
        raise HTTPException(status_code=404, detail="Certification not found")
    return {"status": "success"}

# --- Journey ---
@app.get("/api/journey", response_model=List[schemas.JourneyEntry])
def read_journey(db: Session = Depends(get_db)):
    return crud.get_journey_entries(db)

@app.post("/api/journey", response_model=schemas.JourneyEntry, dependencies=[Depends(get_api_key)])
def create_journey_entry(entry: schemas.JourneyEntryCreate, db: Session = Depends(get_db)):
    return crud.create_journey_entry(db=db, entry=entry)

@app.put("/api/journey/{id}", response_model=schemas.JourneyEntry, dependencies=[Depends(get_api_key)])
def update_journey_entry(id: int, entry: schemas.JourneyEntryCreate, db: Session = Depends(get_db)):
    updated = crud.update_journey_entry(db=db, entry_id=id, entry=entry)
    if updated is None:
        raise HTTPException(status_code=404, detail="Entry not found")
    return updated

# --- Technologies ---
@app.get("/api/technologies", response_model=List[schemas.Technology])
def read_technologies(db: Session = Depends(get_db)):
    return crud.get_technologies(db)

@app.post("/api/technologies", response_model=schemas.Technology, dependencies=[Depends(get_api_key)])
def create_technology(tech: schemas.TechnologyCreate, db: Session = Depends(get_db)):
    return crud.create_technology(db=db, tech=tech)

# --- Currently ---
@app.get("/api/currently", response_model=List[schemas.CurrentStatus])
def read_currently(db: Session = Depends(get_db)):
    return crud.get_current_status(db)

@app.put("/api/currently", response_model=List[schemas.CurrentStatus], dependencies=[Depends(get_api_key)])
def update_currently(statuses: List[schemas.CurrentStatusCreate], db: Session = Depends(get_db)):
    return crud.update_current_status(db=db, statuses=statuses)

# --- Links ---
@app.get("/api/links", response_model=List[schemas.ExternalLink])
def read_links(db: Session = Depends(get_db)):
    return crud.get_links(db)

# --- Activity ---
@app.get("/api/activity")
def read_activity(db: Session = Depends(get_db)):
    return crud.get_activity_snapshot(db)

# --- Search ---
@app.get("/api/search")
def search(q: str = Query(..., min_length=1), db: Session = Depends(get_db)):
    return crud.search_all(db, query=q)

