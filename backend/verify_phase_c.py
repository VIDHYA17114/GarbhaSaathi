"""
Phase C: GarbhaSaathi End-to-End Integration & Verification Test Suite
Tests all FastAPI endpoints, CORS, database persistence in PostgreSQL 18, and Vite dev server.
"""
import sys
import os
import requests
import json
from dotenv import load_dotenv

# Load env
backend_dir = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(backend_dir, ".env"))

DATABASE_URL = os.getenv("DATABASE_URL")
BASE_URL = "http://127.0.0.1:8000"
FRONTEND_URL = "http://localhost:5174"

def run_tests():
    print("=" * 60)
    print("  GarbhaSaathi Phase C: End-to-End Verification Test Suite")
    print("=" * 60)
    
    passed = 0
    total = 0

    def assert_test(name, condition, details=""):
        nonlocal passed, total
        total += 1
        if condition:
            passed += 1
            print(f" [PASS] {name}")
        else:
            print(f" [FAIL] {name} - {details}")

    session = requests.Session()
    session.headers.update({"Origin": "http://localhost:5174"})

    # 1. Root & DB Health
    print("\n--- 1. System & Database Health ---")
    try:
        r = session.get(f"{BASE_URL}/")
        assert_test("GET / responds with status 200", r.status_code == 200)
        assert_test("GET / returns CORS header", r.headers.get("access-control-allow-origin") == "http://localhost:5174")
    except Exception as e:
        assert_test("GET / accessible", False, str(e))

    try:
        r = session.get(f"{BASE_URL}/api/health/db")
        assert_test("GET /api/health/db responds 200", r.status_code == 200)
        data = r.json()
        assert_test("Database status is healthy and connected", data.get("status") == "healthy" and data.get("database") == "connected")
    except Exception as e:
        assert_test("GET /api/health/db accessible", False, str(e))

    # 2. Daily Check-ins
    print("\n--- 2. Daily Check-ins (POST & GET) ---")
    try:
        chk_payload = {
            "feeling": "energetic",
            "symptoms": ["mild nausea"],
            "water_glasses": 8,
            "kicks_count": 12,
            "mood": "calm",
            "missed_barrier": None
        }
        r = session.post(f"{BASE_URL}/api/checkins", json=chk_payload)
        assert_test("POST /api/checkins responds 200", r.status_code == 200)
        chk_id = r.json().get("checkin", {}).get("id")
        assert_test("POST /api/checkins returns saved record with id", bool(chk_id))

        r_get = session.get(f"{BASE_URL}/api/checkins")
        assert_test("GET /api/checkins responds 200", r_get.status_code == 200)
        checkins = r_get.json().get("checkins", [])
        assert_test("GET /api/checkins includes newly saved record", any(c.get("id") == chk_id for c in checkins))
    except Exception as e:
        assert_test("Checkins endpoints", False, str(e))

    # 3. Nutrition Suggestions
    print("\n--- 3. Nutrition Suggestions ---")
    try:
        nut_payload = {
            "budget_tier": "medium",
            "available_foods": ["rice", "dal", "spinach"],
            "has_nausea": False
        }
        r = session.post(f"{BASE_URL}/api/nutrition/suggestions", json=nut_payload)
        assert_test("POST /api/nutrition/suggestions responds 200", r.status_code == 200)
        data = r.json()
        assert_test("Nutrition suggestions return meals strategy", "strategy" in data and "meals" in data)
    except Exception as e:
        assert_test("Nutrition endpoint", False, str(e))

    # 4. Pregnancy Journey
    print("\n--- 4. Pregnancy Journey ---")
    try:
        r = session.get(f"{BASE_URL}/api/journey")
        assert_test("GET /api/journey responds 200", r.status_code == 200)
        data = r.json()
        assert_test("Journey returns gestational_age and baby_development", "gestational_age" in data and "baby_development" in data)
    except Exception as e:
        assert_test("Journey endpoint", False, str(e))

    # 5. Medical Records (Upload & Confirm & List)
    print("\n--- 5. Medical Records ---")
    try:
        r = session.post(f"{BASE_URL}/api/records/upload?type=blood")
        assert_test("POST /api/records/upload responds 200", r.status_code == 200)
        rec = r.json().get("record", {})
        rec_id = rec.get("id")
        assert_test("Uploaded record returned with id", bool(rec_id))

        r_conf = session.post(f"{BASE_URL}/api/records/{rec_id}/confirm")
        assert_test("POST /api/records/{id}/confirm responds 200", r_conf.status_code == 200)
        assert_test("Confirmed flag is true", r_conf.json().get("record", {}).get("confirmed") is True)

        r_list = session.get(f"{BASE_URL}/api/records")
        assert_test("GET /api/records responds 200", r_list.status_code == 200)
        records = r_list.json().get("records", [])
        assert_test("Records list contains confirmed record", any(rc.get("id") == rec_id for rc in records))
    except Exception as e:
        assert_test("Medical records endpoints", False, str(e))

    # 6. Smart Reminders (List, Create, Toggle)
    print("\n--- 6. Smart Reminders ---")
    try:
        r_get = session.get(f"{BASE_URL}/api/reminders")
        assert_test("GET /api/reminders responds 200", r_get.status_code == 200)

        rem_payload = {
            "title": "Evening Walk & Breathing",
            "detail": "15 min gentle garden stroll",
            "time": "06:30 PM",
            "category": "exercise",
            "is_active": True
        }
        r_post = session.post(f"{BASE_URL}/api/reminders", json=rem_payload)
        assert_test("POST /api/reminders responds 200", r_post.status_code == 200)
        rem_id = r_post.json().get("reminder", {}).get("id")
        assert_test("Created reminder returned with id", bool(rem_id))

        r_toggle = session.patch(f"{BASE_URL}/api/reminders/{rem_id}")
        assert_test("PATCH /api/reminders/{id} responds 200", r_toggle.status_code == 200)
        assert_test("Reminder active state toggled to False", r_toggle.json().get("reminder", {}).get("is_active") is False)
    except Exception as e:
        assert_test("Reminders endpoints", False, str(e))

    # 7. Dashboard Summary & Kick Counter & Safety
    print("\n--- 7. Dashboard, Baby Kicks & Safety ---")
    try:
        r_dash = session.get(f"{BASE_URL}/api/dashboard/summary")
        assert_test("GET /api/dashboard/summary responds 200", r_dash.status_code == 200)
        d_data = r_dash.json()
        assert_test("Dashboard summary has user_name and next_day_plan", "user_name" in d_data and "next_day_plan" in d_data)

        kick_payload = {
            "kicks": 10,
            "duration_minutes": 25,
            "notes": "Evening active kick session test"
        }
        r_kick = session.post(f"{BASE_URL}/api/kicks", json=kick_payload)
        assert_test("POST /api/kicks responds 200", r_kick.status_code == 200)
        assert_test("Kick session returned with success status", r_kick.json().get("status") == "success")

        r_safe = session.get(f"{BASE_URL}/api/safety/danger-signs")
        assert_test("GET /api/safety/danger-signs responds 200", r_safe.status_code == 200)
        assert_test("Urgent warning signs and emergency helplines returned", "urgent_warning_signs" in r_safe.json() and "emergency_helplines" in r_safe.json())
    except Exception as e:
        assert_test("Dashboard, kicks, safety endpoints", False, str(e))

    # 8. Live PostgreSQL Database Direct Verification
    print("\n--- 8. Live PostgreSQL Table Verification ---")
    try:
        from database import SessionLocal
        from models import UserProfile, DailyCheckin, MedicalRecord, Reminder, KickSession

        db = SessionLocal()
        user_count = db.query(UserProfile).count()
        checkin_count = db.query(DailyCheckin).count()
        record_count = db.query(MedicalRecord).count()
        reminder_count = db.query(Reminder).count()
        kick_count = db.query(KickSession).count()
        db.close()

        print(f"   [DB Stats] Users: {user_count}, Checkins: {checkin_count}, Records: {record_count}, Reminders: {reminder_count}, KickSessions: {kick_count}")
        assert_test("PostgreSQL user_profiles table has records", user_count > 0)
        assert_test("PostgreSQL daily_checkins table has persisted records", checkin_count > 0)
        assert_test("PostgreSQL medical_records table has persisted records", record_count > 0)
        assert_test("PostgreSQL reminders table has persisted records", reminder_count > 0)
        assert_test("PostgreSQL kick_sessions table has persisted records", kick_count > 0)
    except Exception as e:
        assert_test("Direct PostgreSQL check", False, str(e))

    # 9. Frontend Dev Server Check
    print("\n--- 9. Frontend Dev Server Verification ---")
    try:
        r_front = session.get(FRONTEND_URL)
        assert_test("Frontend Vite server responds 200 on port 5174", r_front.status_code == 200)
        assert_test("Frontend HTML contains React root", '<div id="root">' in r_front.text or 'root' in r_front.text)
    except Exception as e:
        assert_test("Frontend dev server reachability", False, str(e))

    print("\n" + "=" * 60)
    print(f"  Summary: {passed}/{total} tests passed ({round((passed/total)*100, 1)}%)")
    print("=" * 60)
    if passed == total:
        print("ALL END-TO-END INTEGRATION TESTS PASSED PERFECTLY!\n")
        return 0
    else:
        print("SOME TESTS FAILED.\n")
        return 1

if __name__ == "__main__":
    code = run_tests()
    sys.exit(code)
