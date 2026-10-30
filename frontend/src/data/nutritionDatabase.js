export const nutritionDatabase = {
  // Meals according to image screen 10
  standardPlan: {
    breakfast: {
      title: "Poha with peanuts + Banana",
      titleHi: "पोहा मूंगफली के साथ + केला",
      titleMr: "शेंगदाणे घालून पोहे + केळे",
      benefit: "High energy, iron, folate",
      benefitHi: "ऊर्जा, आयरन व फोलेट से भरपूर",
      benefitMr: "ऊर्जा, लोह आणि फोलेटने समृद्ध",
      img: "🥣",
      nutrients: ["Iron", "Folate", "Energy"],
      affordable: true
    },
    lunch: {
      title: "Dal + Rice + Spinach + Curd",
      titleHi: "दाल + चावल + पालक + दही",
      titleMr: "वरण + भात + पालक भाजी + दही",
      benefit: "Protein, calcium, iron",
      benefitHi: "प्रोटीन, कैल्शियम, आयरन",
      benefitMr: "प्रथिने, कॅल्शियम, लोह",
      img: "🍛",
      nutrients: ["Protein", "Calcium", "Iron"],
      affordable: true
    },
    eveningSnack: {
      title: "Roasted chana + Fruit",
      titleHi: "भुना चना + मौसमी फल",
      titleMr: "भाजलेले चणे + हंगामी फळ",
      benefit: "Affordable & healthy",
      benefitHi: "सस्ता और सेहतमंद नाश्ता",
      benefitMr: "स्वस्त आणि पौष्टिक खाऊ",
      img: "🥜",
      nutrients: ["Fiber", "Protein", "Vitamins"],
      affordable: true
    },
    dinner: {
      title: "Chapati + Mixed vegetable + Salad",
      titleHi: "रोटी + मिक्स सब्जी + सलाद",
      titleMr: "चपाती + मिश्र भाजी + कोशिंबीर",
      benefit: "Balanced nutrition & easy digestion",
      benefitHi: "संतुलित पोषण और सुपाच्य",
      benefitMr: "संतुलित पोषण आणि पचनास हलके",
      img: "🥗",
      nutrients: ["Fiber", "Micronutrients", "Complex Carbs"],
      affordable: true
    }
  },

  // Food categories as displayed on Screen 11 and Screen 12
  categories: [
    {
      id: "leafy",
      name: "Green leafy vegetables",
      nameHi: "हरी पत्तेदार सब्जियां (पालक, मेथी)",
      nameMr: "हिरव्या पालेभाज्या (पालक, मेथी)",
      icon: "🥬",
      benefit: "Rich in Iron & Folate for baby blood production",
      items: ["Spinach (पालक)", "Fenugreek (मेथी)", "Moringa (सहजन पत्ती)", "Amaranth (चौलाई)"]
    },
    {
      id: "dal",
      name: "Dal and pulses",
      nameHi: "दालें और दलहन (मूंग, मसूर, चना)",
      nameMr: "डाळी आणि कडधान्ये (मूग, मसूर, चणे)",
      icon: "🍲",
      benefit: "Essential protein for baby tissue & muscle growth",
      items: ["Moong dal (मूंग)", "Masoor dal (मसूर)", "Kala Chana (काला चना)", "Sprouts (अंकुरित मूंग)"]
    },
    {
      id: "dairy",
      name: "Milk and dairy products",
      nameHi: "दूध और दुग्ध उत्पाद (दही, छाछ)",
      nameMr: "दूध आणि दुग्धजन्य पदार्थ (दही, ताक)",
      icon: "🥛",
      benefit: "Vital Calcium & Vitamin D for baby bone development",
      items: ["Fresh Curd/Dahi (ताजा दही)", "Buttermilk/Chhaachh (छाछ)", "Boiled Milk (गुनगुना दूध)", "Paneer (पनीर)"]
    },
    {
      id: "fruits",
      name: "Seasonal Fruits",
      nameHi: "मौसमी ताजे फल (केला, संतरा, अमरूद)",
      nameMr: "हंगामी फळे (केळी, संत्री, पेरू)",
      icon: "🍎",
      benefit: "Vitamin C helps absorb iron, prevents constipation",
      items: ["Guava (अमरूद - high Vit C)", "Banana (केला)", "Amla (आंवला)", "Orange/Mosambi (मौसंबी)"]
    },
    {
      id: "nuts",
      name: "Nuts and seeds",
      nameHi: "मूंगफली, तिल और बीज",
      nameMr: "शेंगदाणे, तीळ आणि बिया",
      icon: "🥜",
      benefit: "Healthy fats & omega-3 for baby brain growth",
      items: ["Roasted Peanuts (मूंगफली)", "White Sesame/Til (तिल)", "Flaxseeds (अलसी)", "Walnuts/Almonds"]
    },
    {
      id: "grains",
      name: "Whole grains",
      nameHi: "साबुत अनाज (दलिया, ज्वार, बाजरा, रागी)",
      nameMr: "तृणधान्ये (दलिया, ज्वारी, बाजरी, नाचणी)",
      icon: "🌾",
      benefit: "Sustained stamina, prevents gestational fatigue",
      items: ["Ragi / Nachni (नाचणी - highest calcium)", "Jowar / Bajra roti", "Daliya (गेहूं दलिया)", "Brown/Handpound Rice"]
    }
  ],

  // Nausea friendly alternatives
  nauseaAlternatives: [
    {
      title: "Ginger Lemon Infusion + Dry Khakhra",
      titleHi: "अदरक-नींबू पानी + सूखा खाखरा",
      descHi: "खाली पेट जी मिचलाना कम करता है और पेट को शांत रखता है।"
    },
    {
      title: "Roasted Makhana with mild rock salt",
      titleHi: "हल्के सेंधा नमक के साथ भुना मखाना",
      descHi: "पचने में आसान और बिना किसी गंध के कैल्शियम प्रदान करता है।"
    },
    {
      title: "Moong Dal Soup with cumin",
      titleHi: "जीरे का तड़का लगा मूंग दाल सूप",
      descHi: "उल्टी के बाद शरीर में इलेक्ट्रोलाइट्स और ताकत वापस लाता है।"
    }
  ]
};
