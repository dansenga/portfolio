import os
from sqlalchemy.orm import Session
from datetime import datetime

import models
from database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

def seed_db():
    db = SessionLocal()
    
    # 1. Projects
    if db.query(models.Project).count() == 0:
        projects = [
            models.Project(
                title="MedAtlas",
                slug="medatlas",
                category="AI",
                short_description="AI-powered healthcare platform",
                full_description="An AI-powered healthcare platform that aims to make medical knowledge accessible.",
                technologies=["Python", "AI", "Healthcare"],
                status="in-progress",
                featured=True,
                year=2024,
                display_order=1
            ),
            models.Project(
                title="Cancer Detection CNN",
                slug="cancer-detection-cnn",
                category="Research",
                short_description="Medical imaging research using mammography",
                full_description="Deep learning models applied to mammography images for early cancer detection.",
                technologies=["Python", "TensorFlow", "CNN"],
                status="research",
                featured=True,
                year=2023,
                display_order=2
            ),
            models.Project(
                title="TZ Pharma",
                slug="tz-pharma",
                category="Software Engineering",
                short_description="Pharmacy management system",
                full_description="A comprehensive management system for pharmacies in TZ.",
                technologies=["PHP", "Laravel", "MySQL"],
                status="completed",
                featured=True,
                year=2022,
                display_order=3
            ),
            models.Project(
                title="Life Gamification Platform",
                slug="life-gamification-platform",
                category="Software Engineering",
                short_description="Personal development gamification app",
                full_description="A platform to gamify personal development tasks.",
                technologies=["Python", "Django"],
                status="in-progress",
                featured=False,
                year=2024,
                display_order=4
            )
        ]
        db.add_all(projects)

    # 2. Research Projects
    if db.query(models.ResearchProject).count() == 0:
        research = [
            models.ResearchProject(
                title="AI-based early cancer detection from mammography images",
                slug="ai-cancer-detection",
                description="Exploring the use of CNNs for early cancer detection.",
                dataset="CBIS-DDSM dataset",
                models="CNN",
                status="active",
                year=2023,
                display_order=1
            )
        ]
        db.add_all(research)

    # 3. Current Status
    if db.query(models.CurrentStatus).count() == 0:
        statuses = [
            models.CurrentStatus(category="building", description="AI-powered healthcare and software projects", display_order=1),
            models.CurrentStatus(category="learning", description="Advanced Software Engineering", display_order=2),
            models.CurrentStatus(category="exploring", description="Artificial Intelligence and Machine Learning", display_order=3),
            models.CurrentStatus(category="researching", description="Medical image analysis and healthcare AI", display_order=4),
            models.CurrentStatus(category="writing", description="Technology, AI, Healthcare, History, Faith and Ideas", display_order=5),
            models.CurrentStatus(category="preparing", description="International academic and professional opportunities", display_order=6)
        ]
        db.add_all(statuses)
        
    # 4. Technologies
    if db.query(models.Technology).count() == 0:
        tech_list = ["Python", "PHP", "Laravel", "Django", "JavaScript", "HTML", "CSS", "MySQL", "SQL", "Git", "GitHub", "Docker", "TensorFlow", "Machine Learning", "Deep Learning"]
        technologies = [
            models.Technology(name=t, category="general", proficiency_level="intermediate", display_order=i)
            for i, t in enumerate(tech_list)
        ]
        db.add_all(technologies)
        
    # 5. External Links
    if db.query(models.ExternalLink).count() == 0:
        links = [
            models.ExternalLink(platform="GitHub", url="https://github.com/dansenga", username="dansenga", display_order=1),
            models.ExternalLink(platform="LinkedIn", url="https://linkedin.com/", display_order=2),
            models.ExternalLink(platform="Medium", url="https://medium.com/", display_order=3),
            models.ExternalLink(platform="Kaggle", url="https://www.kaggle.com/dansenga", username="dansenga", display_order=4),
            models.ExternalLink(platform="Email", url="mailto:dan@example.com", display_order=5)
        ]
        db.add_all(links)

    # 6. Certifications
    if db.query(models.Certification).count() == 0:
        certs = [
            models.Certification(title="Python for Data Science", provider="Coursera", date_obtained=datetime(2023, 1, 1), display_order=1)
        ]
        db.add_all(certs)
        
    # 7. Categories
    if db.query(models.Category).count() == 0:
        cats = [
            models.Category(name="Technology", slug="technology", type="writing"),
            models.Category(name="Software Engineering", slug="software-engineering", type="writing"),
            models.Category(name="AI", slug="ai", type="writing"),
            models.Category(name="Healthcare", slug="healthcare", type="writing"),
            models.Category(name="History", slug="history", type="writing"),
            models.Category(name="Faith", slug="faith", type="writing"),
            models.Category(name="Ideas", slug="ideas", type="writing"),
            models.Category(name="Learning", slug="learning", type="writing"),
            models.Category(name="Personal Development", slug="personal-development", type="writing")
        ]
        db.add_all(cats)
        
    # 8. Journey Entries
    if db.query(models.JourneyEntry).count() == 0:
        entries = [
            models.JourneyEntry(year=2024, title="Started MedAtlas", description="Began development of AI healthcare platform", category="project", display_order=1)
        ]
        db.add_all(entries)

    db.commit()
    db.close()
    print("Database seeded successfully.")

if __name__ == "__main__":
    seed_db()
