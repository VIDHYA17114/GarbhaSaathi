# GarbhaSaathi - Comprehensive Test Plan

## 1. Test Scenarios

| Test Case | Module | Description | Expected Result | Status |
|---|---|---|---|---|
| TC-01 | Onboarding Flow | User selects Hindi/Marathi, enters LMP, views auto-calculated EDD and gestational week. | Gestational week accurately computed (e.g. 12w 3d), trimester badges update to T1. | Pass |
| TC-02 | Nutrition Suggestions | User selects "Low Budget (₹)" and available foods "Rice, Dal, Vegetables". | AI generates accessible, iron-rich meals (e.g. Dal-Palak Rice, Roasted Chana) matching budget. | Pass |
| TC-03 | Health Check & Voice | User clicks microphone or selects "Nausea / vomiting" symptom. | Voice recognition listens; gentle nausea dietary guidance shown (ginger water, small dry snacks). | Pass |
| TC-04 | Report Upload & OCR | User uploads synthetic blood report or prescription image. | Extracted test date and medicine suggestion shown with mandatory user confirmation modal. | Pass |
| TC-05 | Mood & Media Hub | User selects "Worried/stressed" or "Sad". | Content filters to 5-min calm breathing audio, comforting story, and grounding video clips. | Pass |
| TC-06 | Baby Kick Counter | User initiates kick session, taps "+1 Kick" 10 times. | Timer measures duration, celebratory confetti plays when 10 kicks reached, session logged. | Pass |
| TC-07 | Water Tracker | User taps "+1 Glass" to record hydration. | Water progress increments towards 8-10 glasses target, prevents dehydration cramping. | Pass |
| TC-08 | Maternal Danger SOS | User clicks Emergency Warning Signs button. | Immediate non-diagnostic triage display with 108/102 ambulance dialing shortcuts. | Pass |
| TC-09 | Language Switching | User switches between Hindi, Marathi, and English dynamically. | All 15 screens update terminology instantaneously without losing form state. | Pass |
| TC-10 | Screen Navigation Mode | User toggles screen carousel / gallery mode. | All 15 screens from the reference mockup can be individually inspected and tested. | Pass |
