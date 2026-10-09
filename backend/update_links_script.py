import os
from sqlalchemy.orm import Session
from database import SessionLocal
import models

def update_links():
    db = SessionLocal()
    
    # Define new links data
    new_links_data = [
        {"platform": "GitHub", "url": "https://github.com/dansenga", "username": "dansenga", "display_order": 1},
        {"platform": "LinkedIn", "url": "https://www.linkedin.com/in/dan-senga-099569376", "username": "dan-senga", "display_order": 2},
        {"platform": "X", "url": "https://x.com/dan_senga7", "username": "dan_senga7", "display_order": 3},
        {"platform": "Kaggle", "url": "https://www.kaggle.com/dansenga", "username": "dansenga", "display_order": 4},
        {"platform": "Email", "url": "mailto:dansenga455@gmail.com", "display_order": 5},
        {"platform": "Medium", "url": "https://medium.com/", "display_order": 6}
    ]
    
    # Delete all existing links
    db.query(models.ExternalLink).delete()
    
    # Insert new links
    for link_data in new_links_data:
        link = models.ExternalLink(**link_data)
        db.add(link)
        
    db.commit()
    db.close()
    print("Links updated successfully!")

if __name__ == "__main__":
    update_links()
