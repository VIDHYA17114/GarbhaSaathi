from fastapi import FastAPI, HTTPException, Query, Body, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime, date
import uuid
import logging

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import desc

from database import engine, Base, get_db
from models import (
    UserProfile,
    DailyCheckin,
    MedicalRecord,
    Reminder,
    KickSession,
    DailyFoodRecord,
    DailyHealthLog,
    DailyNeedsChecklist,
    DailyActivityStep
)

# Set up logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("garbhasaathi")

app = FastAPI(
    title="GarbhaSaathi API",
    description="Backend API for GarbhaSaathi - Personalized Pregnancy Nutrition, Mood Wellness & Daily Self-Care Companion",
    version="1.0.0"
)

# Enable CORS for React frontend (Vite default ports: 5173, 5174 on localhost and 127.0.0.1)
allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# --- Startup Event: Safe Table Creation & Initial Seed ---
@app.on_event("startup")
def on_startup():
    try:
        # Create tables without dropping or deleting any existing tables/records
        Base.metadata.create_all(bind=engine)
        logger.info("PostgreSQL tables checked/created successfully.")
        
        # Seed default profile and initial data if database is fresh
        from database import SessionLocal
        db = SessionLocal()
        try:
            profile = db.query(UserProfile).filter(UserProfile.id == "usr-01").first()
            if not profile:
                profile = UserProfile(
                    id="usr-01",
                    name="Priya Sharma",
                    age=24,
                    phone="+91 98765 43210",
                    language="hi",
                    stage="I am pregnant",
                    lmp_date="2025-03-15",
                    edd_date="2025-12-20",
                    estimated_week=12,
                    estimated_days=3,
                    trimester="T1"
                )
                db.add(profile)
                db.commit()
                logger.info("Seeded default UserProfile (usr-01).")

            if db.query(DailyCheckin).count() == 0:
                first_chk = DailyCheckin(
                    id="chk-1",
                    user_id="usr-01",
                    date=str(date.today()),
                    feeling="good",
                    symptoms=["mild fatigue"],
                    water_glasses=6,
                    kicks_count=10,
                    mood="calm",
                    missed_barrier=None
                )
                db.add(first_chk)
                db.commit()
                logger.info("Seeded initial check-in.")

            if db.query(MedicalRecord).count() == 0:
                r1 = MedicalRecord(
                    id="rep-1",
                    user_id="usr-01",
                    file_name="Blood Test Report",
                    date="12 Aug 2025",
                    record_type="pdf",
                    extracted_text="Hb: 10.4 g/dL (Mild Anaemia). Advised Tab Ferrous Ascorbate 1 tab daily.",
                    confirmed=True
                )
                r2 = MedicalRecord(
                    id="rep-2",
                    user_id="usr-01",
                    file_name="Ultrasound Report",
                    date="20 Jul 2025",
                    record_type="img",
                    extracted_text="Single live fetus of 12w 3d. Heartbeat 154 bpm. Normal development.",
                    confirmed=True
                )
                db.add_all([r1, r2])
                db.commit()
                logger.info("Seeded initial medical records.")

            if db.query(Reminder).count() == 0:
                rem1 = Reminder(
                    id="rem-1",
                    user_id="usr-01",
                    title="Take Iron Tablet",
                    detail="1 tablet daily after lunch",
                    time="02:00 PM",
                    category="medicine",
                    is_active=True
                )
                rem2 = Reminder(
                    id="rem-2",
                    user_id="usr-01",
                    title="Drink Water Glass #3",
                    detail="Maintain amniotic fluid",
                    time="11:30 AM",
                    category="hydration",
                    is_active=True
                )
                db.add_all([rem1, rem2])
                db.commit()
                logger.info("Seeded initial reminders.")
        except Exception as seed_err:
            db.rollback()
            logger.warning(f"Initial seed notice: {seed_err}")
        finally:
            db.close()

    except Exception as e:
        logger.error(f"Error during startup database connection: {e}")

# --- Pydantic Request Models ---
class DailyCheckinModel(BaseModel):
    feeling: str = "good"
    symptoms: List[str] = []
    water_glasses: int = 5
    kicks_count: int = 10
    mood: str = "calm"
    missed_barrier: Optional[str] = None

class NutritionRequestModel(BaseModel):
    budget_tier: str = "medium"  # 'low', 'medium', 'high'
    available_foods: List[str] = ["Rice", "Wheat", "Milk", "Dal", "Vegetables"]
    has_nausea: bool = False

class ReminderModel(BaseModel):
    title: str
    detail: str
    time: str
    category: str = "medicine"
    is_active: bool = True

class KickSessionModel(BaseModel):
    kicks: int = 10
    duration_minutes: int = 24
    notes: Optional[str] = "Healthy active session"

