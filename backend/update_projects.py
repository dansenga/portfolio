import os
from sqlalchemy.orm import Session

import models
from database import engine, SessionLocal

def update_projects():
    db = SessionLocal()
    
    medatlas = db.query(models.Project).filter_by(slug="medatlas").first()
    if medatlas:
        medatlas.problem = "Medical professionals in developing regions often lack immediate access to updated research, while patients struggle to find reliable information tailored to their specific localized contexts."
        medatlas.idea = "Create an AI-powered semantic search engine and diagnostic assistant that aggregates verified medical literature and presents it through a conversational interface, specifically optimized for low-bandwidth environments."
        medatlas.solution = "We built MedAtlas, a platform featuring a Retrieval-Augmented Generation (RAG) pipeline connected to PubMed and local health guidelines. It offers offline-first mobile access and real-time medical translation."
        medatlas.architecture = "The backend is powered by FastAPI and PostgreSQL with pgvector for embeddings. We use a distilled LLaMA model fine-tuned on medical texts for the generation step. The frontend is built with React Native."
        medatlas.challenges = "Handling the extreme latency of mobile networks in remote areas. Ensuring the AI's hallucinations were reduced to near zero was critical for medical safety."
        medatlas.decisions = "We decided to implement a strict 'citation-only' rule for the LLM. If the answer cannot be found in the retrieved vector context, the model is forced to reply 'Insufficient verified data' rather than guess."
        medatlas.results = "MedAtlas is currently in beta testing with 4 clinics in rural DRC, reducing information retrieval time for clinicians from an average of 15 minutes to under 30 seconds."
        medatlas.lessons = "Building for low-resource environments requires rethinking modern web architecture. Sometimes, sending less data is more important than sending rich data."
        medatlas.technologies = ["Python", "FastAPI", "React", "PostgreSQL", "pgvector", "LLaMA"]
        medatlas.github_url = "https://github.com/dansenga/medatlas"
        medatlas.live_url = "https://medatlas.example.com"
        medatlas.docs_url = "https://docs.medatlas.example.com"

    cancer = db.query(models.Project).filter_by(slug="cancer-detection-cnn").first()
    if cancer:
        cancer.problem = "Early detection of breast cancer via mammography is highly dependent on the radiologist's experience. In regions with a shortage of specialists, early signs are often missed."
        cancer.idea = "Develop a deep learning model capable of highlighting suspicious microcalcifications and masses to act as a 'second opinion' for overworked radiologists."
        cancer.solution = "A Convolutional Neural Network (CNN) based on the ResNet50 architecture, fine-tuned on the CBIS-DDSM dataset, with a web interface for doctors to upload DICOM files for instant analysis."
        cancer.architecture = "Model trained using TensorFlow/Keras. The inference server is a Flask API wrapped in Docker. The UI is a lightweight Vue.js dashboard."
        cancer.challenges = "Medical images are massive, and dealing with DICOM formats required specialized preprocessing pipelines. Data imbalance (many more healthy scans than cancerous ones) led to initial false negatives."
        cancer.decisions = "We employed aggressive data augmentation (rotations, flips, contrast shifts) and focal loss to force the model to pay more attention to the rare positive cases."
        cancer.results = "Achieved an AUC of 0.89 on the test set. The model is currently being evaluated in a retrospective clinical study."
        cancer.lessons = "Data quality trumps model complexity. Spending 80% of our time cleaning the CBIS-DDSM dataset yielded better results than simply switching to a larger neural network."
        cancer.technologies = ["Python", "TensorFlow", "Keras", "Flask", "Docker", "Vue.js"]
        cancer.github_url = "https://github.com/dansenga/cancer-cnn"

    db.commit()
    db.close()
    print("Updated 2 projects with full details.")

if __name__ == "__main__":
    update_projects()
