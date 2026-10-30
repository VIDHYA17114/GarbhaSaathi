/**
 * nutritionFeaturesData.js
 * 
 * Data for:
 * 1. Pregnancy Safety Red Flags (Safe Food Checker)
 * 2. Symptom-Adaptive Meal Swaps (Nausea, Acidity, Constipation)
 * 3. Weekly Kirana & Mandi Grocery Checklist
 * 4. "Do Not Mix" Absorption Rules (Iron vs Calcium)
 */

// ── 1. Pregnancy Safety Red Flags (Safe Food Checker) ──
export const safeFoodCheckerData = [
  {
    id: 'raw-papaya',
    name: 'Unripe / Raw Papaya (कच्चा या अधपका पपीता)',
    status: 'avoid', // 'avoid' | 'caution' | 'safe'
    category: 'Fruits',
    riskLevel: 'High Risk (कड़ा परहेज)',
    reason: 'Contains high concentrations of latex and papain which can trigger uterine contractions and early labor.',
    reasonHi: 'कच्चे पपीते में लेटेक्स और पपेन की उच्च मात्रा होती है, जो गर्भाशय में संकुचन (Contractions) पैदा कर सकती है।',
    safeAlternative: 'Fully ripe papaya in small moderation or sweet apples/bananas.',
    safeAlternativeHi: 'पूरी तरह पका हुआ पीला पपीता सीमित मात्रा में, या सेब/केला।'
  },
  {
    id: 'raw-eggs',
    name: 'Raw or Half-boiled Eggs (कच्चे या अधपके अंडे)',
    status: 'avoid',
    category: 'Protein',
    riskLevel: 'High Risk',
    reason: 'Risk of Salmonella bacterial infection causing severe food poisoning and dehydration.',
    reasonHi: 'साल्मोनेला बैक्टीरिया के संक्रमण का खतरा, जिससे गंभीर फूड पॉइजनिंग और उल्टी-दस्त हो सकते हैं।',
    safeAlternative: 'Always eat thoroughly hard-boiled or well-cooked eggs.',
    safeAlternativeHi: 'अंडे को हमेशा पूरी तरह उबालकर या अच्छी तरह पकाकर (Hard-boiled) ही खाएं।'
  },
  {
    id: 'unpasteurized-milk',
    name: 'Raw / Unpasteurized Milk & Soft Cheese (कच्चा दूध व खुला पनीर)',
    status: 'avoid',
    category: 'Dairy',
    riskLevel: 'High Risk',
    reason: 'Can harbor Listeria monocytogenes bacteria, which can cross placenta and harm the fetus.',
    reasonHi: 'लिस्टेरिया बैक्टीरिया का खतरा जो भ्रूण तक पहुंचकर संक्रमण का कारण बन सकता है।',
    safeAlternative: 'Always boil milk thoroughly. Use fresh homemade curd or packaged pasteurized paneer.',
    safeAlternativeHi: 'दूध को हमेशा अच्छी तरह उबालें। ताजा घर का दही या पाश्चुरीकृत पनीर खाएं।'
  },
  {
    id: 'excess-caffeine',
    name: 'Excessive Tea / Coffee / Energy Drinks (अधिक चाय, कॉफी, कैफीन)',
    status: 'caution',
    category: 'Beverages',
    riskLevel: 'Moderate (सीमित रखें)',
    reason: 'Caffeine crosses placenta, affects fetal heart rate, and restricts blood flow. Tannins block iron absorption.',
    reasonHi: 'कैफीन शिशु के दिल की धड़कन बढ़ाता है और चाय के टैनिन भोजन से आयरन को शरीर में सोखने नहीं देते।',
    safeAlternative: 'Limit to 1 small cup/day. Prefer warm milk, ginger lemon water, or buttermilk.',
    safeAlternativeHi: 'दिन में अधिकतम 1 छोटा कप। गुनगुना दूध, नींबू पानी या छाछ पिएं।'
  },
  {
    id: 'street-food-water',
    name: 'Street Pani Puri / Unboiled Water / Raw Chutneys (सड़क किनारे गोलगप्पे व कच्ची चटनी)',
    status: 'avoid',
    category: 'Street Food',
    riskLevel: 'High Risk',
    reason: 'High risk of water-borne infections (Hepatitis E, Typhoid, E. Coli) dangerous during pregnancy.',
    reasonHi: 'हेपेटाइटिस ई, टाइफाइड और पेट के गंभीर संक्रमण का सबसे बड़ा स्रोत। गर्भावस्था में यह अत्यंत खतरनाक है।',
    safeAlternative: 'Make homemade mint-coriander water with boiled/filtered water.',
    safeAlternativeHi: 'उबले या फिल्टर किए पानी से घर पर ही ताजा जलजीरा या पुदीना पानी बनाएं।'
  },
  {
    id: 'pineapple-excess',
    name: 'Pineapple in Large Quantities (अनानास अधिक मात्रा में)',
    status: 'caution',
    category: 'Fruits',
    riskLevel: 'Low-Moderate (सावधानी)',
    reason: 'Contains bromelain enzyme which in massive quantities can soften cervix. A couple of slices are safe.',
    reasonHi: 'इसमें ब्रोमेलेन एंजाइम होता है। पहली तिमाही में बहुत अधिक मात्रा में खाने से बचना चाहिए, 1-2 टुकड़े सुरक्षित हैं।',
    safeAlternative: 'Guava, oranges, sweet lime (mosambi), pomegranate.',
    safeAlternativeHi: 'अमरूद, संतरा, मौसंबी, अनार बेझिझक खाएं।'
  },
  {
    id: 'alcohol-smoking',
    name: 'Alcohol, Tobacco & Gutkha (शराब, तंबाकू, बीड़ी, गुटखा)',
    status: 'avoid',
    category: 'Substances',
    riskLevel: 'Strict Zero Tolerance (पूर्ण प्रतिबंध)',
    reason: 'Causes Fetal Alcohol Syndrome, low birth weight, birth defects and fetal brain damage.',
    reasonHi: 'शिशु के मस्तिष्क का विकास रुकना, जन्मजात विकृतियां और कम वजन का सबसे मुख्य कारण।',
    safeAlternative: 'Complete avoidance throughout pregnancy and lactation.',
    safeAlternativeHi: 'गर्भावस्था और स्तनपान के दौरान पूर्ण परहेज।'
  },
  {
    id: 'ajinomoto-msg',
    name: 'Ajinomoto / MSG & Preserved Canned Foods (अजीनोमोटो व बासी डिब्बाबंद खाना)',
    status: 'avoid',
    category: 'Processed',
    riskLevel: 'Moderate',
    reason: 'High sodium content triggers water retention, swelling (edema) and sudden blood pressure spikes.',
    reasonHi: 'अत्यधिक सोडियम के कारण शरीर में सूजन (Edema) और रक्तचाप (BP) अचानक बढ़ सकता है।',
    safeAlternative: 'Freshly prepared home cooked meals with natural spices.',
    safeAlternativeHi: 'घर का बना ताजा भोजन, प्राकृतिक हल्दी-जीरा मसालों के साथ।'
  },
  {
    id: 'safe-spinach-dal',
    name: 'Cooked Spinach, Dal & Bananas (पकी पालक, दाल, केला)',
    status: 'safe',
    category: 'Safe Superfoods',
    riskLevel: 'Safe & Highly Recommended (अत्यंत लाभकारी)',
    reason: 'Rich in iron, natural folate, potassium and plant protein for healthy fetal development.',
    reasonHi: 'आयरन, प्राकृतिक फोलेट, पोटैशियम और प्रोटीन से भरपूर। शिशु के संपूर्ण विकास के लिए सर्वश्रेष्ठ।',
    safeAlternative: 'Eat daily with a squeeze of fresh lemon.',
    safeAlternativeHi: 'रोजाना भोजन में शामिल करें और ऊपर से नींबू का रस निचोड़ें।'
  }
];