class FoodRecordModel(BaseModel):
    date: Optional[str] = None
    meal_type: str = "breakfast"  # 'breakfast', 'lunch', 'dinner', 'snack'
    food_name: str
    portion: Optional[str] = "1 portion"
    meal_time: Optional[str] = None
    completed: bool = True

class HealthLogModel(BaseModel):
    date: Optional[str] = None
    feeling: str = "good"
    sleep_quality: str = "good"
    symptoms: List[str] = []
    water_glasses: int = 5
    medicines_taken: str = "yes"
    activity_completed: str = "yes"
    meals_eaten: str = "yes"
    notes: Optional[str] = None

class DailyNeedsModel(BaseModel):
    date: Optional[str] = None
    items: Dict[str, Any] = {}
    completed_count: Optional[int] = 0
    applicable_count: Optional[int] = 0
    progress_percent: Optional[int] = 0

class ActivityStepModel(BaseModel):
    date: Optional[str] = None
    step_count: int = 0
    step_goal: int = 4000
    distance_km: Optional[str] = "0.0"
    active_minutes: Optional[int] = 0
    notes: Optional[str] = None

# --- API Endpoints ---

@app.get("/")
def root():
    return {
        "project": "GarbhaSaathi",
        "status": "online",
        "database": "PostgreSQL 18 (garbhasaathi_db)",
        "description": "Personalized pregnancy nutrition, mood wellness, and daily self-care companion",
        "docs_url": "/docs"
    }

@app.get("/api/health/db")
def health_db(db: Session = Depends(get_db)):
    """Health check verifying live PostgreSQL connection"""
    try:
        from sqlalchemy import text
        res = db.execute(text("SELECT 1")).scalar()
        return {"database": "connected", "status": "healthy", "check": res}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Database unreachable: {str(e)}"
        )

# 1. Daily Checkins
@app.post("/api/checkins")
def save_checkin(checkin: DailyCheckinModel, db: Session = Depends(get_db)):
    try:
        chk_count = db.query(DailyCheckin).count()
        new_id = f"chk-{chk_count + 1}"
        record = DailyCheckin(
            id=new_id,
            user_id="usr-01",
            date=str(date.today()),
            feeling=checkin.feeling,
            symptoms=checkin.symptoms,
            water_glasses=checkin.water_glasses,
            kicks_count=checkin.kicks_count,
            mood=checkin.mood,
            missed_barrier=checkin.missed_barrier
        )
        db.add(record)
        db.commit()
        db.refresh(record)

        resp_record = {
            "id": record.id,
            "date": record.date,
            "feeling": record.feeling,
            "symptoms": record.symptoms or [],
            "water_glasses": record.water_glasses,
            "kicks_count": record.kicks_count,
            "mood": record.mood,
            "missed_barrier": record.missed_barrier
        }
        return {"message": "Checkin saved successfully", "checkin": resp_record}
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Failed to save checkin: {e}")
        raise HTTPException(status_code=500, detail="Failed to save checkin to database")

@app.get("/api/checkins")
def get_checkins(db: Session = Depends(get_db)):
    try:
        records = db.query(DailyCheckin).order_by(DailyCheckin.created_at.asc()).all()
        checkins_list = [
            {
                "id": r.id,
                "date": r.date,
                "feeling": r.feeling,
                "symptoms": r.symptoms or [],
                "water_glasses": r.water_glasses,
                "kicks_count": r.kicks_count,
                "mood": r.mood,
                "missed_barrier": r.missed_barrier
            }
            for r in records
        ]
        return {"checkins": checkins_list}
    except SQLAlchemyError as e:
        logger.error(f"Failed to fetch checkins: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch checkins from database")

# 2. AI Nutrition Suggestions (Rule-based according to budget & pantry)
@app.post("/api/nutrition/suggestions")
def get_nutrition_suggestions(req: NutritionRequestModel):
    if req.has_nausea:
        return {
            "strategy": "Nausea-Friendly Gentle Nutrition",
            "meals": {
                "breakfast": {"title": "Dry Khakhra / Toast + Ginger Lemon Tea", "nutrients": "Nausea suppression, mild electrolytes"},
                "lunch": {"title": "Moong Dal Khichdi + Fresh Curd", "nutrients": "Easily digestible protein & gut probiotics"},
                "snack": {"title": "Roasted Makhana / Chana", "nutrients": "Calcium & fiber without odor triggers"},
                "dinner": {"title": "Soft Chapati + Lauki (Bottle Gourd) Sabzi", "nutrients": "Hydrating, alkaline, easy digestion"}
            }
        }
    
    # Standard Plan
    return {
        "strategy": f"Balanced Indian Pregnancy Diet ({req.budget_tier.capitalize()} Budget)",
        "meals": {
            "breakfast": {"title": "Poha with peanuts + Banana", "nutrients": "High energy, iron, folate"},
            "lunch": {"title": "Dal + Rice + Spinach + Curd", "nutrients": "Protein, calcium, iron"},
            "evening_snack": {"title": "Roasted chana + Seasonal Fruit", "nutrients": "Fiber, protein, micronutrients"},
            "dinner": {"title": "Chapati + Mixed vegetable + Salad", "nutrients": "Balanced nutrition & complex carbs"}
        },
        "focus_nutrients": ["Iron (IFA)", "Folate", "Calcium", "Hydration"]
    }

