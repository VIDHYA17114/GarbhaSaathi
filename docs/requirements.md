# GarbhaSaathi - Requirements Specification
**Project:** GarbhaSaathi  
**Primary Domain:** Anaemia, Malnutrition and Maternal–Child Nutrition Continuity  
**Target User:** Pregnant women using the app for daily self-care  
**Languages:** Hindi, Marathi, English  

---

## 1. Overview & Problem Statement
Pregnant women often face barriers to accessing tailored, affordable pregnancy nutrition, managing nausea and appetite swings, remembering antenatal checkups and supplements (Iron & Folic Acid / Calcium), and finding culturally sensitive emotional wellness resources in regional Indian languages (Hindi & Marathi).

GarbhaSaathi is a personalized, self-directed pregnancy companion that provides:
1. Low-cost, accessible nutrition recommendations based on pantry availability and nausea barriers.
2. Estimated pregnancy stage tracking (trimester & week-by-week fetal development).
3. Private health record storage and user-confirmed reminder extraction.
4. Mood-based emotional wellness (breathing exercises, read-aloud books/stories, relaxing audio, educational reels).
5. Voice-assisted daily check-in with tap and speech recognition in Hindi/Marathi.
6. Daily progress dashboard with empathetic barrier logging and editable next-day planning.
7. Crucial safety guidance for maternal danger signs without replacing licensed clinical care.

---

## 2. Feature Priority Matrix

| Priority | Feature Module | Functional Requirement |
|---|---|---|
| **P1** | AI Nutrition & Wellness Planner | Low/Medium/High budget filters; Available pantry ingredients checklist; Nausea/vomiting and symptom barriers; Practical Indian meal recommendations (Poha, Dal-Rice-Spinach, Roasted Chana, Khichdi); Trimester-specific nutrient guidance (Iron, Folate, Calcium). |
| **P2** | Health Records & Reminders | Private document storage (Blood reports, Ultrasound, Medicine bills); OCR preview extraction of dates and medicine names; Strict user confirmation workflow before reminder creation. |
| **P3** | Smart Progress & Barrier Log | Today's checklist tracking; empathetic reason logging for skipped meals (nausea, food unavailable, fatigue); flexible next-day planner without guilt metrics. |
| **P4** | Mother–Baby Care & Safety | Clear warning signs (vaginal bleeding, severe abdominal pain, persistent headaches, visual disturbance, reduced fetal movement); One-tap 108/102 emergency helpline access; Strict non-diagnostic disclaimer. |
| **P5** | Personalized Journey | LMP (Last Menstrual Period) or EDD (Expected Due Date) entry; Gestational week (1 to 40) and Trimester (T1, T2, T3) progress calculation; Weekly fetal size comparison and developmental milestones. |
| **P6** | Hindi / Marathi Voice Assistant | Web Speech API speech-to-text and text-to-speech engine; Conversational voice prompts in Hindi and Marathi with tap fallback. |
| **P7** | Mood-Based Emotional Wellness | Daily mood check-in (Happy, Calm, Tired, Anxious, Stressed, Sad); Filterable library (Breathing audio, Soothing stories, Affirmations, Short wellness reels); Read-aloud reader with adjustable font size. |
| **P8 (Bonus)** | Baby Kick Counter & Hydration | Dedicated fetal kick session tracker (count to 10 kicks with timer); 8-10 glasses water tracker to prevent dehydration cramps. |

---

## 3. Non-Functional Requirements
- **Mobile First:** Optimized for Android/iOS mobile screens with 375px–430px viewport and responsive tablet/desktop support.
- **Privacy First:** Client-side local data storage with export/clear options; zero unauthorized clinical data sharing.
- **Accessibility:** Large buttons, high contrast, warm comforting pregnancy color scheme (#157F66 teal, gentle coral, peach, soft mint green).
- **Graceful Fallbacks:** Voice input falls back seamlessly to clickable symptom options when microphone permission is denied or unsupported.
