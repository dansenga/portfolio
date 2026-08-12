import os
from sqlalchemy.orm import Session
from datetime import datetime

import models
from database import engine, SessionLocal

def add_journey():
    db = SessionLocal()
    
    # Check if entry already exists to avoid duplicates if run multiple times
    existing = db.query(models.JourneyEntry).filter_by(year=2023, title="BSc Software Engineering").first()
    
    if not existing:
        new_entry = models.JourneyEntry(
            year=2023,
            title="BSc Software Engineering",
            description="Started my Bachelor's degree in Computer Science (Software Engineering) at the Université Protestante de Lubumbashi.",
            category="education",
            display_order=2
        )
        db.add(new_entry)
        db.commit()
        print("Successfully added 2023 Journey entry.")
    else:
        print("Entry already exists.")
        
    db.close()

if __name__ == "__main__":
    add_journey()
