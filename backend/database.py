import os
from pathlib import Path
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Locate and load the backend .env file safely
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError(
        "DATABASE_URL is not set in backend/.env. "
        "Please configure your PostgreSQL connection string in backend/.env."
    )

# Standardize dialect to psycopg (Psycopg 3) if postgresql:// is provided
if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg://", 1)

# Create the SQLAlchemy Engine
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,      # Tests connection liveness before checking it out
    pool_size=10,
    max_overflow=20,
    echo=False
)

# Thread-local sessionmaker
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Declarative Base for models
Base = declarative_base()

def get_db():
    """
    FastAPI dependency yielding a safe database session per request.
    Closes the session cleanly upon request completion.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