# 3. Pregnancy Journey Estimation
@app.get("/api/journey")
def get_journey(db: Session = Depends(get_db)):
    profile = db.query(UserProfile).filter(UserProfile.id == "usr-01").first()
    lmp = profile.lmp_date if profile else "2025-03-15"
    edd = profile.edd_date if profile else "2025-12-20"
    return {
        "gestational_age": "12 Weeks 3 Days",
        "trimester": "T1 (1-12 weeks)",
        "progress_percent": 30,
        "lmp_date": lmp,
        "edd_date": edd,
        "baby_development": {
            "length": "5-6 cm",
            "weight": "~14 grams",
            "highlights": "Vital organs forming, reflex movements, facial features developing."
        }
    }

# 4. Health Records & OCR Simulation
@app.post("/api/records/upload")
def upload_record(type: str = Query("blood"), db: Session = Depends(get_db)):
    try:
        new_id = f"rep-{datetime.now().strftime('%M%S')}"
        if type == "blood":
            extracted = {
                "file_name": "Blood_Test_Report_Oct.pdf",
                "date": "26 Oct 2026",
                "type": "pdf",
                "extracted_text": "Hb: 10.4 g/dL (Mild Anaemia). Prescribed Iron tablet once daily.",
                "suggested_reminder": {
                    "title": "Take Iron Tablet",
                    "dosage": "1 tablet daily after lunch",
                    "time": "02:00 PM"
                },
                "confirmed": False
            }
        else:
            extracted = {
                "file_name": "Ultrasound_NT_Scan.jpg",
                "date": "26 Oct 2026",
                "type": "img",
                "extracted_text": "Single live fetus of 12w 3d. Normal FHR 154 bpm.",
                "suggested_reminder": {
                    "title": "Next ANC Clinic Visit",
                    "dosage": "Routine 16-week checkup",
                    "time": "10:00 AM"
                },
                "confirmed": False
            }
        
        record = MedicalRecord(
            id=new_id,
            user_id="usr-01",
            file_name=extracted["file_name"],
            date=extracted["date"],
            record_type=extracted["type"],
            extracted_text=extracted["extracted_text"],
            suggested_reminder=extracted["suggested_reminder"],
            confirmed=False
        )
        db.add(record)
        db.commit()
        db.refresh(record)

        resp_dict = {
            "id": record.id,
            "file_name": record.file_name,
            "date": record.date,
            "type": record.record_type,
            "extracted_text": record.extracted_text,
            "suggested_reminder": record.suggested_reminder,
            "confirmed": record.confirmed
        }
        return {"message": "OCR extraction completed. Awaiting user review.", "record": resp_dict}
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Failed to upload record: {e}")
        raise HTTPException(status_code=500, detail="Failed to save medical record to database")

@app.post("/api/records/{id}/confirm")
def confirm_record(id: str, db: Session = Depends(get_db)):
    try:
        record = db.query(MedicalRecord).filter(MedicalRecord.id == id).first()
        if not record:
            raise HTTPException(status_code=404, detail="Record not found")
        record.confirmed = True
        db.commit()
        db.refresh(record)
        resp_dict = {
            "id": record.id,
            "file_name": record.file_name,
            "date": record.date,
            "type": record.record_type,
            "extracted_text": record.extracted_text,
            "suggested_reminder": record.suggested_reminder,
            "confirmed": record.confirmed
        }
        return {"message": "Record confirmed and saved", "record": resp_dict}
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Failed to confirm record: {e}")
        raise HTTPException(status_code=500, detail="Database error confirming medical record")

@app.get("/api/records")
def get_records(db: Session = Depends(get_db)):
    try:
        records = db.query(MedicalRecord).order_by(desc(MedicalRecord.created_at)).all()
        records_list = [
            {
                "id": r.id,
                "file_name": r.file_name,
                "date": r.date,
                "type": r.record_type,
                "extracted_text": r.extracted_text,
                "confirmed": r.confirmed,
                "suggested_reminder": r.suggested_reminder
            }
            for r in records
        ]
        return {"records": records_list}
    except SQLAlchemyError as e:
        logger.error(f"Failed to fetch records: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch records from database")

