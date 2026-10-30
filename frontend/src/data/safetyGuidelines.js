export const safetyGuidelines = {
  emergencyHelplines: [
    {
      number: "108",
      title: "National Emergency Ambulance",
      titleHi: "108 - राष्ट्रीय आपातकालीन एम्बुलेंस",
      titleMr: "108 - राष्ट्रीय रुग्णवाहिका सेवा",
      desc: "Free 24x7 government emergency response across India",
      descHi: "भारत भर में 24 घंटे निःशुल्क सरकारी एम्बुलेंस सेवा"
    },
    {
      number: "102",
      title: "Free Maternal & Child Ambulance (Janani Shishu Suraksha)",
      titleHi: "102 - जननी शिशु सुरक्षा मातृत्व एम्बुलेंस",
      titleMr: "102 - माता व बाल रुग्णवाहिका",
      desc: "Dedicated free transportation for pregnant mothers to hospital",
      descHi: "गर्भवती माताओं को अस्पताल ले जाने हेतु समर्पित निःशुल्क वाहन"
    },
    {
      number: "104",
      title: "Health Information Helpline",
      titleHi: "104 - स्वास्थ्य सलाह हेल्पलाइन",
      titleMr: "104 - आरोग्य सल्ला हेल्पलाइन",
      desc: "Free medical counsel & directory of nearby government clinics",
      descHi: "निशुल्क टेली-परामर्श और नजदीकी स्वास्थ्य केंद्र की जानकारी"
    }
  ],

  dangerSigns: [
    {
      id: "bleeding",
      title: "Vaginal Bleeding or Spotting",
      titleHi: "योनि से रक्तस्राव या खून के धब्बे (Bleeding)",
      severity: "URGENT",
      actionHi: "तुरंत अस्पताल या प्रसूति विशेषज्ञ के पास जाएं। किसी भी घरेलू उपचार का इंतजार न करें।"
    },
    {
      id: "severe_pain",
      title: "Severe Abdominal / Pelvic Cramping",
      titleHi: "पेट के निचले हिस्से में तीव्र ऐंठन या तेज दर्द",
      severity: "URGENT",
      actionHi: "यदि दर्द लगातार बढ़ रहा हो या कमर तक फैल रहा हो, तो तुरंत जांच कराएं।"
    },
    {
      id: "reduced_movement",
      title: "Sudden Decrease in Fetal Movements",
      titleHi: "शिशु की हलचल में अचानक भारी कमी (किक न आना)",
      severity: "URGENT",
      actionHi: "कुछ मीठा खाकर बाईं करवट 1 घंटा लेटें। यदि 1 घंटे में 3-4 हलचल न हों, तो फौरन डॉक्टर को दिखाएं।"
    },
    {
      id: "severe_headache",
      title: "Severe Headache with Blurred Vision & Face Swelling",
      titleHi: "सिर में तेज दर्द, आंखों के आगे धुंधलापन और चेहरे पर सूजन",
      severity: "URGENT",
      actionHi: "यह उच्च रक्तचाप (Pre-eclampsia) का संकेत हो सकता है। तुरंत ब्लड प्रेशर नपवाएं।"
    },
    {
      id: "high_fever",
      title: "High Fever with Chills & Burning Urine",
      titleHi: "कंपकंपी के साथ तेज बुखार या पेशाब में जलन",
      severity: "PRIORITY",
      actionHi: "संक्रमण से बचने के लिए चिकित्सक से जांच कराएं। बिना डॉक्टर की सलाह के दवा न लें।"
    },
    {
      id: "water_break",
      title: "Sudden Water Gush or Leakage",
      titleHi: "पानी की थैली का फटना (पानी जैसा तरल बहना)",
      severity: "URGENT",
      actionHi: "तारीख नजदीक न होने पर भी तुरंत प्रसूति कक्ष (Labor Room) में भर्ती हों।"
    }
  ]
};
