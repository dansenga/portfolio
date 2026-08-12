import os
from sqlalchemy.orm import Session
from datetime import datetime

import models
from database import engine, SessionLocal

def add_content():
    db = SessionLocal()
    
    # 1. Add 2 complete Articles
    if db.query(models.Article).count() == 0:
        articles = [
            models.Article(
                title="The Future of AI in Healthcare Diagnostics",
                slug="future-ai-healthcare-diagnostics",
                category="Healthcare",
                excerpt="How deep learning models are revolutionizing the way we detect diseases early, and what it means for the medical field.",
                content="""# The Future of AI in Healthcare Diagnostics

Artificial intelligence is rapidly transforming the healthcare landscape. In recent years, we've seen incredible advancements in computer vision and natural language processing that are directly applicable to medical diagnostics.

## The Role of Deep Learning

Deep learning models, particularly Convolutional Neural Networks (CNNs), have proven exceptionally good at identifying patterns in medical images. For instance, in mammography, CNNs can highlight microcalcifications that might be invisible to the naked human eye. 

### Key Benefits
1. **Speed**: AI can process thousands of images in a fraction of the time it takes a human.
2. **Consistency**: Unlike humans, algorithms don't experience fatigue, ensuring consistent evaluations regardless of the time of day.
3. **Early Detection**: By catching anomalies earlier, we can significantly improve patient outcomes.

## Challenges Ahead

Despite the promise, there are hurdles to widespread adoption. Data privacy, algorithm bias, and the need for massive labeled datasets remain significant challenges. Furthermore, integrating these tools into existing clinical workflows requires careful planning and collaboration between software engineers and medical professionals.

In conclusion, while AI will not replace doctors, doctors who use AI will replace those who don't. The future is a synergistic relationship between human expertise and machine intelligence.""",
                published=True,
                featured=True,
                created_at=datetime(2025, 5, 12),
                reading_time_min=4
            ),
            models.Article(
                title="Building Scalable Systems with FastAPI and React",
                slug="building-scalable-systems-fastapi-react",
                category="Software Engineering",
                excerpt="A deep dive into creating robust, decoupled architectures using modern web technologies.",
                content="""# Building Scalable Systems with FastAPI and React

When designing modern web applications, the choice of stack can make or break your development velocity and application performance. In this article, I explore the powerful combination of FastAPI for the backend and React for the frontend.

## Why FastAPI?

FastAPI has emerged as one of the most popular Python frameworks for building APIs, and for good reason:
- **Performance**: Built on Starlette and Pydantic, it's one of the fastest Python frameworks available.
- **Developer Experience**: Automatic interactive API documentation (Swagger UI) out of the box.
- **Type Checking**: Leverages Python type hints to validate data and reduce bugs.

## React in 2026

React continues to dominate the frontend ecosystem. With the maturation of server components and concurrent rendering, building highly interactive and performant user interfaces is easier than ever. 

### The Decoupled Architecture

By decoupling the frontend and backend, we achieve several benefits:
1. **Independent Scaling**: The API can be scaled horizontally without affecting the frontend delivery.
2. **Specialized Teams**: Frontend engineers can focus on the UI/UX while backend engineers focus on business logic and database optimization.
3. **Technology Flexibility**: It's easier to swap out one side of the stack if needed in the future.

Ultimately, combining FastAPI's speed and developer experience with React's component-based UI approach yields a robust, scalable architecture suitable for projects of any size.""",
                published=True,
                featured=True,
                created_at=datetime(2025, 8, 24),
                reading_time_min=6
            )
        ]
        db.add_all(articles)

    db.commit()
    db.close()
    print("Added 2 complete articles.")

if __name__ == "__main__":
    add_content()