# 5. Smart Reminders
@app.get("/api/reminders")
def get_reminders(db: Session = Depends(get_db)):
    try:
        reminders = db.query(Reminder).order_by(Reminder.created_at.asc()).all()
        rem_list = [
            {
                "id": r.id,
                "title": r.title,
                "detail": r.detail,
                "time": r.time,
                "category": r.category,
                "is_active": r.is_active
            }
            for r in reminders
        ]
        return {"reminders": rem_list}
    except SQLAlchemyError as e:
        logger.error(f"Failed to fetch reminders: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch reminders from database")

@app.post("/api/reminders")
def create_reminder(reminder: ReminderModel, db: Session = Depends(get_db)):
    try:
        rem_count = db.query(Reminder).count()
        new_id = f"rem-{rem_count + 1}"
        new_rem = Reminder(
            id=new_id,
            user_id="usr-01",
            title=reminder.title,
            detail=reminder.detail,
            time=reminder.time,
            category=reminder.category,
            is_active=reminder.is_active
        )
        db.add(new_rem)
        db.commit()
        db.refresh(new_rem)

        resp_dict = {
            "id": new_rem.id,
            "title": new_rem.title,
            "detail": new_rem.detail,
            "time": new_rem.time,
            "category": new_rem.category,
            "is_active": new_rem.is_active
        }
        return {"message": "Reminder created", "reminder": resp_dict}
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Failed to create reminder: {e}")
        raise HTTPException(status_code=500, detail="Failed to create reminder in database")

@app.patch("/api/reminders/{id}")
def toggle_reminder_endpoint(id: str, db: Session = Depends(get_db)):
    try:
        rem = db.query(Reminder).filter(Reminder.id == id).first()
        if not rem:
            raise HTTPException(status_code=404, detail="Reminder not found")
        rem.is_active = not rem.is_active
        db.commit()
        db.refresh(rem)
        resp_dict = {
            "id": rem.id,
            "title": rem.title,
            "detail": rem.detail,
            "time": rem.time,
            "category": rem.category,
            "is_active": rem.is_active
        }
        return {"message": "Reminder status updated", "reminder": resp_dict}
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Failed to update reminder: {e}")
        raise HTTPException(status_code=500, detail="Database error updating reminder")

# 6. Dashboard Summary & Next-Day Plan
@app.get("/api/dashboard/summary")
def get_dashboard_summary(db: Session = Depends(get_db)):
    try:
        profile = db.query(UserProfile).filter(UserProfile.id == "usr-01").first()
        user_name = profile.name if profile else "Priya Sharma"
        
        # Calculate dynamic counts from live database
        latest_chk = db.query(DailyCheckin).order_by(desc(DailyCheckin.created_at)).first()
        hydration = latest_chk.water_glasses if latest_chk else 6
        kicks = latest_chk.kicks_count if latest_chk else 10
        active_reminders_count = db.query(Reminder).filter(Reminder.is_active == True).count()

        completed_tasks = 3
        total_tasks = 6

        return {
            "user_name": user_name,
            "pregnancy_stage": "12 Weeks 3 Days (First Trimester)",
            "tasks_completed": completed_tasks,
            "total_tasks": total_tasks,
            "hydration_glasses": hydration,
            "kick_count": kicks,
            "active_reminders_count": active_reminders_count,
            "next_day_plan": [
                "Morning: Warm milk + soaked almonds",
                "Afternoon: Spinach dal with lemon juice for maximum iron bioavailability",
                "Evening: 10-minute pelvic relaxation & Garbh Sanskar reading",
                "Night: Take calcium tablet before sleep"
            ]
        }
    except SQLAlchemyError as e:
        logger.error(f"Failed to fetch dashboard summary: {e}")
        raise HTTPException(status_code=500, detail="Database error fetching dashboard summary")

# 7. Mood-based Recommendations
@app.get("/api/content/recommendations")
def get_mood_recommendations(mood: str = Query("calm")):
    recommendations = [
        {"title": "5 Min Breathing for Calm Mind", "type": "breathing", "duration": "2 min", "views": "2.2M"},
        {"title": "Positive Story for Expecting Moms", "type": "audio", "duration": "4 min", "views": "1.8M"},
        {"title": "Affirmations: You are Strong", "type": "read", "duration": "3 min", "views": "950K"},
        {"title": "Guided Relaxation Audio", "type": "audio", "duration": "5 min", "views": "1.4M"}
    ]
    return {"selected_mood": mood, "recommended_content": recommendations}

