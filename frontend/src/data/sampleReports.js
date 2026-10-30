export const sampleReports = [
  {
    id: "rep-1",
    fileName: "Blood Test Report",
    fileNameHi: "रक्त जांच रिपोर्ट (हीमोग्लोबिन)",
    date: "12 Aug 2025",
    type: "pdf",
    badgeColor: "bg-red-100 text-red-600 border-red-200",
    extractedData: {
      patientName: "Priya Sharma",
      testName: "Complete Blood Count (CBC) & Serum Ferritin",
      resultDate: "12 Aug 2025",
      findings: "Hemoglobin (Hb): 10.4 g/dL (Mild Anaemia). Serum Ferritin: 18 ng/mL.",
      doctorAdvice: "Prescribed Iron & Folic Acid tablet 1 tab daily after lunch with citrus fruit. Calcium at bedtime.",
      detectedReminders: [
        {
          title: "Take Iron Tablet (आयरन की गोली)",
          dosage: "1 tablet daily after lunch",
          time: "02:00 PM",
          suggestedByOcr: true
        }
      ]
    }
  },
  {
    id: "rep-2",
    fileName: "Ultrasound Report",
    fileNameHi: "सोनोग्राफी / अल्ट्रासाउंड रिपोर्ट",
    date: "20 Jul 2025",
    type: "img",
    badgeColor: "bg-blue-100 text-blue-600 border-blue-200",
    extractedData: {
      patientName: "Priya Sharma",
      testName: "First Trimester Nuchal Translucency (NT) Scan",
      resultDate: "20 Jul 2025",
      findings: "Single live intrauterine pregnancy of 12 weeks 3 days. FHR 154 bpm. Normal CRL.",
      doctorAdvice: "Next Anomaly Scan scheduled between 18-20 weeks.",
      detectedReminders: [
        {
          title: "Schedule Anomaly (TIFFA) Scan",
          dosage: "Visit clinic for 18-week scan",
          time: "10:00 AM",
          suggestedByOcr: true
        }
      ]
    }
  },
  {
    id: "rep-3",
    fileName: "Iron Supplements Bill",
    fileNameHi: "दवा पर्ची / आयरन सप्लीमेंट रसीद",
    date: "05 Jul 2025",
    type: "pdf",
    badgeColor: "bg-red-100 text-red-600 border-red-200",
    extractedData: {
      patientName: "Priya Sharma",
      testName: "Pharmacy Prescription Receipt",
      resultDate: "05 Jul 2025",
      findings: "Tab Ferrous Ascorbate 100mg + Folic Acid 1.5mg (Strip of 30 tabs). Tab Shellcal 500mg.",
      doctorAdvice: "Do not take iron and calcium together. Keep minimum 2 hours gap.",
      detectedReminders: [
        {
          title: "Take Iron Tablet",
          dosage: "1 tablet daily",
          time: "8:00 AM",
          suggestedByOcr: true
        }
      ]
    }
  }
];

export const initialReminders = [
  {
    id: "rem-1",
    title: "Take Iron Tablet",
    titleHi: "आयरन की गोली लें",
    titleMr: "लोहाची गोळी घ्या",
    detail: "1 tablet daily",
    detailHi: "प्रतिदिन 1 गोली (नींबू पानी या फल के साथ)",
    detailMr: "दररोज 1 गोळी",
    time: "8:00 AM",
    isActive: true,
    category: "medicine"
  },
  {
    id: "rem-2",
    title: "Drink Water Glass #3",
    titleHi: "पानी का तीसरा गिलास पिएं",
    titleMr: "पाण्याचा तिसरा ग्लास प्या",
    detail: "Stay hydrated for amniotic fluid",
    detailHi: "शिशु के जल स्तर और ऊर्जा के लिए",
    detailMr: "हायड्रेशन टिकवून ठेवा",
    time: "11:30 AM",
    isActive: true,
    category: "hydration"
  },
  {
    id: "rem-3",
    title: "Calcium Supplement (रात को)",
    titleHi: "कैल्शियम की गोली (रात को)",
    titleMr: "कॅल्शियम गोळी (रात्री)",
    detail: "1 tablet after dinner with warm milk",
    detailHi: "रात के खाने के बाद गुनगुने दूध के साथ",
    detailMr: "रात्री जेवणानंतर दुधासोबत",
    time: "9:30 PM",
    isActive: true,
    category: "medicine"
  }
];
