from datetime import datetime, date
from sqlalchemy import (
    Column,
    String,
    Integer,
    Boolean,
    Text,
    Date,
    DateTime,
    JSON,
    ForeignKey
)
from sqlalchemy.sql import func
from database import Base

class UserProfile(Base):
    """
    User pregnancy profile table corresponding to db["profile"]
    """
    __tablename__ = "user_profiles"

    id = Column(String(64), primary_key=True, index=True)
    name = Column(String(128), nullable=False)
    age = Column(Integer, nullable=True)
    phone = Column(String(32), nullable=True)
    language = Column(String(16), default="hi")
    stage = Column(String(64), default="I am pregnant")
    lmp_date = Column(String(32), nullable=True)
    edd_date = Column(String(32), nullable=True)
    estimated_week = Column(Integer, default=12)
    estimated_days = Column(Integer, default=3)
    trimester = Column(String(16), default="T1")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())


class DailyCheckin(Base):
    """
    Daily self-reported health check-in table corresponding to db["checkins"]
    """
    __tablename__ = "daily_checkins"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("user_profiles.id"), default="usr-01", index=True)
    date = Column(String(32), nullable=False, index=True)
    feeling = Column(String(64), default="good")
    symptoms = Column(JSON, default=list)
    water_glasses = Column(Integer, default=5)
    kicks_count = Column(Integer, default=0)
    mood = Column(String(64), default="calm")
    missed_barrier = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class MedicalRecord(Base):
    """
    Uploaded medical reports & OCR analysis corresponding to db["records"]
    """
    __tablename__ = "medical_records"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("user_profiles.id"), default="usr-01", index=True)
    file_name = Column(String(255), nullable=False)
    date = Column(String(64), nullable=False)
    record_type = Column(String(32), nullable=False)  # 'pdf' or 'img'
    extracted_text = Column(Text, nullable=True)
    suggested_reminder = Column(JSON, nullable=True)
    confirmed = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Reminder(Base):
    """
    Smart reminders corresponding to db["reminders"]
    """
    __tablename__ = "reminders"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("user_profiles.id"), default="usr-01", index=True)
    title = Column(String(255), nullable=False)
    detail = Column(Text, nullable=True)
    time = Column(String(32), nullable=False)
    category = Column(String(64), default="medicine")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class KickSession(Base):
    """
    Fetal movement & kick counter sessions corresponding to /api/kicks
    """
    __tablename__ = "kick_sessions"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("user_profiles.id"), default="usr-01", index=True)
    kicks = Column(Integer, nullable=False)
    duration_minutes = Column(Integer, nullable=False)
    notes = Column(Text, nullable=True)
    session_date = Column(String(32), default=lambda: str(date.today()), index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class DailyFoodRecord(Base):
    """
    Daily individual meal and snack logging corresponding to /api/food/records
    """
    __tablename__ = "daily_food_records"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("user_profiles.id"), default="usr-01", index=True)
    date = Column(String(32), nullable=False, index=True)
    meal_type = Column(String(32), nullable=False)  # 'breakfast', 'lunch', 'dinner', 'snack'
    food_name = Column(String(255), nullable=False)
    portion = Column(String(128), nullable=True)
    meal_time = Column(String(32), nullable=True)
    completed = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class DailyHealthLog(Base):
    """
    Non-diagnostic daily health questionnaire corresponding to /api/health-status
    """
    __tablename__ = "daily_health_logs"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("user_profiles.id"), default="usr-01", index=True)
    date = Column(String(32), nullable=False, index=True)
    feeling = Column(String(64), default="good")
    sleep_quality = Column(String(64), default="good")
    symptoms = Column(JSON, default=list)
    water_glasses = Column(Integer, default=5)
    medicines_taken = Column(String(32), default="yes")  # 'yes', 'no', 'partial', 'na'
    activity_completed = Column(String(32), default="yes")  # 'yes', 'no', 'na'
    meals_eaten = Column(String(32), default="yes")  # 'yes', 'no', 'partial'
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())


class DailyNeedsChecklist(Base):
    """
    Daily essential needs questionnaire checklist corresponding to /api/daily-needs
    """
    __tablename__ = "daily_needs_checklists"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("user_profiles.id"), default="usr-01", index=True)
    date = Column(String(32), nullable=False, index=True)
    items = Column(JSON, default=dict)
    completed_count = Column(Integer, default=0)
    applicable_count = Column(Integer, default=0)
    progress_percent = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())


class DailyActivityStep(Base):
    """
    Manual daily walking step counter and personalized goal corresponding to /api/activity/steps
    """
    __tablename__ = "daily_activity_steps"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("user_profiles.id"), default="usr-01", index=True)
    date = Column(String(32), nullable=False, index=True)
    step_count = Column(Integer, default=0)
    step_goal = Column(Integer, default=4000)
    distance_km = Column(String(32), default="0.0")
    active_minutes = Column(Integer, default=0)
    source = Column(String(32), default="manual")
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())