// ── 2. Symptom-Adaptive Meal Swaps ──
export const symptomMealSwaps = {
  nausea: {
    id: 'nausea',
    title: 'Nausea & Morning Sickness (जी मिचलाना व उल्टी)',
    tagline: 'Dry, light, soothing foods with zero greasy smells',
    taglineHi: 'सूखा, हल्का, बिना गंध और पचने में आसान भोजन',
    tipsHi: [
      'बिस्तर से उठने से पहले सूखा खाखरा, बिस्किट या भुने चने चबाएं।',
      'भोजन में अदरक और नींबू का उपयोग करें। यह प्राकृतिक रूप से उल्टी रोकता है।',
      'एक बार में ज्यादा न खाएं, हर 2 घंटे में 2-3 निवाले लें।'
    ],
    meals: {
      breakfast: {
        title: 'Dry Khakhra / Toast + Ginger-Lemon Tea',
        titleHi: 'सूखा खाखरा / टोस्ट + अदरक-नींबू पानी',
        benefitHi: 'पेट को तुरंत शांत करता है और उल्टी की इच्छा दबाता है।',
        img: '🍞',
        time: '7:00 – 8:00 AM',
        estimatedCost: '₹10–₹20',
        prepHi: 'सुबह उठते ही बिना पानी पिए पहले 1 सूखा खाखरा या भुना चना खाएं, फिर गुनगुने पानी में थोड़ा अदरक रस और नींबू लें।'
      },
      lunch: {
        title: 'Thin Moong Dal Khichdi + Fresh Curd',
        titleHi: 'पतली मूंग दाल खिचड़ी + सादा ताजा दही',
        benefitHi: 'हल्की, पेट पर कोई दबाव नहीं और इलेक्ट्रोलाइट्स लौटाती है।',
        img: '🥣',
        time: '12:30 – 1:30 PM',
        estimatedCost: '₹20–₹35',
        prepHi: 'बिना तीखे मसालों के सिर्फ हल्दी और चुटकी भर जीरे के साथ पतली खिचड़ी बनाएं। ठंडे ताजे दही के साथ खाएं।'
      },
      eveningSnack: {
        title: 'Roasted Makhana with Rock Salt',
        titleHi: 'सेंधा नमक के साथ भुना मखाना',
        benefitHi: 'बिना किसी गंध के कैल्शियम और कुरकुरापन देता है।',
        img: '🍿',
        time: '4:00 – 5:00 PM',
        estimatedCost: '₹15–₹25',
        prepHi: 'धीमी आंच पर सूखे मखाने भूनें। थोड़ा सेंधा नमक छिड़कें। धीरे-धीरे चबाकर खाएं।'
      },
      dinner: {
        title: 'Soft Chapati + Lauki (Bottle Gourd) Sabzi',
        titleHi: 'नरम फुल्का रोटी + सादी लौकी / तोरी की सब्जी',
        benefitHi: 'पानी से भरपूर, पचने में सबसे आसान और एसिडिटी से राहत।',
        img: '🍲',
        time: '7:30 – 8:30 PM',
        estimatedCost: '₹20–₹30',
        prepHi: 'लौकी को कम तेल और जीरा-हल्दी में पकाएं। 1-2 नरम फुलके के साथ धीरे-धीरे खाएं।'
      }
    }
  },
  acidity: {
    id: 'acidity',
    title: 'Heartburn & Acidity (सीने में जलन व खट्टी डकारें)',
    tagline: 'Cooling, alkaline, non-spicy meals that heal gastric lining',
    taglineHi: 'ठंडा, क्षारीय, बिना मिर्च-मसाले का पेट को ठंडक देने वाला आहार',
    tipsHi: [
      'लाल मिर्च, गरम मसाला, खटाई और तली-भुनी चीजों से पूरी तरह बचें।',
      'भोजन के तुरंत बाद न लेटें। कम से कम 45 मिनट सीधे बैठें या टहलें।',
      'ठंडी छाछ में भुना जीरा मिलाकर पीना रामबाण इलाज है।'
    ],
    meals: {
      breakfast: {
        title: 'Oats in Cold Milk + Soaked Basil/Chia Seeds',
        titleHi: 'ठंडे दूध में भीगे ओट्स + सब्जा / सौंफ पानी',
        benefitHi: 'पेट की गर्मी शांत करता है और एसिड रिफ्लक्स रोकता है।',
        img: '🥛',
        time: '7:30 – 8:30 AM',
        estimatedCost: '₹20–₹35',
        prepHi: 'उबले ठंडे दूध में ओट्स और थोड़ा सा भिगोया हुआ सब्जा बीज मिलाएं। सौंफ चबाएं।'
      },
      lunch: {
        title: 'Steamed Rice + Yellow Moong Dal + Cucumber Raita',
        titleHi: 'सादा उबला चावल + पीली मूंग दाल + खीरा रायता',
        benefitHi: 'खीरा और दही पेट के एसिड को तुरंत न्यूट्रलाइज करते हैं।',
        img: '🍚',
        time: '12:30 – 1:30 PM',
        estimatedCost: '₹25–₹40',
        prepHi: 'चावल और पीली दाल को बिना मिर्च के बनाएं। ककड़ी/खीरे को कद्दूकस करके ताजे दही में मिलाकर रायता लें।'
      },
      eveningSnack: {
        title: 'Fresh Coconut Water + Roasted Poha',
        titleHi: 'ताजा नारियल पानी + सूखा भुना पोहा',
        benefitHi: 'प्राकृतिक इलेक्ट्रोलाइट्स और पेट के पीएच को संतुलित करता है।',
        img: '🥥',
        time: '4:00 – 5:00 PM',
        estimatedCost: '₹30–₹50',
        prepHi: 'नारियल पानी धीरे-धीरे पिएं। साथ में हल्का भुना हुआ पोहा बिना मिर्च के खाएं।'
      },
      dinner: {
        title: 'Whole Wheat Roti + Ridge Gourd (तोरई) + Chilled Buttermilk',
        titleHi: 'गेहूं रोटी + तोरई की सब्जी + भुना जीरा छाछ',
        benefitHi: 'रात को सीने में जलन नहीं होने देता, गहरी नींद में सहायक।',
        img: '🥗',
        time: '7:00 – 8:00 PM',
        estimatedCost: '₹25–₹45',
        prepHi: 'तोरई को हल्के जीरे में बनाएं। रात को सोने से 2 घंटे पहले खाएं और अंत में 1 कप छाछ लें।'
      }
    }
  },
  constipation: {
    id: 'constipation',
    title: 'Constipation & Hard Stools (कब्ज व पेट साफ न होना)',
    tagline: 'High-fiber, roughage-rich staples with healthy hydration',
    taglineHi: 'उच्च फाइबर, चोकर युक्त आटा, मौसमी फल और पर्याप्त पानी',
    tipsHi: [
      'दिन भर में कम से कम 8 से 10 गिलास गुनगुना पानी पिएं।',
      'मैदा, सूजी और बेकरी ब्रेड पूरी तरह बंद करें। चोकर वाला मोटा आटा खाएं।',
      'रात को 5-6 मुनक्का या किशमिश पानी में भिगोकर सुबह पानी सहित खाएं।'
    ],
    meals: {
      breakfast: {
        title: 'Vegetable Dalia / Daliya + Soaked Raisins',
        titleHi: 'सब्जियों वाला गेहूं दलिया + भीगी किशमिश/मुनक्का',
        benefitHi: 'अघुलनशील फाइबर आंतों की गतिशीलता (Bowel motility) तेज करता है।',
        img: '🌾',
        time: '7:30 – 8:30 AM',
        estimatedCost: '₹15–₹30',
        prepHi: 'गेहूं दलिया में गाजर, मटर और लौकी डालकर गाढ़ा पकाएं। सुबह खाली पेट 5 भीगे मुनक्के खाएं।'
      },
      lunch: {
        title: 'Unpolished Rice + Masoor Dal + Palak-Methi Sabzi',
        titleHi: 'मोटा चावल + छिलके वाली मसूर दाल + पालक-मेथी साग',
        benefitHi: 'हरी पत्तेदार सब्जियों का सेल्यूलोज मल को नरम बनाता है।',
        img: '🥬',
        time: '12:30 – 1:30 PM',
        estimatedCost: '₹30–₹45',
        prepHi: 'छिलके वाली दाल और हरी साग को कम तेल में पकाएं। दाल का पानी भरपूर मात्रा में पिएं।'
      },
      eveningSnack: {
        title: 'Ripe Guava (अमरूद) or Papaya-free Seasonal Pear',
        titleHi: 'ताजा पका अमरूद (सेंधा नमक सहित) / नाशपाती',
        benefitHi: 'अमरूद में संतरे से 4 गुना फाइबर होता है, जो कब्ज मिटाता है।',
        img: '🍐',
        time: '4:00 – 5:00 PM',
        estimatedCost: '₹10–₹25',
        prepHi: 'पके अमरूद को धोकर बीजों सहित चबाकर खाएं। ऊपर से थोड़ा भुना जीरा व सेंधा नमक छिड़कें।'
      },
      dinner: {
        title: 'Multigrain/Chana Flour Chapati + Mixed Dal + Warm Water',
        titleHi: 'चने के आटे की मिस्सी रोटी + दाल तड़का + गुनगुना पानी',
        benefitHi: 'सुबह आसानी से पेट साफ करने में मदद करता है।',
        img: '🍲',
        time: '7:30 – 8:30 PM',
        estimatedCost: '₹25–₹40',
        prepHi: 'गेहूं में 20% चना आटा मिलाकर रोटी बनाएं। सोने से पहले 1 गिलास गुनगुना पानी पिएं।'
      }
    }
  }
};

