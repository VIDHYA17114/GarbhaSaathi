# GarbhaSaathi - Data Dictionary

| Entity | Field | Type | Description |
|---|---|---|---|
| **UserProfile** | id | UUID | Unique identifier for user |
| | name | string | Full name (e.g. Priya Sharma) |
| | age | integer | Age in years |
| | language | string | `hi` (Hindi), `mr` (Marathi), `en` (English) |
| | phone | string | Mobile number |
| | email | string | Optional email address |
| **PregnancyProfile** | userId | UUID | Foreign key to UserProfile |
| | lmpDate | date | First day of Last Menstrual Period |
| | eddDate | date | Expected Due Date (LMP + 280 days) |
| | currentWeek | integer | Estimated gestational week (1–40) |
| | trimester | string | `T1` (1-12 w), `T2` (13-27 w), `T3` (28-40 w) |
| **DailyCheckin** | id | UUID | Check-in identifier |
| | date | date | Date of check-in |
| | feeling | string | `good`, `nausea`, `tired`, `mood_swings`, `other` |
| | nauseaScore | integer | 0 to 5 severity scale |
| | mood | string | `happy`, `calm`, `tired`, `anxious`, `stressed`, `sad` |
| | waterGlasses | integer | Count of water glasses logged (goal: 8-10) |
| | kicksCount | integer | Number of baby kicks recorded |
| | missedReason | string | `food_unavailable`, `budget`, `nausea`, `fatigue`, `busy` |
| **NutritionPlan** | mealType | string | `breakfast`, `lunch`, `snack`, `dinner` |
| | title | string | Name of recommended food item |
| | description | string | Key nutritional benefits (Iron, Folate, Calcium, Protein) |
| | budgetTier | string | `low`, `medium`, `high` |
| | pantryMatch | array | List of ingredients matched from user's kitchen |
| **HealthRecord** | id | UUID | Unique document identifier |
| | fileName | string | Name of uploaded file (PDF / JPG / PNG) |
| | uploadDate | string | Date file was added |
| | reportType | string | `blood_test`, `ultrasound`, `prescription`, `bill` |
| | extractedText | string | OCR or detected text summary |
| | confirmed | boolean | Whether user verified extracted details |
| **SmartReminder** | id | UUID | Reminder identifier |
| | title | string | E.g., "Take Iron Tablet", "ANC Visit" |
| | dosageTime | string | E.g., "8:00 AM" |
| | frequency | string | `daily`, `weekly`, `once` |
| | isActive | boolean | Toggle status for reminder notification |