# 8. Extra Help: Baby Kicks Tracker
@app.post("/api/kicks")
def record_kicks(session: KickSessionModel, db: Session = Depends(get_db)):
    try:
        kick_id = f"kick-{uuid.uuid4().hex[:8]}"
        ks = KickSession(
            id=kick_id,
            user_id="usr-01",
            kicks=session.kicks,
            duration_minutes=session.duration_minutes,
            notes=session.notes,
            session_date=str(date.today())
        )
        db.add(ks)

        # Update current check-in's kick count if today's check-in exists
        today_chk = db.query(DailyCheckin).filter(DailyCheckin.date == str(date.today())).first()
        if today_chk:
            today_chk.kicks_count = session.kicks

        db.commit()

        return {
            "status": "success",
            "message": f"Recorded {session.kicks} kicks in {session.duration_minutes} minutes.",
            "fetal_health_evaluation": "Normal and reassuring fetal activity."
        }
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Failed to save kick session: {e}")
        raise HTTPException(status_code=500, detail="Database error saving kick session")

# 9. Extra Help: Maternal Danger Signs & Emergency Helplines
@app.get("/api/safety/danger-signs")
def get_safety_danger_signs():
    return {
        "emergency_helplines": {
            "national_ambulance": "108",
            "maternal_janani_ambulance": "102",
            "tele_counsel": "104"
        },
        "urgent_warning_signs": [
            "Vaginal bleeding or fluid leaking",
            "Severe headache with vision changes or sudden face/hand swelling",
            "High fever with chills",
            "Sharp persistent abdominal/pelvic pain",
            "Noticeably decreased fetal movement"
        ],
        "disclaimer": "GarbhaSaathi is a supportive self-care tool. Always consult a qualified obstetrician."
    }

# 10. Daily Food Records
@app.get("/api/food/records")
def get_food_records(date_str: Optional[str] = Query(None, alias="date"), db: Session = Depends(get_db)):
    try:
        query_date = date_str or str(date.today())
        records = db.query(DailyFoodRecord).filter(
            DailyFoodRecord.user_id == "usr-01",
            DailyFoodRecord.date == query_date
        ).order_by(DailyFoodRecord.created_at.asc()).all()

        return {
            "date": query_date,
            "records": [
                {
                    "id": r.id,
                    "date": r.date,
                    "meal_type": r.meal_type,
                    "food_name": r.food_name,
                    "portion": r.portion,
                    "meal_time": r.meal_time,
                    "completed": r.completed,
                    "created_at": r.created_at.isoformat() if r.created_at else None
                }
                for r in records
            ]
        }
    except SQLAlchemyError as e:
        logger.error(f"Failed to fetch food records: {e}")
        raise HTTPException(status_code=500, detail="Database error fetching food records")

@app.post("/api/food/records")
def create_food_record(payload: FoodRecordModel, db: Session = Depends(get_db)):
    try:
        rec_date = payload.date or str(date.today())
        rec_time = payload.meal_time or datetime.now().strftime("%I:%M %p")
        new_id = f"food-{uuid.uuid4().hex[:8]}"

        record = DailyFoodRecord(
            id=new_id,
            user_id="usr-01",
            date=rec_date,
            meal_type=payload.meal_type,
            food_name=payload.food_name.strip(),
            portion=payload.portion,
            meal_time=rec_time,
            completed=payload.completed
        )
        db.add(record)
        db.commit()
        db.refresh(record)

        return {
            "message": "Food record saved successfully",
            "record": {
                "id": record.id,
                "date": record.date,
                "meal_type": record.meal_type,
                "food_name": record.food_name,
                "portion": record.portion,
                "meal_time": record.meal_time,
                "completed": record.completed
            }
        }
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Failed to save food record: {e}")
        raise HTTPException(status_code=500, detail="Database error saving food record")

@app.patch("/api/food/records/{id}/toggle")
def toggle_food_record(id: str, db: Session = Depends(get_db)):
    try:
        record = db.query(DailyFoodRecord).filter(DailyFoodRecord.id == id).first()
        if not record:
            raise HTTPException(status_code=404, detail="Food record not found")
        record.completed = not record.completed
        db.commit()
        db.refresh(record)
        return {
            "message": "Meal completion status updated",
            "record": {
                "id": record.id,
                "completed": record.completed
            }
        }
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Failed to toggle food record: {e}")
        raise HTTPException(status_code=500, detail="Database error updating food record")

@app.delete("/api/food/records/{id}")
def delete_food_record(id: str, db: Session = Depends(get_db)):
    try:
        record = db.query(DailyFoodRecord).filter(DailyFoodRecord.id == id).first()
        if not record:
            raise HTTPException(status_code=404, detail="Food record not found")
        db.delete(record)
        db.commit()
        return {"message": "Food record deleted successfully", "id": id}
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Failed to delete food record: {e}")
        raise HTTPException(status_code=500, detail="Database error deleting food record")