// ── 3. Weekly Kirana & Mandi Grocery Checklist ──
export const weeklyGroceryData = {
  low: {
    budgetTier: 'Low Budget (₹0–₹100/दिन)',
    estimatedWeeklyTotal: '₹350 – ₹550',
    categories: [
      {
        category: 'Grains & Flours (अनाज व आटा)',
        icon: '🌾',
        items: [
          { name: 'Whole Wheat Flour (गेहूं आटा)', qty: '2.5 kg', est: '₹90', checked: false },
          { name: 'Rice (चावल - मोटा या उसना)', qty: '1.5 kg', est: '₹60', checked: false },
          { name: 'Poha / Flattened Rice (पोहा)', qty: '500 g', est: '₹25', checked: false }
        ]
      },
      {
        category: 'Dals & Pulses (दालें व प्रोटीन)',
        icon: '🍲',
        items: [
          { name: 'Moong Dal (पीली मूंग दाल)', qty: '500 g', est: '₹55', checked: false },
          { name: 'Roasted Chana (भुना चना)', qty: '500 g', est: '₹45', checked: false },
          { name: 'Kala Chana / Masoor Dal', qty: '500 g', est: '₹50', checked: false }
        ]
      },
      {
        category: 'Local Mandi Vegetables (सब्जी मंडी)',
        icon: '🥬',
        items: [
          { name: 'Fresh Spinach / Leafy Greens (पालक/मेथी)', qty: '3 bunches', est: '₹30', checked: false },
          { name: 'Potatoes & Onions (आलू व प्याज)', qty: '2 kg each', est: '₹70', checked: false },
          { name: 'Tomatoes & Lemons (टमाटर व 6 नींबू)', qty: '1 kg + lemons', est: '₹45', checked: false },
          { name: 'Lauki / Seasonal Sabzi (लौकी)', qty: '1 piece', est: '₹20', checked: false }
        ]
      },
      {
        category: 'Nutrition Boosters (पौष्टिक सामग्री)',
        icon: '🥜',
        items: [
          { name: 'Raw Peanuts (कच्ची मूंगफली)', qty: '250 g', est: '₹30', checked: false },
          { name: 'Natural Jaggery (देसी गुड़)', qty: '500 g', est: '₹30', checked: false },
          { name: 'Seasonal Bananas (केला)', qty: '1 dozen', est: '₹40', checked: false }
        ]
      }
    ]
  },
  medium: {
    budgetTier: 'Medium Budget (₹101–₹200/दिन)',
    estimatedWeeklyTotal: '₹700 – ₹1100',
    categories: [
      {
        category: 'Grains & Flours (अनाज व आटा)',
        icon: '🌾',
        items: [
          { name: 'Whole Wheat Flour (गेहूं आटा)', qty: '3 kg', est: '₹120', checked: false },
          { name: 'Basmati or Sona Masoori Rice', qty: '2 kg', est: '₹110', checked: false },
          { name: 'Semolina / Sooji (सूजी) & Poha', qty: '1 kg total', est: '₹55', checked: false }
        ]
      },
      {
        category: 'Dals, Eggs & Dairy (प्रोटीन व डेयरी)',
        icon: '🥛',
        items: [
          { name: 'Fresh Milk / Packaged Milk (दूध)', qty: '3.5 Litres', est: '₹210', checked: false },
          { name: 'Eggs (अंडे) or Extra Dal', qty: '1 dozen', est: '₹84', checked: false },
          { name: 'Toor & Masoor Dal', qty: '1 kg', est: '₹130', checked: false },
          { name: 'Whole Green Moong (अंकुरित के लिए)', qty: '500 g', est: '₹60', checked: false }
        ]
      },
      {
        category: 'Fresh Mandi Veggies (ताजा मंडी सब्जियां)',
        icon: '🥦',
        items: [
          { name: 'Palak, Methi, Coriander (हरी सब्जियां)', qty: '4 bunches', est: '₹50', checked: false },
          { name: 'Carrots, Beans & Peas (गाजर व बींस)', qty: '1 kg total', est: '₹60', checked: false },
          { name: 'Cucumber & Curd for Raita (खीरा)', qty: '1 kg', est: '₹35', checked: false },
          { name: 'Lemons, Ginger & Garlic', qty: 'Assorted', est: '₹40', checked: false }
        ]
      },
      {
        category: 'Fruits & Dry Extras (फल व बीज)',
        icon: '🍎',
        items: [
          { name: 'Seasonal Guava / Apples / Oranges', qty: '1.5 kg', est: '₹110', checked: false },
          { name: 'Flaxseeds (अलसी) or Peanuts', qty: '250 g', est: '₹40', checked: false },
          { name: 'Desi Ghee / Sesame Oil', qty: '250 ml', est: '₹120', checked: false }
        ]
      }
    ]
  },
  high: {
    budgetTier: 'High Budget (₹200+/दिन)',
    estimatedWeeklyTotal: '₹1400 – ₹2100',
    categories: [
      {
        category: 'Grains & Organic Flours',
        icon: '🌾',
        items: [
          { name: 'Multigrain / Ragi / Wheat Flour', qty: '3 kg', est: '₹180', checked: false },
          { name: 'Brown Rice / Hand-pounded Rice', qty: '2 kg', est: '₹160', checked: false },
          { name: 'Rolled Oats (ओट्स)', qty: '1 kg', est: '₹160', checked: false }
        ]
      },
      {
        category: 'Dairy, Paneer & Proteins',
        icon: '🧀',
        items: [
          { name: 'Full Cream Milk (दूध)', qty: '5 Litres', est: '₹340', checked: false },
          { name: 'Fresh Paneer (पनीर)', qty: '500 g', est: '₹180', checked: false },
          { name: 'Organic Dals & Sprouts', qty: '1.5 kg', est: '₹190', checked: false }
        ]
      },
      {
        category: 'Superfoods, Dry Fruits & Nuts',
        icon: '🥜',
        items: [
          { name: 'Almonds & Walnuts (बादाम व अखरोट)', qty: '250 g each', est: '₹350', checked: false },
          { name: 'Phool Makhana (मखाना)', qty: '250 g', est: '₹160', checked: false },
          { name: 'Dates & Raisins (खजूर व किशमिश)', qty: '500 g', est: '₹140', checked: false }
        ]
      },
      {
        category: 'Exotic & Seasonal Fruits / Greens',
        icon: '🍓',
        items: [
          { name: 'Pomegranate / Anar (अनार)', qty: '1 kg', est: '₹180', checked: false },
          { name: 'Apples, Kiwi / Oranges', qty: '1.5 kg', est: '₹190', checked: false },
          { name: 'Organic Spinach, Broccoli & Greens', qty: 'Assorted', est: '₹90', checked: false }
        ]
      }
    ]
  }
};

