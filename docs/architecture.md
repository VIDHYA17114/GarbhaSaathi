# GarbhaSaathi - System Architecture

```mermaid
flowchart TD
    User["Pregnant Woman (User)"] --> UI["React + Vite Mobile Interface"]
    
    subgraph Frontend["Frontend Layer (Vite + Tailwind CSS)"]
        UI --> Nav["5-Tab Navigation & Screen Carousel (15 Screens)"]
        Nav --> ModJourney["Pregnancy Journey (LMP/EDD Engine)"]
        Nav --> ModNutrition["AI Nutrition Planner (Budget/Pantry Rules)"]
        Nav --> ModVoice["Speech Assistant (Hindi / Marathi / English)"]
        Nav --> ModWellness["Mood & Media Hub (Audio/Reels/Stories)"]
        Nav --> ModRecords["Health Records & OCR Reminder Simulator"]
        Nav --> ModBonus["Kick Counter, Hydration & Emergency SOS"]
        
        ModJourney --> LocalStore[("Local State & Persistence")]
        ModNutrition --> LocalStore
        ModVoice --> LocalStore
        ModWellness --> LocalStore
        ModRecords --> LocalStore
    end
    
    subgraph Backend["FastAPI Backend Layer (Optional / Microservice)"]
        FastAPI["FastAPI App (app/main.py)"]
        API_Checkin["/api/checkins (Daily Logs)"]
        API_Nutrition["/api/nutrition/suggestions (Rule Engine)"]
        API_Records["/api/records/upload (OCR Extraction)"]
        API_Reminders["/api/reminders (Confirmed Reminders)"]
        API_Content["/api/content/recommendations (Mood Filter)"]
        
        FastAPI --> API_Checkin
        FastAPI --> API_Nutrition
        FastAPI --> API_Records
        FastAPI --> API_Reminders
        FastAPI --> API_Content
    end
    
    subgraph SafetyLayer["Mother-Baby Safety Layer"]
        Danger["Maternal Danger Sign Detection"]
        Helpline["Direct 108 / 102 Ambulance Link"]
        Disclaimer["Strict Non-Diagnostic Disclaimer"]
    end
    
    UI --> SafetyLayer
    UI -.-> Backend
```

## Key Architectural Principles
1. **Zero-Delay Emergency Flow:** Maternal danger signs trigger immediate guidance to medical care without getting stalled in AI conversation or questionnaires.
2. **Deterministic Nutrition Rules First:** Low-cost, trimester-adjusted nutrition suggestions derived from reviewed clinical guidance (ICMR-NIN guidelines for Indian pregnant women).
3. **Explicit User Confirmation for Reminders:** OCR or text extractions are never activated automatically. The mother confirms the date, time, and medication instructions before any reminder is created.
4. **Resilient Offline-First Architecture:** The React web app runs completely self-contained in modern browsers with `localStorage` persistence, Web Speech API for voice, and audio player capabilities even without an active internet connection.