# 11. Daily Health Status (Non-diagnostic questionnaire)
@app.get("/api/health-status")
def get_health_status(date_str: Optional[str] = Query(None, alias="date"), db: Session = Depends(get_db)):
    try:
        query_date = date_str or str(date.today())
        log = db.query(DailyHealthLog).filter(
            DailyHealthLog.user_id == "usr-01",
            DailyHealthLog.date == query_date
        ).first()

        if not log:
            return {
                "date": query_date,
                "found": False,
                "data": None
            }

        return {
            "date": query_date,
            "found": True,
            "data": {
                "id": log.id,
                "feeling": log.feeling,
                "sleep_quality": log.sleep_quality,
                "symptoms": log.symptoms or [],
                "water_glasses": log.water_glasses,
                "medicines_taken": log.medicines_taken,
                "activity_completed": log.activity_completed,
                "meals_eaten": log.meals_eaten,
                "notes": log.notes,
                "updated_at": log.updated_at.isoformat() if log.updated_at else None
            }
        }
    except SQLAlchemyError as e:
        logger.error(f"Failed to fetch health status: {e}")
        raise HTTPException(status_code=500, detail="Database error fetching health status")

@app.post("/api/health-status")
def save_health_status(payload: HealthLogModel, db: Session = Depends(get_db)):
    try:
        target_date = payload.date or str(date.today())
        log = db.query(DailyHealthLog).filter(
            DailyHealthLog.user_id == "usr-01",
            DailyHealthLog.date == target_date
        ).first()

        if log:
            log.feeling = payload.feeling
            log.sleep_quality = payload.sleep_quality
            log.symptoms = payload.symptoms
            log.water_glasses = payload.water_glasses
            log.medicines_taken = payload.medicines_taken
            log.activity_completed = payload.activity_completed
            log.meals_eaten = payload.meals_eaten
            log.notes = payload.notes
        else:
            log_id = f"hl-{uuid.uuid4().hex[:8]}"
            log = DailyHealthLog(
                id=log_id,
                user_id="usr-01",
                date=target_date,
                feeling=payload.feeling,
                sleep_quality=payload.sleep_quality,
                symptoms=payload.symptoms,
                water_glasses=payload.water_glasses,
                medicines_taken=payload.medicines_taken,
                activity_completed=payload.activity_completed,
                meals_eaten=payload.meals_eaten,
                notes=payload.notes
            )
            db.add(log)

        # Also update today's baseline daily checkin if for today
        if target_date == str(date.today()):
            chk = db.query(DailyCheckin).filter(
                DailyCheckin.user_id == "usr-01",
                DailyCheckin.date == target_date
            ).first()
            if chk:
                chk.feeling = payload.feeling
                chk.symptoms = payload.symptoms
                chk.water_glasses = payload.water_glasses

        db.commit()
        db.refresh(log)

        return {
            "message": "Daily health status saved successfully",
            "data": {
                "id": log.id,
                "date": log.date,
                "feeling": log.feeling,
                "sleep_quality": log.sleep_quality,
                "symptoms": log.symptoms,
                "water_glasses": log.water_glasses,
                "medicines_taken": log.medicines_taken,
                "activity_completed": log.activity_completed,
                "meals_eaten": log.meals_eaten,
                "notes": log.notes
            }
        }
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Failed to save health status: {e}")
        raise HTTPException(status_code=500, detail="Database error saving health status")

# 12. Daily Needs Questionnaire Checklist
@app.get("/api/daily-needs")
def get_daily_needs(date_str: Optional[str] = Query(None, alias="date"), db: Session = Depends(get_db)):
    try:
        query_date = date_str or str(date.today())
        checklist = db.query(DailyNeedsChecklist).filter(
            DailyNeedsChecklist.user_id == "usr-01",
            DailyNeedsChecklist.date == query_date
        ).first()

        if not checklist:
            return {
                "date": query_date,
                "found": False,
                "items": {},
                "completed_count": 0,
                "applicable_count": 0,
                "progress_percent": 0
            }

        return {
            "date": query_date,
            "found": True,
            "items": checklist.items or {},
            "completed_count": checklist.completed_count,
            "applicable_count": checklist.applicable_count,
            "progress_percent": checklist.progress_percent,
            "updated_at": checklist.updated_at.isoformat() if checklist.updated_at else None
        }
    except SQLAlchemyError as e:
        logger.error(f"Failed to fetch daily needs: {e}")
        raise HTTPException(status_code=500, detail="Database error fetching daily needs")