// ── 4. "Do Not Mix" Rule Guide (Iron vs Calcium) ──
export const doNotMixRules = [
  {
    id: 'iron-calcium',
    title: 'Never Take Iron & Calcium Together (आयरन व कैल्शियम कभी एक साथ न लें)',
    severity: 'critical',
    rule: 'Keep a minimum 2-hour gap between Calcium (milk, curd, calcium tablet) and Iron (spinach, dal, iron tablet).',
    ruleHi: 'कैल्शियम और आयरन को हमेशा 2 घंटे के अंतर पर लें। दूध, दही या कैल्शियम की गोली के साथ कभी भी आयरन की गोली या पालक न खाएं।',
    why: 'Calcium competes for the exact same cellular receptors in the small intestine, blocking iron absorption by up to 80%, leading to maternal anemia.',
    whyHi: 'कैल्शियम और आयरन आंत में एक ही रास्ते से सोखे जाते हैं। कैल्शियम आयरन को 80% तक ब्लॉक कर देता है, जिससे हीमोग्लोबिन नहीं बढ़ता।'
  },
  {
    id: 'iron-vitamin-c',
    title: 'Always Pair Iron with Vitamin C (आयरन के साथ हमेशा विटामिन C लें)',
    severity: 'benefit',
    rule: 'Squeeze fresh lemon over dal, poha, sabzi, or eat an amla/guava with iron-rich meals.',
    ruleHi: 'दाल, पोहा, हरी सब्जी या चने पर हमेशा ताजा नींबू निचोड़ें, या साथ में आंवला/अमरूद खाएं।',
    why: 'Ascorbic acid (Vitamin C) changes non-heme plant iron into an easily absorbable form, doubling its absorption into maternal blood.',
    whyHi: 'विटामिन C पौधे वाले आयरन को घुलनशील बनाकर खून में इसका अवशोषण दोगुना से तीन गुना कर देता है।'
  },
  {
    id: 'tea-coffee-tannins',
    title: 'No Tea or Coffee Within 1 Hour of Meals (खाने के तुरंत बाद चाय-कॉफी न पिएं)',
    severity: 'warning',
    rule: 'Wait at least 60 to 90 minutes after lunch or dinner before sipping tea or coffee.',
    ruleHi: 'दोपहर या रात के खाने के तुरंत बाद चाय या कॉफी न पिएं। कम से कम 1 से 1.5 घंटे का अंतर रखें।',
    why: 'Tannins, polyphenols, and phytates in Indian tea bind tightly to dietary iron and flush it out without body absorption.',
    whyHi: 'चाय में मौजूद टैनिन भोजन के पूरे आयरन को जकड़ लेते हैं और बिना सोखे बाहर निकाल देते हैं।'
  },
  {
    id: 'timing-schedule',
    title: 'Ideal Daily Separation Schedule (आदर्श दैनिक समय चक्र)',
    severity: 'schedule',
    schedule: [
      { time: 'Morning (सुबह):', focus: 'Calcium & Dairy (दूध, दही, छाछ, कैल्शियम गोली)' },
      { time: 'Afternoon (दोपहर):', focus: 'Iron & Greens (दाल, पालक, चना + नींबू + आयरन गोली)' },
      { time: 'Evening (शाम):', focus: 'Vitamin C & Hydration (मौसमी फल, नारियल पानी)' },
      { time: 'Bedtime (रात):', focus: 'Warm Milk (हल्दी वाला गुनगुना दूध)' }
    ]
  }
];
