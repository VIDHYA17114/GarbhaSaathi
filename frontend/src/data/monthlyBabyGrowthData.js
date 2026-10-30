/**
 * monthlyBabyGrowthData.js
 * 
 * Reviewed fetal growth and maternal health content for each of the 9 pregnancy months.
 * 
 * Conforms to clinical gestational staging (FOGSI & WHO Maternal Care Guidelines).
 * NOTE: All size comparisons, weights, and development descriptions are educational
 * approximations and do NOT replace ultrasound assessment or clinical measurement.
 */

export const monthlyBabyGrowthData = [
  {
    monthNumber: 1,
    title: "First Month",
    titleHi: "पहला महीना",
    titleMr: "पहिला महिना",
    weekRange: "Weeks 1–4",
    weeksTextHi: "सप्ताह 1–4",
    trimester: 1,
    trimesterName: "First Trimester",
    trimesterNameHi: "पहला त्रैमास (Trimester 1)",
    staticImagePath: "/fetal_stages/month_1.png",
    animationPath: "/fetal_stages/month_1.png",
    approximateSize: "Poppy Seed (~0.1–0.2 cm)",
    sizeComparisonHi: "खसखस का बीज (~0.1–0.2 सेमी)",
    sizeIcon: "🌱",
    lengthCm: "0.1–0.2",
    weightGrams: "< 1",
    stageName: "Embryonic Implantation & Cell Cleavage",
    stageNameHi: "भ्रूण रोपण एवं कोशिकीय नींव",
    developmentDescription: "The fertilized egg travels to the uterus and implants in the uterine wall. The blastocyst divides into the embryo and placenta, forming the primitive neural groove and yolk sac.",
    developmentDescriptionHi: "निषेचित अंड गर्भाशय में स्थापित (Implant) होता है। ब्लास्टोसिस्ट विभाजित होकर भ्रूण और गर्भनाल (Placenta) का रूप लेता है। मस्तिष्क और रीढ़ की नींव (Neural tube) बनना शुरू होती है।",
    anatomicalHighlights: [
      { en: "Blastocyst implants into nourishing uterine endometrium", hi: "गर्भाशय की परत में भ्रूण का सुरक्षित रोपण" },
      { en: "Formation of amniotic sac and primary yolk sac", hi: "एम्नियोटिक थैली और योक सैक का निर्माण" },
      { en: "Neural tube (brain and spinal cord) starts closing", hi: "मस्तिष्क और रीढ़ की हड्डी की प्रारंभिक संरचना" },
      { en: "Primitive heart tube begins molecular pulsation", hi: "हृदय वाहिका में प्रारंभिक स्पंदन का आरंभ" }
    ],
    focusPoints: [
      { text: "Folic acid supplement 400–500 mcg daily to prevent neural tube defects", textHi: "न्यूरल ट्यूब विकारों से बचाव हेतु दैनिक फोलिक एसिड (400-500 mcg) अवश्य लें" },
      { text: "Avoid unpasteurized dairy, raw papaya and self-medication", textHi: "कच्चा पपीता, अनपाश्चुरीकृत दूध और बिना डॉक्टर की सलाह की दवाओं से बचें" },
      { text: "Drink warm boiled water and get gentle 8–9 hours of sleep", textHi: "उबला गुनगुना पानी पिएं और 8-9 घंटे की पर्याप्त नींद लें" }
    ],
    recommendedFoods: [
      { name: "Spinach & Methi", nameHi: "पालक व मेथी", reasonHi: "प्राकृतिक फोलेट और रक्त निर्माण हेतु" },
      { name: "Moong Dal Soup", nameHi: "मूंग दाल सूप", reasonHi: "सुपाच्य प्रोटीन और कोशिकीय पोषण" },
      { name: "Boiled Milk with pinch of Turmeric", nameHi: "हल्दी वाला गुनगुना दूध", reasonHi: "कैल्शियम और गर्भाशय को पोषण" },
      { name: "Seasonal Bananas", nameHi: "केला", reasonHi: "विटामिन B6 और पेट की सहजता" }
    ],
    clinicalTests: "Urine pregnancy confirmation test (UPT) and baseline CBC, Blood Grouping & Thyroid checkup.",
    clinicalTestsHi: "गर्भ जांच (UPT) और बुनियादी सीबीसी, ब्लड ग्रुप व थायरॉइड की प्रारंभिक रक्त जांच।",
    source: "WHO & FOGSI Reviewed Maternal Care Protocols",
    lastReviewedDate: "2026-03-20",
    visualStage: "embryo-early",
    heartRateBpm: "100–115 bpm (forming)"
  },
  {
    monthNumber: 2,
    title: "Second Month",
    titleHi: "दूसरा महीना",
    titleMr: "दुसरा महिना",
    weekRange: "Weeks 5–8",
    weeksTextHi: "सप्ताह 5–8",
    trimester: 1,
    trimesterName: "First Trimester",
    trimesterNameHi: "पहला त्रैमास (Trimester 1)",
    staticImagePath: "/fetal_stages/month_2.png",
    animationPath: "/fetal_stages/month_2.png",
    approximateSize: "Raspberry (~1.6 cm, ~1g)",
    sizeComparisonHi: "रसभरी / छोटा अंगूर (~1.6 सेमी, ~1 ग्राम)",
    sizeIcon: "🍇",
    lengthCm: "1.6",
    weightGrams: "1",
    stageName: "Heartbeat & Limb Buds Emergence",
    stageNameHi: "हार्टबीट की शुरुआत और नन्हे हाथ-पैर",
    developmentDescription: "Baby's tiny heart is beating rapidly at 110–160 bpm. Tiny paddle-shaped arm and leg buds form. Facial features like dark eye spots, nostrils, and mouth groove take shape.",
    developmentDescriptionHi: "शिशु के नन्हे दिल की धड़कन 110-160 प्रति मिनट की गति से चलने लगती है। पैडल जैसे नन्हे हाथ-पैर और आंख-नाक के प्रारंभिक बिंदु स्पष्ट होने लगते हैं।",
    anatomicalHighlights: [
      { en: "Heart chambers develop with rhythmic ultrasonic heartbeat", hi: "सोनोग्राफी में स्पष्ट सुनाई देने वाली नन्हीं धड़कन" },
      { en: "Limb buds branch into early webbed fingers & toes", hi: "हाथ और पैरों के नन्हे पोरों का अंकुरण" },
      { en: "Major digestive and bronchial systems outline", hi: "पाचन तंत्र और श्वास नलिकाओं की प्रारंभिक रूपरेखा" },
      { en: "Facial cartilage and inner ear canals forming", hi: "चेहरे की हड्डियां और भीतरी कान का निर्माण" }
    ],
    focusPoints: [
      { text: "Manage morning sickness with dry roasted chana, khakhra & ginger lemon water", textHi: "उल्टी व जी मिचलाने से राहत के लिए भुना चना, खाखरा व अदरक-नींबू पानी लें" },
      { text: "Schedule your first dating/viability ultrasound between weeks 6 and 8", textHi: "सप्ताह 6 से 8 के बीच पहली डेटिंग अल्ट्रासाउंड सोनोग्राफी कराएं" },
      { text: "Stay calm during peak hormonal fatigue with short afternoon naps", textHi: "हार्मोनल थकान के समय दोपहर में 30 मिनट का विश्राम अवश्य लें" }
    ],
    recommendedFoods: [
      { name: "Ginger Lemon Infusion", nameHi: "अदरक-नींबू पानी", reasonHi: "प्राकृतिक रूप से उल्टी व मतली रोके" },
      { name: "Dry Roasted Chana", nameHi: "भुना चना", reasonHi: "आयरन और सुबह की कमजोरी दूर करे" },
      { name: "Fresh Curd (Dahi)", nameHi: "ताजा दही", reasonHi: "गट हेल्थ और आंतों को ठंडक" },
      { name: "Sweet Pomegranate", nameHi: "अनार के दाने", reasonHi: "एंटीऑक्सीडेंट और हीमोग्लोबिन वर्धक" }
    ],
    clinicalTests: "Early Dating / Viability Ultrasound (Transvaginal/Abdominal) to confirm intrauterine gestational sac and cardiac activity.",
    clinicalTestsHi: "डेटिंग अल्ट्रासाउंड (सोनोग्राफी) द्वारा गर्भ की स्थिति और हृदय स्पंदन की पुष्टि।",
    source: "WHO & FOGSI Reviewed Maternal Care Protocols",
    lastReviewedDate: "2026-03-20",
    visualStage: "embryo-curved",
    heartRateBpm: "130–160 bpm"
  },
  {
    monthNumber: 3,
    title: "Third Month",
    titleHi: "तीसरा महीना",
    titleMr: "तिसरा महिना",
    weekRange: "Weeks 9–12",
    weeksTextHi: "सप्ताह 9–12",
    trimester: 1,
    trimesterName: "First Trimester",
    trimesterNameHi: "पहला त्रैमास (Trimester 1)",
    staticImagePath: "/fetal_stages/month_3.png",
    animationPath: "/fetal_stages/month_3.png",
    approximateSize: "Plum / Lemon (~5.4 cm, ~14g)",
    sizeComparisonHi: "नींबू / आलूबुखारा (~5.4 सेमी, ~14 ग्राम)",
    sizeIcon: "🍋",
    lengthCm: "5.4",
    weightGrams: "14",
    stageName: "Transition to Fetus & Vital Organs",
    stageNameHi: "पूर्ण भ्रूण से शिशु (Fetus) में रूपांतरण",
    developmentDescription: "The embryonic tail completely recedes and baby is officially called a fetus. Delicate fingernails form, vocal cords develop, and tiny kidneys start producing urine into amniotic fluid.",
    developmentDescriptionHi: "शिशु अब भ्रूण से आगे बढ़कर 'फीटस' कहलाता है। नन्हे नाखून, पलकें और चेहरे के मानवीय भाव बन चुके हैं। नन्हे गुर्दे काम करना शुरू कर रहे हैं।",
    anatomicalHighlights: [
      { en: "Fingers and toes separate cleanly with tiny nail beds", hi: "उंगलियां अलग-अलग होकर नन्हे नाखूनों का विकास" },
      { en: "Kidneys begin functioning and excreting fluid", hi: "गुर्दों का काम शुरू और एम्नियोटिक द्रव चक्र" },
      { en: "Baby practices spontaneous curls, hiccups & stretches", hi: "शिशु द्वारा हाथ-पैर मोड़ने व हिचकी लेने का सहज अभ्यास" },
      { en: "End of critical organogenesis phase (vital organs mapped)", hi: "सभी महत्वपूर्ण आंतरिक अंगों की संरचना पूरी" }
    ],
    focusPoints: [
      { text: "Schedule crucial NT Ultrasound scan & Double Marker test (weeks 11–13)", textHi: "सप्ताह 11 से 13 के बीच महत्वपूर्ण NT Scan सोनोग्राफी अवश्य कराएं" },
      { text: "Transition to iron-rich diet paired with lemon for absorption", textHi: "दाल व पोहे में नींबू का रस डालकर आयरन अवशोषण दोगुना करें" },
      { text: "Celebrate completing the first trimester milestone", textHi: "पहले त्रैमास की पूर्णता के साथ मन को शांत व सकारात्मक रखें" }
    ],
    recommendedFoods: [
      { name: "Poha with Peanuts & Lemon", nameHi: "नींबू-मूंगफली पोहा", reasonHi: "आयरन और विटामिन C का आदर्श मेल" },
      { name: "Fresh Buttermilk (Chhaachh)", nameHi: "ताजा छाछ", reasonHi: "कैल्शियम और पेट की जलन में राहत" },
      { name: "Masoor Dal with Spinach", nameHi: "मसूर दाल व पालक", reasonHi: "प्रोटीन, फोलेट और हीमोग्लोबिन" },
      { name: "Guava (Amrood)", nameHi: "ताजा अमरूद", reasonHi: "फाइबर और प्राकृतिक विटामिन C" }
    ],
    clinicalTests: "Nuchal Translucency (NT) Scan + First Trimester Maternal Serum Screening (Double Marker).",
    clinicalTestsHi: "एनटी अल्ट्रासाउंड स्कैन (NT Scan) एवं डबल मार्कर रक्त परीक्षण।",
    source: "WHO & FOGSI Reviewed Maternal Care Protocols",
    lastReviewedDate: "2026-03-20",
    visualStage: "fetus-early",
    heartRateBpm: "150–165 bpm"
  },
  {
    monthNumber: 4,
    title: "Fourth Month",
    titleHi: "चौथा महीना",
    titleMr: "चौथा महिना",
    weekRange: "Weeks 13–16",
    weeksTextHi: "सप्ताह 13–16",
    trimester: 2,
    trimesterName: "Second Trimester",
    trimesterNameHi: "दूसरा त्रैमास (Trimester 2)",
    staticImagePath: "/fetal_stages/month_4.png",
    animationPath: "/fetal_stages/month_4.png",
    approximateSize: "Avocado (~11.6 cm, ~100g)",
    sizeComparisonHi: "एवोकाडो / नाशपाती (~11.6 सेमी, ~100 ग्राम)",
    sizeIcon: "🥑",
    lengthCm: "11.6",
    weightGrams: "100",
    stageName: "Second Trimester Golden Energy & Reflexes",
    stageNameHi: "ऊर्जा की वापसी और अंगूठा चूसने का अभ्यास",
    developmentDescription: "Morning sickness diminishes and energy returns. Baby can squint, frown, and suck its thumb. Fine translucent downy hair called lanugo covers the skin to retain warmth.",
    developmentDescriptionHi: "उल्टी व थकान कम होती है और चेहरे पर चमक आती है। शिशु अंगूठा चूसना सीखता है और प्रकाश के प्रति संवेदनशील होता है। त्वचा पर महीन रोंए (Lanugo) बनते हैं।",
    anatomicalHighlights: [
      { en: "Proportionate skeletal growth and neck elongation", hi: "गर्दन और धड़ का स्वाभाविक अनुपात में बढ़ना" },
      { en: "Baby can suck thumb, swallow and make facial expressions", hi: "अंगूठा चूसने और चेहरे पर मुस्कान-सकुचाहट की अभिव्यक्ति" },
      { en: "Fine lanugo hair covers body protecting tender skin", hi: "कोमल त्वचा की सुरक्षा के लिए महीन लैनुगो बाल" },
      { en: "External genitalia clearly differentiated", hi: "बाह्य जननांगों का स्पष्ट विभेदीकरण" }
    ],
    focusPoints: [
      { text: "Start daily Calcium & Vitamin D3 supplements (separate from Iron by 2 hrs)", textHi: "कैल्शियम व विटामिन D की गोलियां शुरू करें (आयरन से 2 घंटे के अंतर पर)" },
      { text: "Sleep predominantly on your left side to maintain optimal placental perfusion", textHi: "गर्भनाल में उत्तम रक्तसंचार के लिए बाईं करवट (Left side) सोने की आदत बनाएं" },
      { text: "Engage in 20 minutes of calm walking and prenatal yoga stretches", textHi: "प्रतिदिन 20 मिनट शांत चहलकदमी और हल्के प्राणायाम करें" }
    ],
    recommendedFoods: [
      { name: "Paneer & Sesame (Til)", nameHi: "ताजा पनीर व सफेद तिल", reasonHi: "हड्डियों के लिए भरपूर कैल्शियम" },
      { name: "Whole Grain Daliya", nameHi: "सब्जियों वाला दलिया", reasonHi: "स्थिर ऊर्जा और कब्ज से बचाव" },
      { name: "Roasted Makhana", nameHi: "भुना मखाना", reasonHi: "मैग्नीशियम और हल्का पौष्टिक नाश्ता" },
      { name: "Sweet Lime (Mosambi)", nameHi: "मौसंबी का रस", reasonHi: "विटामिन C और शरीर में ताजगी" }
    ],
    clinicalTests: "Routine Antenatal Blood Pressure, Weight Tracking, and Quadruple Marker test (if recommended by obstetrician).",
    clinicalTestsHi: "नियमित रक्तचाप, वजन निगरानी एवं डॉक्टर के परामर्श अनुसार क्वाड्रुपल मार्कर जांच।",
    source: "WHO & FOGSI Reviewed Maternal Care Protocols",
    lastReviewedDate: "2026-03-20",
    visualStage: "fetus-thumb-suck",
    heartRateBpm: "145–160 bpm"
  },
  {
    monthNumber: 5,
    title: "Fifth Month",
    titleHi: "पांचवां महीना",
    titleMr: "पाचवा महिना",
    weekRange: "Weeks 17–20",
    weeksTextHi: "सप्ताह 17–20",
    trimester: 2,
    trimesterName: "Second Trimester",
    trimesterNameHi: "दूसरा त्रैमास (Trimester 2)",
    staticImagePath: "/fetal_stages/month_5.png",
    animationPath: "/fetal_stages/month_5.png",
    approximateSize: "Banana (~16.4 cm, ~300g)",
    sizeComparisonHi: "केला (~16.4 सेमी, ~300 ग्राम)",
    sizeIcon: "🍌",
    lengthCm: "16.4",
    weightGrams: "300",
    stageName: "Quickening (First Kicks) & Hearing",
    stageNameHi: "शिशु की पहली हलचल (Quickening) व सुनने की शक्ति",
    developmentDescription: "You feel the magical first butterfly flutters (quickening)! Baby's ears are fully formed, allowing it to hear your voice, heartbeat, and soothing music. Vernix caseosa coats the skin.",
    developmentDescriptionHi: "पेट में तितली के पंखों जैसी पहली हल्की हलचल महसूस होती है! शिशु के कान पूरी तरह बन चुके हैं, वह मां की आवाज, दिल की धड़कन और लोरी सुन सकता है।",
    anatomicalHighlights: [
      { en: "Auditory system operational — baby recognizes maternal voice", hi: "श्रवण तंत्र सक्रिय — शिशु मां की आवाज पहचानने लगता है" },
      { en: "Vernix caseosa (protective creamy coating) envelops body", hi: "त्वचा पर सुरक्षात्मक वर्निक्स की परत" },
      { en: "Sensory brain centers for taste, smell, sound & touch advance", hi: "स्वाद, गंध और स्पर्श के दिमागी केंद्रों का तेज विकास" },
      { en: "Frequent tumbling and coordinated limb movements", hi: "हाथ-पैर चलाने व गुलाटियां मारने की नियमित हलचलें" }
    ],
    focusPoints: [
      { text: "Schedule the comprehensive TIFFA / Anomaly Scan (weeks 18–20)", textHi: "सप्ताह 18 से 20 के बीच अति-महत्वपूर्ण TIFFA / Anomaly Scan अवश्य कराएं" },
      { text: "Talk, sing, and read positive spiritual stories to baby daily (Garbh Sanskar)", textHi: "शिशु से शांत मन से बातें करें, गर्भ संस्कार भजन व प्रेरक कथाएं सुनाएं" },
      { text: "Monitor swelling in feet; elevate legs while resting", textHi: "पैरों में सूजन न आने दें, बैठते समय पैरों को सहारा देकर ऊंचा रखें" }
    ],
    recommendedFoods: [
      { name: "Sprouted Moong & Chana", nameHi: "अंकुरित मूंग व चना", reasonHi: "पौधों का जीवित प्रोटीन और फोलेट" },
      { name: "Walnuts & Almonds", nameHi: "भिगोए बादाम व अखरोट", reasonHi: "मस्तिष्क विकास हेतु ओमेगा-3" },
      { name: "Coconut Water", nameHi: "ताजा नारियल पानी", reasonHi: "एम्नियोटिक द्रव स्तर व इलेक्ट्रोलाइट्स" },
      { name: "Methi & Ragi Roti", nameHi: "नाचणी / रागी रोटी", reasonHi: "उच्चतम प्राकृतिक कैल्शियम व आयरन" }
    ],
    clinicalTests: "Targeted Imaging for Fetal Anomalies (TIFFA / Level II Ultrasound Scan) + Uterine Artery Doppler.",
    clinicalTestsHi: "महत्वपूर्ण विसंगति स्कैन (TIFFA / Level-2 Sonography) एवं गर्भाशय रक्तप्रवाह जांच।",
    source: "WHO & FOGSI Reviewed Maternal Care Protocols",
    lastReviewedDate: "2026-03-20",
    visualStage: "fetus-listening",
    heartRateBpm: "140–155 bpm"
  },
  {
    monthNumber: 6,
    title: "Sixth Month",
    titleHi: "छठा महीना",
    titleMr: "सहावा महिना",
    weekRange: "Weeks 21–24",
    weeksTextHi: "सप्ताह 21–24",
    trimester: 2,
    trimesterName: "Second Trimester",
    trimesterNameHi: "दूसरा त्रैमास (Trimester 2)",
    staticImagePath: "/fetal_stages/month_6.png",
    animationPath: "/fetal_stages/month_6.png",
    approximateSize: "Ear of Corn (~30 cm, ~600g)",
    sizeComparisonHi: "मक्के का भुट्टा (~30 सेमी, ~600 ग्राम)",
    sizeIcon: "🌽",
    lengthCm: "30",
    weightGrams: "600",
    stageName: "Sleep-Wake Cycles & Lung Alveoli",
    stageNameHi: "सोने-जागने का चक्र और फेफड़ों का विकास",
    developmentDescription: "Baby establishes definite sleep and active cycles. Eyebrows and eyelashes are fully visible. The lungs begin producing surfactant, a substance vital for breathing air after birth.",
    developmentDescriptionHi: "शिशु के सोने और जागने का नियमित समय बन जाता है। पलकें और भौंहें स्पष्ट हैं। फेफड़ों में सांस लेने वाला सर्फैक्टेंट द्रव्य बनना शुरू होता है।",
    anatomicalHighlights: [
      { en: "Well-defined circadian sleep-wake rhythm", hi: "सोने और जागने का स्पष्ट आंतरिक समय चक्र" },
      { en: "Alveoli forming in lungs with primitive surfactant secretion", hi: "फेफड़ों की वायु थैलियों का सूक्ष्म विकास" },
      { en: "Rapid footprint and fingerprint ridge definition", hi: "उंगलियों और तलवों पर स्थायी रेखाओं की पूर्णता" },
      { en: "Inner ear vestibular system controls balance in fluid", hi: "एम्नियोटिक द्रव में संतुलन बनाने का भीतरी कान का अभ्यास" }
    ],
    focusPoints: [
      { text: "Screen for gestational diabetes via Oral Glucose Tolerance Test (OGTT)", textHi: "सप्ताह 24 पर गर्भावस्था मधुमेह (शुगर) की OGTT जांच अवश्य कराएं" },
      { text: "Increase dietary fiber with whole grains to relieve pregnancy constipation", textHi: "कब्ज व बवासीर से बचाव हेतु चोकर वाला आटा, हरी सब्जियां व भरपूर पानी लें" },
      { text: "Wear supportive, flat comfortable footwear", textHi: "रीढ़ की हड्डी के आराम के लिए आरामदायक चप्पलें पहनें" }
    ],
    recommendedFoods: [
      { name: "Unpolished Brown Rice & Dal", nameHi: "मोटा चावल व दाल", reasonHi: "धीमा कार्बोहाइड्रेट और सुपाच्य प्रोटीन" },
      { name: "Guava with Seeds", nameHi: "अमरूद (सेंधा नमक सहित)", reasonHi: "कब्ज मिटाने हेतु उच्च रेशा (फाइबर)" },
      { name: "Roasted Makhana with Milk", nameHi: "मखाना व गुनगुना दूध", reasonHi: "हड्डियों को ताकत व गहरी नींद" },
      { name: "Cucumber & Tomato Salad", nameHi: "ककड़ी-टमाटर सलाद", reasonHi: "स्वाभाविक जलयोजन और विटामिन" }
    ],
    clinicalTests: "Oral Glucose Tolerance Test (OGTT 75g) for Gestational Diabetes Mellitus (GDM) + Hemoglobin check.",
    clinicalTestsHi: "गर्भावस्था शुगर जांच (OGTT 75 ग्राम ग्लूकोज टेस्ट) एवं हीमोग्लोबिन स्तर की जांच।",
    source: "WHO & FOGSI Reviewed Maternal Care Protocols",
    lastReviewedDate: "2026-03-20",
    visualStage: "fetus-kicking",
    heartRateBpm: "135–150 bpm"
  },
  {
    monthNumber: 7,
    title: "Seventh Month",
    titleHi: "सातवां महीना",
    titleMr: "सातवा महिना",
    weekRange: "Weeks 25–28",
    weeksTextHi: "सप्ताह 25–28",
    trimester: 3,
    trimesterName: "Third Trimester",
    trimesterNameHi: "तीसरा त्रैमास (Trimester 3)",
    staticImagePath: "/fetal_stages/month_7.png",
    animationPath: "/fetal_stages/month_7.png",
    approximateSize: "Eggplant (~37.6 cm, ~1 kg)",
    sizeComparisonHi: "बैंगन (~37.6 सेमी, ~1 किलोग्राम)",
    sizeIcon: "🍆",
    lengthCm: "37.6",
    weightGrams: "1000",
    stageName: "Eye Opening & Brain Cortex Expansion",
    stageNameHi: "पलकें खोलना और दिमागी सलवटों का विस्तार",
    developmentDescription: "Welcome to the third trimester! Baby opens its eyes and can blink. Billions of neurons multiply in the cerebral cortex. Fat deposits smooth out wrinkles, making skin plump and rosy.",
    developmentDescriptionHi: "तीसरे त्रैमास में प्रवेश! शिशु आंखें खोलता है और पलकें झपकाता है। मस्तिष्क की नसें अरबों कनेक्शन बनाती हैं। वसा जमने से त्वचा कोमल व गुलाबी होती है।",
    anatomicalHighlights: [
      { en: "Eyes open; pupils react to external light through belly", hi: "आंखें खुलती हैं; तेज रोशनी पर पुतली सिकुड़ती है" },
      { en: "Brain weight surges with deep cortical folding", hi: "मस्तिष्क के वजन में उछाल और दिमागी सलवटों का निर्माण" },
      { en: "Adipose fat cushions body temperature regulation", hi: "शरीर का तापमान नियंत्रित करने वाली चर्बी का जमाव" },
      { en: "Regular rhythmic hiccup sensations felt by mother", hi: "मां को पेट में नियमित हिचकी जैसी धड़कन महसूस होना" }
    ],
    focusPoints: [
      { text: "Start daily kick counting: expect at least 10 distinct movements within 2 hours", textHi: "प्रतिदिन किक काउंटिंग शुरू करें: 2 घंटे में कम से कम 10 हलचलें सामान्य हैं" },
      { text: "Administer Anti-D injection at 28 weeks if Rh-negative mother", textHi: "यदि आपका ब्लड ग्रुप Rh-Negative है, तो 28वें हफ्ते एंटी-डी टीका लगवाएं" },
      { text: "Eat small, frequent protein-rich meals to avoid late-night heartburn", textHi: "एसिडिटी से बचने के लिए सोने से 2 घंटे पहले हल्का भोजन लें" }
    ],
    recommendedFoods: [
      { name: "Moong Sprouts & Peanuts", nameHi: "अंकुरित मूंग व भुनी मूंगफली", reasonHi: "शिशु के वजन बढ़ाने हेतु शुद्ध प्रोटीन" },
      { name: "Flaxseeds (Alsi) Powder", nameHi: "पिसी अलसी", reasonHi: "मस्तिष्क व आंखों के लिए ओमेगा-3" },
      { name: "Boiled Eggs / Paneer", nameHi: "उबला अंडा / ताजा पनीर", reasonHi: "पूर्ण अमीनो एसिड और कैल्शियम" },
      { name: "Amla / Orange", nameHi: "आंवला या संतरा", reasonHi: "आयरन सोखने के लिए विटामिन C" }
    ],
    clinicalTests: "Third Trimester Growth Ultrasound + Complete Blood Count + Rh-Antibody Titer (for Rh-negative mothers).",
    clinicalTestsHi: "ग्रोथ अल्ट्रासाउंड सोनोग्राफी, हीमोग्लोबिन स्तर एवं Rh-नेगेटिव माताओं के लिए एंटीबॉडी जांच।",
    source: "WHO & FOGSI Reviewed Maternal Care Protocols",
    lastReviewedDate: "2026-03-20",
    visualStage: "fetus-eyes-open",
    heartRateBpm: "130–145 bpm"
  },
  {
    monthNumber: 8,
    title: "Eighth Month",
    titleHi: "आठवां महीना",
    titleMr: "आठवा महिना",
    weekRange: "Weeks 29–32",
    weeksTextHi: "सप्ताह 29–32",
    trimester: 3,
    trimesterName: "Third Trimester",
    trimesterNameHi: "तीसरा त्रैमास (Trimester 3)",
    staticImagePath: "/fetal_stages/month_8.png",
    animationPath: "/fetal_stages/month_8.png",
    approximateSize: "Pineapple (~43 cm, ~1.7–1.9 kg)",
    sizeComparisonHi: "अनानास (~43 सेमी, ~1.7–1.9 किग्रा)",
    sizeIcon: "🍍",
    lengthCm: "43",
    weightGrams: "1800",
    stageName: "Rapid Weight Gain & Bone Hardening",
    stageNameHi: "तेजी से वजन वृद्धि और हड्डियों का सुदृढ़ीकरण",
    developmentDescription: "Baby gains about 200–250 grams per week! Bones are fully formed though skull remains soft and pliable for birth. Space inside is tight, turning kicks into strong rolls and elbow nudges.",
    developmentDescriptionHi: "शिशु हर हफ्ते लगभग 200-250 ग्राम वजन बढ़ाता है! हड्डियां मजबूत हो रही हैं पर खोपड़ी जन्म के लिए लचीली है। पेट में जगह कम होने से हलचलें कोहनी-घुटने के दबाव जैसी लगती हैं।",
    anatomicalHighlights: [
      { en: "Rapid weekly weight accretion with thick subcutaneous fat", hi: "सप्ताहिक 250 ग्राम वजन वृद्धि और सुडौल शरीर" },
      { en: "Bone mineralization draws heavily from maternal calcium reserves", hi: "हड्डियों को मजबूत करने हेतु मां से कैल्शियम अवशोषण" },
      { en: "Immune antibodies transfer across placenta from mother", hi: "मां से शिशु में सुरक्षात्मक एंटीबॉडीज का प्राकृतिक प्रवाह" },
      { en: "Practices continuous breathing movements with amniotic fluid", hi: "फेफड़ों द्वारा एम्नियोटिक द्रव से सांस लेने का अनवरत अभ्यास" }
    ],
    focusPoints: [
      { text: "Watch for signs of pre-eclampsia: sudden facial swelling, headache, vision blur", textHi: "खतरे के लक्षण पहचानें: चेहरे पर अचानक सूजन, सिरदर्द या आंखों में धुंधलापन (108 पर संपर्क)" },
      { text: "Prepare your delivery hospital bag with baby essentials & medical records", textHi: "अस्पताल ले जाने वाली डिलीवरी फाइल, कपड़े व कागजात तैयार रखें" },
      { text: "Practice slow deep breathing and pelvic relaxation exercises", textHi: "प्रसव को सरल बनाने हेतु गहरी सांस व पेल्विक रिलैक्सेशन व्यायाम करें" }
    ],
    recommendedFoods: [
      { name: "Full Cream Milk / Dahi", nameHi: "ताजा दूध व गाढ़ा दही", reasonHi: "हड्डियों की सघनता हेतु कैल्शियम" },
      { name: "Khajoor (Dates) with Milk", nameHi: "खजूर व गुनगुना दूध", reasonHi: "स्वाभाविक ताकत व प्रसव मांसपेशियों को लचीलापन" },
      { name: "Methi & Palak Sabzi", nameHi: "मेथी-पालक भाजी", reasonHi: "आयरन और बच्चे का सही वजन" },
      { name: "Til-Gud Ladoo (1 small)", nameHi: "तिल-गुड़ का छोटा लड्डू", reasonHi: "पारंपरिक खनिज व ऊर्जा" }
    ],
    clinicalTests: "Biophysical Profile (BPP) Ultrasound + Fetal Doppler + Urine Albumin & Blood Pressure monitoring.",
    clinicalTestsHi: "बायोफिजिकल प्रोफाइल (BPP) सोनोग्राफी, भ्रूण डॉपलर एवं मूत्र में एल्बुमिन/ब्लड प्रेशर जांच।",
    source: "WHO & FOGSI Reviewed Maternal Care Protocols",
    lastReviewedDate: "2026-03-20",
    visualStage: "fetus-snug",
    heartRateBpm: "125–140 bpm"
  },
  {
    monthNumber: 9,
    title: "Ninth Month",
    titleHi: "नौवां महीना",
    titleMr: "नववा महिना",
    weekRange: "Weeks 33–40",
    weeksTextHi: "सप्ताह 33–40",
    trimester: 3,
    trimesterName: "Third Trimester",
    trimesterNameHi: "तीसरा त्रैमास (Trimester 3)",
    staticImagePath: "/fetal_stages/month_9.png",
    animationPath: "/fetal_stages/month_9.png",
    approximateSize: "Watermelon (~50 cm, ~2.8–3.4 kg)",
    sizeComparisonHi: "तरबूज / कद्दू (~50 सेमी, ~2.8–3.4 किग्रा)",
    sizeIcon: "🍉",
    lengthCm: "50",
    weightGrams: "3100",
    stageName: "Full Term Maturity & Birth Readiness",
    stageNameHi: "पूर्ण परिपक्वता एवं प्रसव की तैयारी",
    developmentDescription: "Baby is fully term and ready to enter the world! Baby drops lower into the pelvic cradle (cephalic / head-down position). Lungs and digestive reflexes are mature to breathe air and nurse.",
    developmentDescriptionHi: "शिशु पूरी तरह तैयार है और सिर नीचे की ओर (Cephalic) आकर श्रोणि में स्थापित हो चुका है। फेफड़े और आंतें बाहर की दुनिया में सांस लेने और स्तनपान के लिए पूरी तरह परिपक्व हैं।",
    anatomicalHighlights: [
      { en: "Cephalic engagement — baby's head settles snugly into pelvis", hi: "शिशु का सिर नीचे आकर प्रसव के लिए सही स्थिति में स्थित" },
      { en: "Mature pulmonary surfactant production ready for first breath", hi: "फेफड़े पहली सांस लेने के लिए 100% परिपक्व" },
      { en: "Loss of lanugo hair; thick vernix protects during labor", hi: "शरीर के रोंए झड़ चुके हैं; चिकनी त्वचा जन्म के लिए तैयार" },
      { en: "Firm grasp reflex and active suckling reflex established", hi: "हाथ की पकड़ और स्तनपान चूसने का प्राकृतिक रिफ्लेक्स परिपूर्ण" }
    ],
    focusPoints: [
      { text: "Recognize true labor contractions (regular, intensifying, every 5 mins) vs Braxton Hicks", textHi: "सच्चे प्रसव दर्द (हर 5 मिनट में, तेज होने वाले) और झूठे दर्द में अंतर समझें" },
      { text: "Keep 108/102 emergency ambulance and designated hospital contact speed-dialed", textHi: "108/102 एम्बुलेंस, डॉक्टर और वाहन का संपर्क नंबर घर के सभी सदस्यों के पास रखें" },
      { text: "Stay calm, practice slow breathing, and trust your body's maternal strength", textHi: "सकारात्मक व शांत रहें — मातृत्व प्रकृति की सबसे सुंदर व समर्थ शक्ति है" }
    ],
    recommendedFoods: [
      { name: "Light Moong Dal Khichdi", nameHi: "हल्की मूंग दाल खिचड़ी", reasonHi: "सुपाच्य, पेट हल्का और प्रसव ऊर्जा" },
      { name: "Coconut Water & ORS", nameHi: "नारियल पानी व जलजीरा", reasonHi: "शरीर में जल स्तर व इलेक्ट्रोलाइट्स" },
      { name: "Warm Milk with 1 Date", nameHi: "गुनगुना दूध व खजूर", reasonHi: "ताकत और गर्भाशय की मांसपेशियों को लचीलापन" },
      { name: "Fresh Stewed Apples", nameHi: "पका हुआ सेब", reasonHi: "हल्का मीठा और पेट को ठंडक" }
    ],
    clinicalTests: "Weekly Antenatal Checkup + Fetal Non-Stress Test (NST) + Amniotic Fluid Index (AFI) Ultrasound.",
    clinicalTestsHi: "साप्ताहिक प्रसवपूर्व जांच, नॉन-स्ट्रेस टेस्ट (NST) एवं एम्नियोटिक द्रव स्तर (AFI) सोनोग्राफी।",
    source: "WHO & FOGSI Reviewed Maternal Care Protocols",
    lastReviewedDate: "2026-03-20",
    visualStage: "fetus-full-term",
    heartRateBpm: "120–140 bpm"
  }
];

/**
 * Helper to compute the estimated pregnancy month (1 to 9) from gestational week.
 *
 * @param {number|null} week - Current gestational week
 * @returns {number} Month number between 1 and 9 (defaults to 3 if week is missing)
 */
export function getMonthFromWeek(week) {
  if (week == null || isNaN(week)) return 3;
  if (week <= 4) return 1;
  if (week <= 8) return 2;
  if (week <= 12) return 3;
  if (week <= 16) return 4;
  if (week <= 20) return 5;
  if (week <= 24) return 6;
  if (week <= 28) return 7;
  if (week <= 32) return 8;
  return 9; // Week 33 to 40+
}