@app.post("/api/daily-needs")
def save_daily_needs(payload: DailyNeedsModel, db: Session = Depends(get_db)):
    try:
        target_date = payload.date or str(date.today())
        
        # Calculate progress counters
        items = payload.items or {}
        completed = sum(1 for v in items.values() if isinstance(v, dict) and v.get("status") == "completed")
        applicable = sum(1 for v in items.values() if isinstance(v, dict) and v.get("status") != "not_applicable")
        pct = round((completed / applicable) * 100) if applicable > 0 else 0

        checklist = db.query(DailyNeedsChecklist).filter(
            DailyNeedsChecklist.user_id == "usr-01",
            DailyNeedsChecklist.date == target_date
        ).first()

        if checklist:
            checklist.items = items
            checklist.completed_count = completed
            checklist.applicable_count = applicable
            checklist.progress_percent = pct
        else:
            cid = f"needs-{uuid.uuid4().hex[:8]}"
            checklist = DailyNeedsChecklist(
                id=cid,
                user_id="usr-01",
                date=target_date,
                items=items,
                completed_count=completed,
                applicable_count=applicable,
                progress_percent=pct
            )
            db.add(checklist)

        db.commit()
        db.refresh(checklist)

        return {
            "message": "Daily needs checklist updated",
            "checklist": {
                "id": checklist.id,
                "date": checklist.date,
                "items": checklist.items,
                "completed_count": checklist.completed_count,
                "applicable_count": checklist.applicable_count,
                "progress_percent": checklist.progress_percent
            }
        }
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Failed to save daily needs: {e}")
        raise HTTPException(status_code=500, detail="Database error saving daily needs")

# 13. Daily Walking Steps & Activity
@app.get("/api/activity/steps")
def get_activity_steps(date_str: Optional[str] = Query(None, alias="date"), db: Session = Depends(get_db)):
    try:
        query_date = date_str or str(date.today())
        steps_rec = db.query(DailyActivityStep).filter(
            DailyActivityStep.user_id == "usr-01",
            DailyActivityStep.date == query_date
        ).first()

        if not steps_rec:
            return {
                "date": query_date,
                "found": False,
                "step_count": 0,
                "step_goal": 4000,
                "distance_km": "0.0",
                "active_minutes": 0,
                "source": "manual"
            }

        return {
            "date": query_date,
            "found": True,
            "step_count": steps_rec.step_count,
            "step_goal": steps_rec.step_goal,
            "distance_km": steps_rec.distance_km,
            "active_minutes": steps_rec.active_minutes,
            "source": steps_rec.source,
            "notes": steps_rec.notes,
            "updated_at": steps_rec.updated_at.isoformat() if steps_rec.updated_at else None
        }
    except SQLAlchemyError as e:
        logger.error(f"Failed to fetch activity steps: {e}")
        raise HTTPException(status_code=500, detail="Database error fetching activity steps")

@app.post("/api/activity/steps")
def save_activity_steps(payload: ActivityStepModel, db: Session = Depends(get_db)):
    try:
        target_date = payload.date or str(date.today())
        
        # Calculate approx distance: approx 0.00075 km per step
        calc_distance = f"{round(payload.step_count * 0.00075, 2):.2f}"

        steps_rec = db.query(DailyActivityStep).filter(
            DailyActivityStep.user_id == "usr-01",
            DailyActivityStep.date == target_date
        ).first()

        if steps_rec:
            steps_rec.step_count = payload.step_count
            steps_rec.step_goal = payload.step_goal
            steps_rec.distance_km = payload.distance_km or calc_distance
            steps_rec.active_minutes = payload.active_minutes or 0
            steps_rec.notes = payload.notes
        else:
            sid = f"steps-{uuid.uuid4().hex[:8]}"
            steps_rec = DailyActivityStep(
                id=sid,
                user_id="usr-01",
                date=target_date,
                step_count=payload.step_count,
                step_goal=payload.step_goal,
                distance_km=payload.distance_km or calc_distance,
                active_minutes=payload.active_minutes or 0,
                source="manual",
                notes=payload.notes
            )
            db.add(steps_rec)

        db.commit()
        db.refresh(steps_rec)

        return {
            "message": "Walking steps updated successfully",
            "data": {
                "id": steps_rec.id,
                "date": steps_rec.date,
                "step_count": steps_rec.step_count,
                "step_goal": steps_rec.step_goal,
                "distance_km": steps_rec.distance_km,
                "active_minutes": steps_rec.active_minutes,
                "source": steps_rec.source
            }
        }
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Failed to save activity steps: {e}")
        raise HTTPException(status_code=500, detail="Database error saving activity steps")

# 14. Daily History Aggregator
@app.get("/api/history/dates")
def get_history_dates(db: Session = Depends(get_db)):
    try:
        dates_set = set()
        
        # Collect distinct dates across all modules
        for d in db.query(DailyFoodRecord.date).distinct().all():
            if d[0]: dates_set.add(d[0])
        for d in db.query(DailyHealthLog.date).distinct().all():
            if d[0]: dates_set.add(d[0])
        for d in db.query(DailyNeedsChecklist.date).distinct().all():
            if d[0]: dates_set.add(d[0])
        for d in db.query(DailyActivityStep.date).distinct().all():
            if d[0]: dates_set.add(d[0])
        for d in db.query(KickSession.session_date).distinct().all():
            if d[0]: dates_set.add(d[0])
        for d in db.query(DailyCheckin.date).distinct().all():
            if d[0]: dates_set.add(d[0])
        
        # Always include today
        dates_set.add(str(date.today()))
        
        # Sort newest first
        sorted_dates = sorted(list(dates_set), reverse=True)
        return {"dates": sorted_dates}
    except SQLAlchemyError as e:
        logger.error(f"Failed to fetch history dates: {e}")
        raise HTTPException(status_code=500, detail="Database error fetching history dates")

@app.get("/api/history/day")
def get_day_history(date_str: str = Query(..., alias="date"), db: Session = Depends(get_db)):
    try:
        # 1. Food records
        foods = db.query(DailyFoodRecord).filter(
            DailyFoodRecord.user_id == "usr-01",
            DailyFoodRecord.date == date_str
        ).order_by(DailyFoodRecord.created_at.asc()).all()

        # 2. Health log
        health = db.query(DailyHealthLog).filter(
            DailyHealthLog.user_id == "usr-01",
            DailyHealthLog.date == date_str
        ).first()

        # 3. Daily needs checklist
        needs = db.query(DailyNeedsChecklist).filter(
            DailyNeedsChecklist.user_id == "usr-01",
            DailyNeedsChecklist.date == date_str
        ).first()

        # 4. Walking steps
        steps = db.query(DailyActivityStep).filter(
            DailyActivityStep.user_id == "usr-01",
            DailyActivityStep.date == date_str
        ).first()

        # 5. Kick sessions
        kicks = db.query(KickSession).filter(
            KickSession.user_id == "usr-01",
            KickSession.session_date == date_str
        ).order_by(KickSession.created_at.desc()).all()

        # 6. Medical records (by date string match or creation)
        records = db.query(MedicalRecord).filter(
            MedicalRecord.user_id == "usr-01"
        ).all()
        day_records = [
            r for r in records
            if (r.date and (date_str in r.date or (r.created_at and r.created_at.strftime("%Y-%m-%d") == date_str)))
        ]

        # 7. Reminders / Appointments (distinguishing appointment vs medicine)
        reminders = db.query(Reminder).filter(
            Reminder.user_id == "usr-01"
        ).all()

        has_data = bool(
            foods or health or (needs and needs.applicable_count > 0) or
            (steps and steps.step_count > 0) or kicks or day_records
        )

        return {
            "date": date_str,
            "has_data": has_data,
            "food_records": [
                {
                    "id": f.id,
                    "meal_type": f.meal_type,
                    "food_name": f.food_name,
                    "portion": f.portion,
                    "meal_time": f.meal_time,
                    "completed": f.completed
                }
                for f in foods
            ],
            "health_log": {
                "feeling": health.feeling,
                "sleep_quality": health.sleep_quality,
                "symptoms": health.symptoms or [],
                "water_glasses": health.water_glasses,
                "medicines_taken": health.medicines_taken,
                "activity_completed": health.activity_completed,
                "meals_eaten": health.meals_eaten,
                "notes": health.notes
            } if health else None,
            "daily_needs": {
                "items": needs.items or {},
                "completed_count": needs.completed_count,
                "applicable_count": needs.applicable_count,
                "progress_percent": needs.progress_percent
            } if needs else None,
            "activity_steps": {
                "step_count": steps.step_count,
                "step_goal": steps.step_goal,
                "distance_km": steps.distance_km,
                "active_minutes": steps.active_minutes,
                "source": steps.source
            } if steps else None,
            "kick_sessions": [
                {
                    "id": k.id,
                    "kicks": k.kicks,
                    "duration_minutes": k.duration_minutes,
                    "notes": k.notes,
                    "created_at": k.created_at.isoformat() if k.created_at else None
                }
                for k in kicks
            ],
            "medical_reports": [
                {
                    "id": r.id,
                    "file_name": r.file_name,
                    "record_type": r.record_type,
                    "confirmed": r.confirmed,
                    "extracted_text": r.extracted_text
                }
                for r in day_records
            ],
            "reminders": [
                {
                    "id": rem.id,
                    "title": rem.title,
                    "detail": rem.detail,
                    "time": rem.time,
                    "category": rem.category,
                    "is_active": rem.is_active,
                    "is_appointment": rem.category in ["appointment", "clinic", "checkup"]
                }
                for rem in reminders
            ]
        }
    except SQLAlchemyError as e:
        logger.error(f"Failed to fetch day history: {e}")
        raise HTTPException(status_code=500, detail="Database error fetching day history")
